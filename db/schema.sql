USE xgc73r2v6zfyhu1d;

CREATE TABLE spots(
	id int NOT NULL AUTO_INCREMENT,
	city VARCHAR(50) NOT NULL,
	lattitude DECIMAL,
	longitude DECIMAL,
    cross_street VARCHAR(50),
    description VARCHAR(225),
	security_guards BOOLEAN DEFAULT false,
	security_when VARCHAR(50),
	PRIMARY KEY (id)
);



