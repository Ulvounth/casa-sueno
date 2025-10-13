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
  utilities_and_cleaning_fee: number;
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
  start_year?: number;
  end_year?: number;
  name?: string;
  is_holiday_period?: boolean;
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
        utilities_and_cleaning_fee: 90,
        seasonal_rates: {
          high_season: 1.294,
          middle_season: 0.941,
          low_season: 0.706,
        },
        high_season_minimum_nights: 7,
        middle_season_minimum_nights: 4,
        low_season_minimum_nights: 3,
        long_stay_discount_threshold: 28,
        long_stay_discount_percent: 20,
        currency: "EUR",
      };
    }

    return {
      base_price_per_night: data.base_price_per_night,
      utilities_and_cleaning_fee: data.utilities_and_cleaning_fee || 90,
      seasonal_rates: data.seasonal_rates,
      high_season_minimum_nights: data.high_season_minimum_nights || 7,
      middle_season_minimum_nights: data.middle_season_minimum_nights || 4,
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
        // General seasons
        {
          season_type: "high_season",
          start_month: 6,
          start_day: 1,
          end_month: 9,
          end_day: 30,
          name: "Summer High Season",
          is_holiday_period: false,
        },
        {
          season_type: "middle_season",
          start_month: 3,
          start_day: 1,
          end_month: 5,
          end_day: 31,
          name: "Spring Middle Season",
          is_holiday_period: false,
        },
        {
          season_type: "middle_season",
          start_month: 10,
          start_day: 1,
          end_month: 10,
          end_day: 31,
          name: "Autumn Middle Season",
          is_holiday_period: false,
        },
        {
          season_type: "low_season",
          start_month: 11,
          start_day: 1,
          end_month: 2,
          end_day: 28,
          name: "Winter Low Season",
          is_holiday_period: false,
        },
        // Holiday high season periods for 2025
        {
          season_type: "high_season",
          start_month: 10,
          start_day: 27,
          end_month: 11,
          end_day: 2,
          start_year: 2025,
          end_year: 2025,
          name: "Belgium Vlaanderen Oct-Nov 2025",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 12,
          start_day: 20,
          end_month: 12,
          end_day: 31,
          start_year: 2025,
          end_year: 2025,
          name: "Netherlands Dec 2025",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 12,
          start_day: 22,
          end_month: 12,
          end_day: 31,
          start_year: 2025,
          end_year: 2025,
          name: "Belgium Vlaanderen Dec 2025",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 12,
          start_day: 23,
          end_month: 12,
          end_day: 31,
          start_year: 2025,
          end_year: 2025,
          name: "Spain Andalusia Dec 2025",
          is_holiday_period: true,
        },
        // Holiday high season periods for 2026
        {
          season_type: "high_season",
          start_month: 1,
          start_day: 1,
          end_month: 1,
          end_day: 4,
          start_year: 2026,
          end_year: 2026,
          name: "Netherlands/Belgium Jan 2026",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 1,
          start_day: 1,
          end_month: 1,
          end_day: 7,
          start_year: 2026,
          end_year: 2026,
          name: "Spain Jan 2026",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 2,
          start_day: 14,
          end_month: 2,
          end_day: 22,
          start_year: 2026,
          end_year: 2026,
          name: "Netherlands Midden & Zuid Feb 2026",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 2,
          start_day: 16,
          end_month: 2,
          end_day: 22,
          start_year: 2026,
          end_year: 2026,
          name: "Belgium Vlaanderen Feb 2026",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 2,
          start_day: 21,
          end_month: 3,
          end_day: 1,
          start_year: 2026,
          end_year: 2026,
          name: "Netherlands Noord Feb-Mar 2026",
          is_holiday_period: true,
        },
        {
          season_type: "high_season",
          start_month: 4,
          start_day: 6,
          end_month: 4,
          end_day: 19,
          start_year: 2026,
          end_year: 2026,
          name: "Belgium Vlaanderen Apr 2026",
          is_holiday_period: true,
        },
      ];
    }

    return data.map((season) => ({
      season_type: season.season_type,
      start_month: season.start_month,
      start_day: season.start_day,
      end_month: season.end_month,
      end_day: season.end_day,
      start_year: season.start_year,
      end_year: season.end_year,
      name: season.name,
      is_holiday_period: season.is_holiday_period,
    }));
  }

  private static getSeason(
    date: Date,
    seasons: Season[]
  ): "high_season" | "middle_season" | "low_season" {
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const year = date.getFullYear();

    // First, check for year-specific holiday periods
    for (const season of seasons) {
      if (season.is_holiday_period && season.start_year && season.end_year) {
        // Check if date falls within specific year range
        if (year >= season.start_year && year <= season.end_year) {
          // Handle periods that might cross year boundary
          if (season.start_year !== season.end_year) {
            // Multi-year period (like Dec 2025 to Jan 2026)
            if (
              (year === season.start_year &&
                (month > season.start_month ||
                  (month === season.start_month && day >= season.start_day))) ||
              (year === season.end_year &&
                (month < season.end_month ||
                  (month === season.end_month && day <= season.end_day))) ||
              (year > season.start_year && year < season.end_year)
            ) {
              return season.season_type;
            }
          } else {
            // Same year period
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
      }
    }

    // If no holiday period matches, check general seasonal periods
    for (const season of seasons) {
      if (!season.is_holiday_period) {
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

      // Calculate long stay discount (only applies in low and middle season)
      const seasonCounts = {
        high_season: dailyRates.filter((d) => d.season === "high_season")
          .length,
        middle_season: dailyRates.filter((d) => d.season === "middle_season")
          .length,
        low_season: dailyRates.filter((d) => d.season === "low_season").length,
      };

      // Check if stay is predominantly in high season
      const isHighSeasonStay =
        seasonCounts.high_season > seasonCounts.middle_season &&
        seasonCounts.high_season > seasonCounts.low_season;

      const hasLongStayDiscount =
        nights >= pricing.long_stay_discount_threshold && !isHighSeasonStay;
      const longStayDiscount = hasLongStayDiscount
        ? (baseTotal * pricing.long_stay_discount_percent) / 100
        : 0;

      const subtotal = baseTotal - longStayDiscount;
      const totalAmount = subtotal + pricing.utilities_and_cleaning_fee;

      // Determine minimum nights based on predominant season (reuse seasonCounts)
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
        cleaningFee: pricing.utilities_and_cleaning_fee,
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

  /**
   * Check if a booking would create an isolated gap that's too short to book
   * This prevents bookings that would leave 1-2 day gaps that can't be booked due to minimum stay requirements
   */
  static async wouldCreateIsolatedGap(
    checkinDate: Date,
    checkoutDate: Date,
    existingBookings: Array<{ checkin_date: string; checkout_date: string }>
  ): Promise<{ hasGap: boolean; message?: string }> {
    try {
      // Convert strings to dates and sort existing bookings
      const bookings = existingBookings
        .map((booking) => ({
          checkin: new Date(booking.checkin_date),
          checkout: new Date(booking.checkout_date),
        }))
        .sort((a, b) => a.checkin.getTime() - b.checkin.getTime());

      const newCheckin = new Date(checkinDate);
      const newCheckout = new Date(checkoutDate);

      // Check for gaps before the new booking
      for (const booking of bookings) {
        if (booking.checkout.getTime() < newCheckin.getTime()) {
          const gapStart = new Date(booking.checkout);
          const gapEnd = new Date(newCheckin);
          const gapDays = Math.ceil(
            (gapEnd.getTime() - gapStart.getTime()) / (1000 * 60 * 60 * 24)
          );

          // If there's a gap of 1-2 days, check if it meets minimum stay requirements
          if (gapDays > 0 && gapDays <= 2) {
            const validation = await this.validateMinimumStay(gapStart, gapEnd);
            if (!validation.isValid) {
              return {
                hasGap: true,
                message: `This booking would create a ${gapDays}-day gap that cannot be booked due to minimum stay requirements.`,
              };
            }
          }
        }
      }

      // Check for gaps after the new booking
      for (const booking of bookings) {
        if (booking.checkin.getTime() > newCheckout.getTime()) {
          const gapStart = new Date(newCheckout);
          const gapEnd = new Date(booking.checkin);
          const gapDays = Math.ceil(
            (gapEnd.getTime() - gapStart.getTime()) / (1000 * 60 * 60 * 24)
          );

          // If there's a gap of 1-2 days, check if it meets minimum stay requirements
          if (gapDays > 0 && gapDays <= 2) {
            const validation = await this.validateMinimumStay(gapStart, gapEnd);
            if (!validation.isValid) {
              return {
                hasGap: true,
                message: `This booking would create a ${gapDays}-day gap that cannot be booked due to minimum stay requirements.`,
              };
            }
          }
        }
      }

      return { hasGap: false };
    } catch (error) {
      console.error("Error checking for isolated gaps:", error);
      return { hasGap: false };
    }
  }
}
