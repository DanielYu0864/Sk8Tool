USE xgc73r2v6zfyhu1d;

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