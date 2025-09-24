import { supabase } from "./supabase";
import { format, eachDayOfInterval } from "date-fns";

export interface PricingBreakdown {
  nights: number;
  baseTotal: number;
  seasonalRate: number;
  longStayDiscount: number;
  cleaningFee: number;
  totalAmount: number;
  currency: string;
  averagePricePerNight: number;
  minimumNights: number;
  hasLongStayDiscount: boolean;
  dailyRates: Array<{
    date: string;
    rate: number;
    season: string;
  }>;
}

interface PropertyPricing {
  base_price_per_night: number;
  cleaning_fee: number;
  seasonal_rates: {
    high_season: number;
    middle_season: number;
    low_season: number;
  };
  high_season_minimum_nights: number;
  middle_season_minimum_nights: number;
  low_season_minimum_nights: number;
  long_stay_discount_threshold: number;
  long_stay_discount_percent: number;
  currency: string;
}

interface Season {
  season_type: "high_season" | "middle_season" | "low_season";
  start_month: number;
  start_day: number;
  end_month: number;
  end_day: number;
}

export class PricingService {
  private static async getPropertyPricing(): Promise<PropertyPricing> {
    const { data, error } = await supabase
      .from("property_pricing")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      // Fallback pricing if database is unavailable
      return {
        base_price_per_night: 85,
        cleaning_fee: 50,
        seasonal_rates: {
          high_season: 1.118,
          middle_season: 1.0,
          low_season: 0.882,
        },
        high_season_minimum_nights: 7,
        middle_season_minimum_nights: 5,
        low_season_minimum_nights: 3,
        long_stay_discount_threshold: 28,
        long_stay_discount_percent: 20,
        currency: "EUR",
      };
    }

    return {
      base_price_per_night: data.base_price_per_night,
      cleaning_fee: data.cleaning_fee,
      seasonal_rates: data.seasonal_rates,
      high_season_minimum_nights: data.high_season_minimum_nights || 7,
      middle_season_minimum_nights: data.middle_season_minimum_nights || 5,
      low_season_minimum_nights: data.low_season_minimum_nights || 3,
      long_stay_discount_threshold: data.long_stay_discount_threshold || 28,
      long_stay_discount_percent: data.long_stay_discount_percent || 20,
      currency: data.currency || "EUR",
    };
  }

  private static async getSeasons(): Promise<Season[]> {
    const { data, error } = await supabase.from("seasons").select("*");

    if (error || !data) {
      // Fallback seasons if database is unavailable
      return [
        {
          season_type: "high_season",
          start_month: 5,
          start_day: 1,
          end_month: 9,
          end_day: 30,
        },
        {
          season_type: "middle_season",
          start_month: 3,
          start_day: 1,
          end_month: 4,
          end_day: 30,
        },
        {
          season_type: "middle_season",
          start_month: 10,
          start_day: 1,
          end_month: 11,
          end_day: 30,
        },
        {
          season_type: "low_season",
          start_month: 12,
          start_day: 1,
          end_month: 2,
          end_day: 28,
        },
      ];
    }

    return data.map((season) => ({
      season_type: season.season_type,
      start_month: season.start_month,
      start_day: season.start_day,
      end_month: season.end_month,
      end_day: season.end_day,
    }));
  }

  private static getSeason(
    date: Date,
    seasons: Season[]
  ): "high_season" | "middle_season" | "low_season" {
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    for (const season of seasons) {
      // Handle seasons that cross year boundary (like December-February)
      if (season.start_month > season.end_month) {
        if (
          (month >= season.start_month && day >= season.start_day) ||
          (month <= season.end_month && day <= season.end_day)
        ) {
          return season.season_type;
        }
      } else {
        // Normal seasons within same year
        if (
          (month > season.start_month ||
            (month === season.start_month && day >= season.start_day)) &&
          (month < season.end_month ||
            (month === season.end_month && day <= season.end_day))
        ) {
          return season.season_type;
        }
      }
    }

    // Default to middle season if no match found
    return "middle_season";
  }

  static async calculatePricing(
    checkinDate: Date,
    checkoutDate: Date
  ): Promise<PricingBreakdown> {
    try {
      const [pricing, seasons] = await Promise.all([
        this.getPropertyPricing(),
        this.getSeasons(),
      ]);

      const days = eachDayOfInterval({ start: checkinDate, end: checkoutDate });
      // Remove checkout date as it's not a night stay
      days.pop();

      const nights = days.length;
      const dailyRates: Array<{ date: string; rate: number; season: string }> =
        [];
      let baseTotal = 0;

      // Calculate rate for each night
      for (const day of days) {
        const seasonType = this.getSeason(day, seasons);
        const multiplier = pricing.seasonal_rates[seasonType];
        const rate = pricing.base_price_per_night * multiplier;

        dailyRates.push({
          date: format(day, "yyyy-MM-dd"),
          rate: Math.round(rate * 100) / 100,
          season: seasonType,
        });

        baseTotal += rate;
      }

      // Calculate long stay discount
      const hasLongStayDiscount =
        nights >= pricing.long_stay_discount_threshold;
      const longStayDiscount = hasLongStayDiscount
        ? (baseTotal * pricing.long_stay_discount_percent) / 100
        : 0;

      const subtotal = baseTotal - longStayDiscount;
      const totalAmount = subtotal + pricing.cleaning_fee;

      // Determine minimum nights based on predominant season
      const seasonCounts = {
        high_season: dailyRates.filter((d) => d.season === "high_season")
          .length,
        middle_season: dailyRates.filter((d) => d.season === "middle_season")
          .length,
        low_season: dailyRates.filter((d) => d.season === "low_season").length,
      };

      let minimumNights = pricing.middle_season_minimum_nights;
      if (
        seasonCounts.high_season > seasonCounts.middle_season &&
        seasonCounts.high_season > seasonCounts.low_season
      ) {
        minimumNights = pricing.high_season_minimum_nights;
      } else if (
        seasonCounts.low_season > seasonCounts.middle_season &&
        seasonCounts.low_season > seasonCounts.high_season
      ) {
        minimumNights = pricing.low_season_minimum_nights;
      }

      return {
        nights,
        baseTotal: Math.round(baseTotal * 100) / 100,
        seasonalRate: Math.round((baseTotal / nights) * 100) / 100,
        longStayDiscount: Math.round(longStayDiscount * 100) / 100,
        cleaningFee: pricing.cleaning_fee,
        totalAmount: Math.round(totalAmount * 100) / 100,
        currency: pricing.currency,
        averagePricePerNight: Math.round((baseTotal / nights) * 100) / 100,
        minimumNights,
        hasLongStayDiscount,
        dailyRates,
      };
    } catch (error) {
      console.error("Error calculating pricing:", error);
      throw new Error("Failed to calculate pricing");
    }
  }

  static async validateMinimumStay(
    checkinDate: Date,
    checkoutDate: Date
  ): Promise<{
    isValid: boolean;
    requiredNights: number;
    actualNights: number;
    message?: string;
  }> {
    try {
      const breakdown = await this.calculatePricing(checkinDate, checkoutDate);

      if (breakdown.nights < breakdown.minimumNights) {
        return {
          isValid: false,
          requiredNights: breakdown.minimumNights,
          actualNights: breakdown.nights,
          message: `Minimum stay is ${breakdown.minimumNights} nights for this period. You have selected ${breakdown.nights} nights.`,
        };
      }

      return {
        isValid: true,
        requiredNights: breakdown.minimumNights,
        actualNights: breakdown.nights,
      };
    } catch (error) {
      console.error("Error validating minimum stay:", error);
      return {
        isValid: false,
        requiredNights: 3,
        actualNights: 0,
        message: "Could not validate minimum stay. Please try again.",
      };
    }
  }
}
