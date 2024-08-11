CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE DATABASE datas;
\c datas;

CREATE TABLE "vehicle" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL DEFAULT 'FREENOVE WROVER'
);

CREATE TABLE "race" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE "stats_race" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID NOT NULL,
    vehicle_id UUID NOT NULL,
    distance FLOAT NOT NULL,
    speed FLOAT NOT NULL,
    time TIMESTAMP NOT NULL,
    date_tech TIMESTAMP NOT NULL,
    CONSTRAINT fk_race_stats_race FOREIGN KEY (race_id) REFERENCES race(id) ON DELETE CASCADE,
    CONSTRAINT fk_stats_race_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE
);

-- CREATE TABLE "sensor_data" (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     race_id UUID NOT NULL,
--     vehicle_id UUID NOT NULL,
--     speed FLOAT NOT NULL,
--     orientation JSONB NOT NULL,
--     date_tech TIMESTAMP NOT NULL,
--     consumption FLOAT NOT NULL,
--     CONSTRAINT fk_race_sensor_data FOREIGN KEY (race_id) REFERENCES race(id) ON DELETE CASCADE,
--     CONSTRAINT fk_sensor_data_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE
-- );
