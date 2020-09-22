DROP DATABASE IF EXISTS skate_spots_db;
CREATE DATABASE skate_spots_db;
USE skate_spots_db;

CREATE TABLE spots(
	id int NOT NULL AUTO_INCREMENT,
	city VARCHAR(50) NOT NULL,
    first_cross_street VARCHAR(50) NOT NULL,
    second_cross_street VARCHAR(50) NOT NULL,
	lattitude DECIMAL,
	longitude DECIMAL, 
    description VARCHAR(225), 
	security_guards BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);