CREATE DATABASE librohub;
USE librohub;

CREATE TABLE IF NOT EXISTS usuario (
    idus int AUTO_INCREMENT NOT NULL UNIQUE,
    nomb varchar(40) NOT NULL,
    mail varchar(40) NOT NULL,
    pssw varchar(40) NOT NULL,
    PRIMARY KEY (idus)
);

CREATE TABLE IF NOT EXISTS carrito (
    idca int AUTO_INCREMENT NOT NULL UNIQUE,
    idus int NOT NULL,
    PRIMARY KEY (idca)
);

CREATE TABLE IF NOT EXISTS libro (
    idli int AUTO_INCREMENT NOT NULL UNIQUE,
    titl varchar(30) NOT NULL UNIQUE,
    auto varchar(40) NOT NULL,
    cate varchar(20) NOT NULL,
    stck int NOT NULL DEFAULT '0',
    prec decimal(5,2) NOT NULL,
    PRIMARY KEY (idli)
);

CREATE TABLE IF NOT EXISTS carro_libro (
    id int AUTO_INCREMENT NOT NULL UNIQUE,
    caid int NOT NULL,
    idli int NOT NULL,
    cant int NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS compra (
    idco int AUTO_INCREMENT NOT NULL UNIQUE,
    feco date NOT NULL,
    cantidad int NOT NULL,
    prec decimal(5,2) NOT NULL,
    idus int NOT NULL,
    idli int NOT NULL,
    stat boolean NOT NULL,
    PRIMARY KEY (idco)
);
ALTER TABLE carrito ADD CONSTRAINT carrito_fk1 FOREIGN KEY (idus) REFERENCES usuario(idus);

ALTER TABLE carro_libro ADD CONSTRAINT carro_libro_fk1 FOREIGN KEY (caid) REFERENCES carrito(idca);

ALTER TABLE carro_libro ADD CONSTRAINT carro_libro_fk2 FOREIGN KEY (idli) REFERENCES libro(idli);

ALTER TABLE compra ADD CONSTRAINT compra_fk3 FOREIGN KEY (idus) REFERENCES usuario(idus);

ALTER TABLE compra ADD CONSTRAINT compra_fk4 FOREIGN KEY (idli) REFERENCES libro(idli);