-- Seed vehicle types
INSERT INTO vehicle_types (id, name, max_passengers, description, sort_order) VALUES
    (gen_random_uuid(), 'Economy', 4, 'Affordable rides for everyday trips', 1),
    (gen_random_uuid(), 'Comfort', 4, 'Newer cars with extra legroom', 2),
    (gen_random_uuid(), 'Premium', 4, 'High-end vehicles for a premium experience', 3),
    (gen_random_uuid(), 'XL', 6, 'Spacious vehicles for groups up to 6', 4);

-- Seed vehicle type pricing
INSERT INTO vehicle_type_pricing (vehicle_type_id, base_fare, per_km_rate, per_minute_rate, minimum_fare, cancellation_fee)
SELECT vt.id, 2.50, 1.20, 0.20, 5.00, 2.50 FROM vehicle_types vt WHERE vt.name = 'Economy';

INSERT INTO vehicle_type_pricing (vehicle_type_id, base_fare, per_km_rate, per_minute_rate, minimum_fare, cancellation_fee)
SELECT vt.id, 4.00, 1.60, 0.25, 7.00, 3.50 FROM vehicle_types vt WHERE vt.name = 'Comfort';

INSERT INTO vehicle_type_pricing (vehicle_type_id, base_fare, per_km_rate, per_minute_rate, minimum_fare, cancellation_fee)
SELECT vt.id, 7.00, 2.00, 0.30, 10.00, 5.00 FROM vehicle_types vt WHERE vt.name = 'Premium';

INSERT INTO vehicle_type_pricing (vehicle_type_id, base_fare, per_km_rate, per_minute_rate, minimum_fare, cancellation_fee)
SELECT vt.id, 5.00, 1.80, 0.25, 8.00, 4.00 FROM vehicle_types vt WHERE vt.name = 'XL';

-- Create wallets for existing users (will be created on demand by app)
