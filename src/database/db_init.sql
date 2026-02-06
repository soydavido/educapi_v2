CREATE TABLE tb_user (
    id_user bigint GENERATED ALWAYS AS IDENTITY (START WITH 1),
    nm_user VARCHAR(100),
    tx_secret VARCHAR(100)
);

CREATE TABLE tb_cards (
    id_card BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1),
    nb_name VARCHAR(100) NOT NULL,
    tx_description VARCHAR(500),
    nu_attack INT DEFAULT 0,
    nu_defense INT DEFAULT 0, -- Corregido "deffense"
    nu_life_points INT DEFAULT 0,
    tx_picture_url VARCHAR(1000),
    js_attributes JSON, -- Cambiado a JSONB para mejor rendimiento
    tx_user_secret VARCHAR(100),
    CONSTRAINT pk_tb_cards PRIMARY KEY (id_card) -- Definición de llave primaria
);

ALTER TABLE tb_cards
  ADD COLUMN ts_insert_timestamp timestamp NOT NULL DEFAULT now();

ALTER TABLE tb_cards
  ADD COLUMN ts_update_timestamp timestamp NULL;

INSERT INTO tb_user (nm_user, tx_secret) 
VALUES ('ArisTheCollector', 'USR-SECRET-99');

INSERT INTO tb_cards (nb_name, tx_description, nu_attack, nu_defense, nu_life_points, tx_picture_url, js_attributes, tx_user_secret)
VALUES 
('Dragón de Obsidiana', 'Una bestia ancestral nacida de las profundidades del volcán.', 85, 60, 120, 'https://img.api/dragon.png', '{"elemento": "Fuego", "rareza": "Legendaria"}', 'USR-SECRET-99'),

('Guardián del Bosque', 'Protector eterno de la naturaleza, hecho de roble vivo.', 45, 90, 150, 'https://img.api/guardian.png', '{"elemento": "Tierra", "rareza": "Rara"}', 'USR-SECRET-99'),

('Asesino de Sombras', 'Especialista en ataques rápidos y sigilosos.', 95, 20, 70, 'https://img.api/assassin.png', '{"elemento": "Oscuridad", "rareza": "Épica"}', 'USR-SECRET-99'),

('Sirena Encantadora', 'Su canto puede confundir a cualquier enemigo.', 30, 40, 90, 'https://img.api/siren.png', '{"elemento": "Agua", "habilidad": "Aturdimiento"}', 'USR-SECRET-99'),

('Fénix Renacido', 'Cada vez que cae, vuelve a surgir de sus cenizas.', 70, 50, 100, 'https://img.api/phoenix.png', '{"elemento": "Fuego", "habilidad": "Resurrección"}', 'USR-SECRET-99');