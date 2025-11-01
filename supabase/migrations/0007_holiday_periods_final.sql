-- Holiday Periods Update - Based on user-provided schedule
-- Date: November 1, 2025
-- Note: Summer months (June-September) already set as high season in database
-- This migration only updates the school holiday periods

-- First, delete any existing holiday periods to avoid duplicates
DELETE FROM seasons WHERE is_holiday_period = true;

-- ========================================
-- 2025-2026 SCHOOL YEAR
-- ========================================

-- HØSTFERIE 2025 (Autumn Holiday 2025)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Herfstvakantie NL Zuid 2025', 2025, 10, 11, 2025, 10, 19, 'high_season', true),
  ('Herfstvakantie NL Noord/Midden 2025', 2025, 10, 18, 2025, 10, 26, 'high_season', true),
  ('Herfstvakantie België 2025', 2025, 10, 27, 2025, 11, 2, 'high_season', true);

-- JULEFERIE 2025-26 (Christmas Holiday 2025-26)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Kerstvakantie Nederland 2025', 2025, 12, 20, 2025, 12, 31, 'high_season', true),
  ('Kerstvakantie België 2025', 2025, 12, 22, 2025, 12, 31, 'high_season', true),
  ('Kerstvakantie Spanje 2025', 2025, 12, 23, 2025, 12, 31, 'high_season', true);

-- NYTTÅRSPERIODE (New Year Period 2026)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Nieuwjaar NL/BE 2026', 2026, 1, 1, 2026, 1, 4, 'high_season', true),
  ('Nieuwjaar Spanje 2026', 2026, 1, 1, 2026, 1, 7, 'high_season', true);

-- VINTER/KARNEVALSFERIE 2026 (Winter/Carnival Holiday 2026)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Voorjaarsvakantie NL Midden/Zuid 2026', 2026, 2, 14, 2026, 2, 22, 'high_season', true),
  ('Krokusvakantie België 2026', 2026, 2, 16, 2026, 2, 22, 'high_season', true),
  ('Voorjaarsvakantie NL Noord 2026', 2026, 2, 21, 2026, 3, 1, 'high_season', true);

-- PÅSKEFERIE 2026 (Easter Holiday 2026)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Paasvakantie België 2026', 2026, 4, 6, 2026, 4, 19, 'high_season', true),
  ('Paasvakantie Nederland 2026', 2026, 4, 6, 2026, 4, 19, 'high_season', true),
  ('Semana Santa Spanje 2026', 2026, 4, 13, 2026, 4, 19, 'high_season', true);

-- MAI-/VÅRFERIE 2026 (May/Spring Holiday 2026)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Meivakantie Nederland 2026', 2026, 4, 25, 2026, 5, 3, 'high_season', true);

-- ========================================
-- 2026-2027 SCHOOL YEAR
-- ========================================

-- HØSTFERIE 2026 (Autumn Holiday 2026)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Herfstvakantie NL Noord 2026', 2026, 10, 10, 2026, 10, 18, 'high_season', true),
  ('Herfstvakantie NL Midden/Zuid 2026', 2026, 10, 17, 2026, 10, 25, 'high_season', true),
  ('Herfstvakantie België 2026', 2026, 10, 19, 2026, 10, 30, 'high_season', true);

-- JULEFERIE 2026-27 (Christmas Holiday 2026-27)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Kerstvakantie NL/BE 2026', 2026, 12, 19, 2027, 1, 3, 'high_season', true);

-- VINTERFERIE 2027 (Winter Holiday 2027)
INSERT INTO seasons (name, start_year, start_month, start_day, end_year, end_month, end_day, season_type, is_holiday_period)
VALUES 
  ('Krokusvakantie België 2027', 2027, 2, 8, 2027, 2, 14, 'high_season', true),
  ('Voorjaarsvakantie NL Midden/Zuid 2027', 2027, 2, 13, 2027, 2, 21, 'high_season', true),
  ('Voorjaarsvakantie NL Noord 2027', 2027, 2, 20, 2027, 2, 28, 'high_season', true);

-- ========================================
-- VERIFICATION QUERY
-- ========================================
-- Run this to verify all holiday periods:
-- SELECT 
--   name,
--   CONCAT(start_day, '-', start_month, '-', start_year) as start_date,
--   CONCAT(end_day, '-', end_month, '-', end_year) as end_date,
--   season_type
-- FROM seasons 
-- WHERE is_holiday_period = true 
-- ORDER BY start_year, start_month, start_day;
