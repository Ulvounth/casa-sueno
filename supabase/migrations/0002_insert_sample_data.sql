-- Insert sample bookings for testing
INSERT INTO bookings (start_date, end_date, guest_name, guest_email, guest_phone, guests, total_price, special_requests, status) VALUES
  ('2025-08-15', '2025-08-20', 'Lars Hansen', 'lars.hansen@email.com', '+47 123 45 678', 2, 425.00, 'Late check-in around 8 PM', 'confirmed'),
  ('2025-09-01', '2025-09-07', 'Maria Gonzalez', 'maria.gonzalez@email.com', '+34 987 65 432', 4, 510.00, 'Traveling with children, need extra towels', 'confirmed'),
  ('2025-08-25', '2025-08-28', 'John Smith', 'john.smith@email.com', NULL, 1, 255.00, NULL, 'pending'),
  ('2025-10-10', '2025-10-15', 'Emma Andersson', 'emma.andersson@email.com', '+46 555 123 456', 3, 425.00, 'Celebrating anniversary, any champagne recommendations?', 'confirmed'),
  ('2025-07-30', '2025-08-02', 'Pierre Dubois', 'pierre.dubois@email.com', '+33 1 23 45 67 89', 2, 255.00, 'First time in Spain', 'cancelled');
