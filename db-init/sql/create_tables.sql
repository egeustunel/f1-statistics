CREATE TABLE IF NOT EXISTS circuits (
    id SERIAL PRIMARY KEY,
    circuit_ref TEXT,
    "name" TEXT,
    "location" TEXT,
    country TEXT,
    lat DECIMAL(9,6),
    lng DECIMAL(9,6),
    alt TEXT,
    "url" TEXT
);

CREATE TABLE IF NOT EXISTS constructor_results (
    id SERIAL PRIMARY KEY,
    race_id INTEGER,
    constructor_id INTEGER,
    points DECIMAL(5,2),
    "status" TEXT
);

CREATE TABLE IF NOT EXISTS constructor_standings (
    id SERIAL PRIMARY KEY,
    race_id INTEGER,
    constructor_id INTEGER,
    points DECIMAL(5,2),
    position INTEGER,
    position_text TEXT,
    wins TEXT
);

CREATE TABLE IF NOT EXISTS constructors (
    id SERIAL PRIMARY KEY,
    constructor_ref TEXT,
    "name" TEXT,
    nationality TEXT,
    "url" TEXT
);

CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    driver_ref TEXT,
    "number" TEXT,
    code TEXT,
    forename TEXT,
    surname TEXT,
    dob TEXT,
    nationality TEXT,
    "url" TEXT
);

CREATE TABLE IF NOT EXISTS driver_standings (
    id SERIAL PRIMARY KEY,
    race_id INTEGER,
    driver_id INTEGER,
    points NUMERIC(10, 1),
    position INTEGER,
    positionText TEXT,
    wins TEXT
);

CREATE TABLE IF NOT EXISTS lap_times (
    race_id INTEGER,
    driver_id INTEGER,
    lap SMALLINT,
    position SMALLINT,
    "time" TEXT,
    milliseconds TEXT
);

CREATE TABLE IF NOT EXISTS pit_stops (
    race_id INTEGER,
    driver_id INTEGER,
    "stop" INTEGER,
    lap SMALLINT,
    "time" TIME,
    duration VARCHAR(12),
    milliseconds INTEGER
);

CREATE TABLE IF NOT EXISTS qualifying (
    id INTEGER,
    race_id INTEGER,
    driver_id INTEGER,
    constructor_id INTEGER,
    "number" INTEGER,
    position INTEGER,
    q1 TEXT,
    q2 TEXT,
    q3 TEXT
);

CREATE TABLE IF NOT EXISTS races (
    id SERIAL PRIMARY KEY,
    "year" INTEGER,
    round INTEGER,
    circuit_id INTEGER,
    "name" VARCHAR,
    "date" DATE,
    "time" TIME,
    "url" TEXT,
    fp1_date DATE,
    fp1_time TIME,
    fp2_date DATE,
    fp2_time TIME,
    fp3_date DATE,
    fp3_time TIME,
    quali_date DATE,
    quali_time TIME,
    sprint_date DATE,
    sprint_time TIME
);

CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    race_id INTEGER,
    driver_id INTEGER,
    constructor_id INTEGER,
    number INTEGER,
    grid INTEGER,
    position INTEGER,
    position_text VARCHAR(2),
    position_order VARCHAR(2),
    points DECIMAL(4,2),
    laps INTEGER,
    "time" VARCHAR,
    milliseconds INTEGER,
    fastest_lap INTEGER,
    rank SMALLINT,
    fastest_lap_time TIME,
    fastest_lap_speed DECIMAL(6,3),
    status_id INTEGER
);

CREATE TABLE IF NOT EXISTS seasons (
    id SERIAL PRIMARY KEY,
    "year" SMALLINT,
    "url" TEXT
);

CREATE TABLE IF NOT EXISTS sprint_results (
    id SERIAL PRIMARY KEY,
    race_id INTEGER,
    driver_id INTEGER,
    constructor_id INTEGER,
    "number" INTEGER,
    grid INTEGER,
    position INTEGER,
    position_text VARCHAR(2),
    position_order VARCHAR(2),
    points INTEGER,
    laps INTEGER,
    "time" VARCHAR(12),
    milliseconds VARCHAR(12),
    fastest_lap INTEGER,
    fastest_lap_time VARCHAR(12),
    status_id INTEGER
);

CREATE TABLE IF NOT EXISTS status (
    id SERIAL PRIMARY KEY,
    "status" TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INTEGER REFERENCES users(id),
  role_id INTEGER REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);
