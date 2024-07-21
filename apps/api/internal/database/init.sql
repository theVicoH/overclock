CREATE DATABASE race;
\c race;

CREATE TABLE IF NOT EXISTS vehicle (
    id SERIAL PRIMARY KEY NOT NULL,
    var VARCHAR(255) NOT NULL DEFAULT 'FREENOVE WROVER'
);

CREATE TABLE IF NOT EXISTS stats_race (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicle(id),
	distance FLOAT NOT NULL,
	time TIMESTAMP NOT NULL,
	performance FLOAT NOT NULL,
	date_tech TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS sensor_data (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicle(id),
	speed FLOAT NOT NULL,
	orientation FLOAT NOT NULL,
	date_tech TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS thresholds (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicle(id),
	speed_max FLOAT NOT NULL,
	speed_min FLOAT NOT NULL,
	distance_max FLOAT NOT NULL,
	distance_min FLOAT NOT NULL,
	date_tech TIMESTAMP NOT NULL

);
