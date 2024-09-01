CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE DATABASE datas;
\c datas;

CREATE TABLE "vehicle" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL DEFAULT 'FREENOVE WROVER'
);

CREATE TABLE "race" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    CONSTRAINT fk_race_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE
);

CREATE TABLE "stats_race" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID NOT NULL,
    distance FLOAT NOT NULL,
    speed_max FLOAT NOT NULL,
    speed_average FLOAT NOT NULL,
    battery_max INT NOT NULL,
    battery_min INT NOT NULL,
    time BIGINT NOT NULL,
    date TIMESTAMP NOT NULL,
    CONSTRAINT fk_race_stats_race FOREIGN KEY (race_id) REFERENCES race(id) ON DELETE CASCADE
);

CREATE TABLE "sensor_data" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID NOT NULL,
    distance FLOAT NOT NULL,
    speed FLOAT NOT NULL,
    date TIMESTAMP NOT NULL,
    battery FLOAT NOT NULL,
    track INT NOT NULL,
    CONSTRAINT fk_sensor_data_race FOREIGN KEY (race_id) REFERENCES race(id) ON DELETE CASCADE
);
