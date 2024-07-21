CREATE DATABASE race;
\c race;

CREATE ROLE postgres;
\c postgres

CREATE TABLE "vehicle" (
    id SERIAL PRIMARY KEY NOT NULL,
    var VARCHAR(255) NOT NULL DEFAULT 'FREENOVE WROVER'
);
ALTER TABLE "vehicle" OWNER TO postgres

CREATE TABLE "stats_race" (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicle(id),
    distance FLOAT NOT NULL,
    time TIMESTAMP NOT NULL,
    performance FLOAT NOT NULL,
    date_tech TIMESTAMP NOT NULL
);
ALTER TABLE "stats_race" OWNER TO postgres

CREATE TABLE "sensor_data" (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicle(id),
    speed FLOAT NOT NULL,
    orientation FLOAT NOT NULL,
    date_tech TIMESTAMP NOT NULL
);
ALTER TABLE "sensor_data" OWNER TO postgres

-- Create thresholds table
CREATE TABLE "thresholds" (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicle(id),
    speed_max FLOAT NOT NULL,
    speed_min FLOAT NOT NULL,
    distance_max FLOAT NOT NULL,
    distance_min FLOAT NOT NULL,
    date_tech TIMESTAMP NOT NULL
);
ALTER TABLE "thresholds" OWNER TO postgres

-- Inserting data into vehicle table
INSERT INTO vehicle (var) VALUES 
('FREENOVE WROVER'),
('Vehicle 2'),
('Vehicle 3');

-- Inserting data into stats_race table
INSERT INTO stats_race (vehicle_id, distance, time, performance, date_tech) VALUES 
(1, 120.5, '2023-07-21 12:00:00', 95.7, '2023-07-21 12:00:00'),
(2, 130.2, '2023-07-21 12:05:00', 97.4, '2023-07-21 12:05:00'),
(3, 110.8, '2023-07-21 12:10:00', 92.1, '2023-07-21 12:10:00');

-- Inserting data into sensor_data table
INSERT INTO sensor_data (vehicle_id, speed, orientation, date_tech) VALUES 
(1, 60.5, 45.0, '2023-07-21 12:00:00'),
(2, 70.2, 50.0, '2023-07-21 12:05:00'),
(3, 55.8, 40.0, '2023-07-21 12:10:00');

-- Inserting data into thresholds table
INSERT INTO thresholds (vehicle_id, speed_max, speed_min, distance_max, distance_min, date_tech) VALUES 
(1, 100.0, 20.0, 200.0, 50.0, '2023-07-21 12:00:00'),
(2, 110.0, 30.0, 210.0, 60.0, '2023-07-21 12:05:00'),
(3, 90.0, 25.0, 190.0, 55.0, '2023-07-21 12:10:00');
