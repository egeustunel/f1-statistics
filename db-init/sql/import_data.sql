-- Import data into the `circuits` table
COPY circuits(id, circuit_ref, name, location, country, lat, lng, alt, url)
FROM '/docker-entrypoint-initdb.d/csv/circuits.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `constructor_results` table
COPY constructor_results(id, race_id, constructor_id, points, status)
FROM '/docker-entrypoint-initdb.d/csv/constructor_results.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `constructor_standings` table
COPY constructor_standings(id, race_id, constructor_id, points, position, position_text, wins)
FROM '/docker-entrypoint-initdb.d/csv/constructor_standings.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `constructors` table
COPY constructors(id, constructor_ref, name, nationality, url)
FROM '/docker-entrypoint-initdb.d/csv/constructors.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `drivers` table
COPY drivers(id, driver_ref, number, code, forename, surname, dob, nationality, url)
FROM '/docker-entrypoint-initdb.d/csv/drivers.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `driver_standings` table
COPY driver_standings(id, race_id, driver_id, points, position, positionText, wins)
FROM '/docker-entrypoint-initdb.d/csv/driver_standings.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `lap_times` table
COPY lap_times(driver_id, race_id, lap, position, time, milliseconds)
FROM '/docker-entrypoint-initdb.d/csv/lap_times.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `pit_stops` table
COPY pit_stops(race_id, driver_id, stop, lap, time, duration, milliseconds)
FROM '/docker-entrypoint-initdb.d/csv/pit_stops.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `qualifying` table
COPY qualifying(id, race_id, driver_id, constructor_id, number, position, q1, q2, q3)
FROM '/docker-entrypoint-initdb.d/csv/qualifying.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `races` table
COPY races(id, year, round, circuit_id, name, date, time, url, fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time, quali_date, quali_time, sprint_date, sprint_time)
FROM '/docker-entrypoint-initdb.d/csv/races.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `results` table
COPY results(id, race_id, driver_id, constructor_id, number, grid, position, position_text, position_order, points, laps, time, milliseconds, fastest_lap, rank, fastest_lap_time, fastest_lap_speed, status_id)
FROM '/docker-entrypoint-initdb.d/csv/results.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `seasons` table
COPY seasons(year, url)
FROM '/docker-entrypoint-initdb.d/csv/seasons.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `sprint_results` table
COPY sprint_results(id, race_id, driver_id, constructor_id, number, grid, position, position_text, position_order, points, laps, time, milliseconds, fastest_lap, fastest_lap_time, status_id)
FROM '/docker-entrypoint-initdb.d/csv/sprint_results.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';

-- Import data into the `status` table
COPY status(id, status)
FROM '/docker-entrypoint-initdb.d/csv/status.csv'
DELIMITER ',' CSV HEADER NULL AS '\N';
