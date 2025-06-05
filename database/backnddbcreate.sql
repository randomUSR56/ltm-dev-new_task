-- adatbázis létrehozás
--CREATE DATABASE bcknddm ENCODING 'UTF8' LC_COLLATE 'hu_HU.utf8' LC_CTYPE 'hu_HU.utf8' TEMPLATE template0;
-- átkapcsolni a létrehozott adatbázisra
--\c bcknddm
-- kiterjesztések telepítése
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- TÁBLÁK létrehozása
CREATE TABLE IF NOT EXISTS felhasznalo (
    flhsznl_id SERIAL PRIMARY KEY,  -- egyedi azonosító 
    nev VARCHAR(500),               -- neve 
    email VARCHAR(500),             -- emailcíme 
    jelszo VARCHAR(254),            -- jelszo (a teszt alatt txt-ben, egyébként hash sózva) 
    apikulcs VARCHAR(128),          -- 60 karakter 10 csoportban kötőjelekkel elválsztva 
    letrejott TIMESTAMP,            -- ezredmásodperc pontosság 
    modositas TIMESTAMP,            -- ezredmásodperc pontosság 
    lejar TIMESTAMP,                -- évhónapnap 23 óra 59 perc 59 másodperc 
    belephet BOOLEAN
); -- felhasználó tábla vége 
-- Felhasználó tábla mező magyarázat
COMMENT ON COLUMN felhasznalo.flhsznl_id IS 'egyedi azonosító';
COMMENT ON COLUMN felhasznalo.nev IS 'neve';
COMMENT ON COLUMN felhasznalo.email IS 'emailcíme';
COMMENT ON COLUMN felhasznalo.jelszo IS 'jelszo (a teszt alatt txt-ben, egyébként hash sózva)';
COMMENT ON COLUMN felhasznalo.apikulcs IS '60 karakter 10 csoportban kötőjelekkel elválasztva';
COMMENT ON COLUMN felhasznalo.letrejott IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN felhasznalo.modositas IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN felhasznalo.lejar IS 'évhónapnap 23 óra 59 perc 59 másodperc';
COMMENT ON TABLE felhasznalo IS 'tábla a felhasználóknak';
--
CREATE TABLE IF NOT EXISTS feladat (
    fldt_id SERIAL PRIMARY KEY,    -- egyedi azonosító 
    rovidnev VARCHAR(255),         -- rövid név 
    leiras TEXT,                   -- részletes leírás 
    letrejott TIMESTAMP,           -- ezredmásodperc pontosság 
    hatarido TIMESTAMP,            -- évhónapnaóraperc 00 másodperc 
    gps_koordinata geometry(Point, 4326),
    eov_koordinata geometry(Point, 23700)
);  -- feladat tábla vége 
-- feladat tábla mező magyarázat
COMMENT ON COLUMN feladat.fldt_id IS 'egyedi azonosító';
COMMENT ON COLUMN feladat.rovidnev IS 'rövid név';
COMMENT ON COLUMN feladat.leiras IS 'részletes leírás';
COMMENT ON COLUMN feladat.letrejott IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN feladat.hatarido IS 'évhónapnaóraperc 00 másodperc';
COMMENT ON TABLE feladat IS 'tábla a feladatoknak';
-- 
CREATE TABLE IF NOT EXISTS fldtkep (
    fldtkep_id SERIAL PRIMARY KEY,                      -- egyedi azonosító 
    adat BYTEA,                                         -- maga a kép base64 kódolással tárolva
    fajlnev VARCHAR(255),                               -- kép teljes neve 
    meret INTEGER,                                      -- byte-ban 
    leiras TEXT,                                        -- hozzátartozó leírás 
    keszult TIMESTAMP,                                  -- ezredmásodperc pontosság 
    letrejott TIMESTAMP,                                -- ezredmásodperc pontosság 
    gps_koordinata geometry(Point, 4326),               -- a hely gps koordinátája, ha van
    eov_koordinata geometry(Point, 23700),              -- a hely eov koordinátája ha van
    bekuldo INTEGER REFERENCES felhasznalo(flhsznl_id)  -- felhasználó id 
);  -- feladathoz rendelehető kép vége
-- feladtahoz rendelhető kép tábla mező magyarázat
COMMENT ON COLUMN fldtkep.fldtkep_id IS 'egyedi azonosító';
COMMENT ON COLUMN fldtkep.adat IS 'maga a kép base64 kódolással tárolva';
COMMENT ON COLUMN fldtkep.fajlnev IS 'kép teljes neve';
COMMENT ON COLUMN fldtkep.meret IS 'byte-ban';
COMMENT ON COLUMN fldtkep.leiras IS 'hozzátartozó leírás';
COMMENT ON COLUMN fldtkep.keszult IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN fldtkep.letrejott IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN fldtkep.gps_koordinata IS 'a hely gps koordinátája, ha van';
COMMENT ON COLUMN fldtkep.eov_koordinata IS 'a hely eov koordinátája, ha van';
COMMENT ON COLUMN fldtkep.bekuldo IS 'felhasználó id';
COMMENT ON TABLE fldtkep IS 'tábla a feladatokhoz tartozó képeknek';

CREATE TABLE IF NOT EXISTS fldtkp (
    fldtkp_id SERIAL PRIMARY KEY,                       -- egyedi azonosító 
    fldt_id INTEGER REFERENCES feladat(fldt_id),        -- a feladat azonosítója 
    fldtkep_id INTEGER REFERENCES fldtkep(fldtkep_id),  -- a kép azonosítója 
    letrejott TIMESTAMP,                                -- ezredmásodperc pontosság
    modositas TIMESTAMP                                 -- ezredmásodperc pontosság 
); -- feladatot és képet összerendelő tábla vége
-- feladatot és képet összerendelő tábla magyarázat
COMMENT ON COLUMN fldtkp.fldtkp_id IS 'egyedi azonosító';
COMMENT ON COLUMN fldtkp.fldt_id IS 'a feladat azonosítója';
COMMENT ON COLUMN fldtkp.fldtkep_id IS 'a kép azonosítója';
COMMENT ON COLUMN fldtkp.letrejott IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN fldtkp.modositas IS 'ezredmásodperc pontosság';
COMMENT ON TABLE fldtkp IS 'feladat kép összerendelés egy feladat több kép, egy kép több feladat';
-- 
CREATE TABLE IF NOT EXISTS fldtflhsznl (
    fldtflhsznl_id SERIAL PRIMARY KEY,                      -- egyedi azonosító
    fldt_id INTEGER REFERENCES feladat(fldt_id),            -- feladat azonosító
    flhsznl_id INTEGER REFERENCES felhasznalo(flhsznl_id),  -- felhasznalo azonositó
    fonok BOOLEAN,                                          -- egy feladatnál 1 főnök lehet!
    letrejott TIMESTAMP,                                    -- ezredmásodperc pontosság
    modositas TIMESTAMP                                     -- ezredmásodperc pontosság
); -- feladatot és felhasználót összerendelő tábla vége

COMMENT ON COLUMN fldtflhsznl.fldtflhsznl_id IS 'egyedi azonosító';
COMMENT ON COLUMN fldtflhsznl.fldt_id IS 'feladat azonosító';
COMMENT ON COLUMN fldtflhsznl.flhsznl_id IS 'felhasznalo azonositó';
COMMENT ON COLUMN fldtflhsznl.fonok IS 'egy feladatnál 1 fönök lehet!';
COMMENT ON COLUMN fldtflhsznl.letrejott IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN fldtflhsznl.modositas IS 'ezredmásodperc pontosság';
COMMENT ON TABLE fldtflhsznl IS 'feladat felhasználó összerendelés';

CREATE TABLE IF NOT EXISTS fldtmegoldas (
    fldtmglds_id SERIAL PRIMARY KEY,                        -- egyedi azonosító
    fldt_id INTEGER REFERENCES feladat(fldt_id),            -- feladat azonositó
    leiras TEXT,                                            -- megoldás leírása 
    lejelento INTEGER REFERENCES felhasznalo(flhsznl_id),   -- felhasználó azonositó 
    elfogadva BOOLEAN,                                      -- igaz, ha el van fogadva 
    elfogado INTEGER REFERENCES felhasznalo(flhsznl_id),    -- elfogadó felhasználó azonositó 
    letrejott TIMESTAMP,                                    -- ezredmásodperc pontosság 
    modositas TIMESTAMP                                     -- ezredmásodperc pontosság 
); -- feladatmegoldásokat tartalmazó tábla vége
-- feladatmegoldások magyarázat
COMMENT ON COLUMN fldtmegoldas.fldtmglds_id IS 'egyedi azonosító';
COMMENT ON COLUMN fldtmegoldas.leiras IS 'megoldás leírása';
COMMENT ON COLUMN fldtmegoldas.lejelento IS 'felhasználó azonositó';
COMMENT ON COLUMN fldtmegoldas.elfogadva IS 'igaz, ha el van fogadva';
COMMENT ON COLUMN fldtmegoldas.elfogado IS 'elfogadó felhasználó azonositó';
COMMENT ON COLUMN fldtmegoldas.letrejott IS 'ezredmásodperc pontosság';
COMMENT ON COLUMN fldtmegoldas.modositas IS 'ezredmásodperc pontosság';

-- triggerek létrehozása

-- letrejott és modositas mező automatikus beállítása
CREATE OR REPLACE FUNCTION set_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    NEW.letrejott = NOW();
    NEW.modositas = NOW();
  ELSIF (TG_OP = 'UPDATE') THEN
    NEW.modositas = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- letrejott mező automatikus beállítása
CREATE OR REPLACE FUNCTION set_letrejott()
RETURNS TRIGGER AS $$
BEGIN
  NEW.letrejott = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- felhasznalo lejarat automatikus beállítása
CREATE OR REPLACE FUNCTION set_felhasznalo_lejar()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set lejar on INSERT if it's not already provided
  IF (TG_OP = 'INSERT') AND (NEW.lejar IS NULL) THEN
    NEW.lejar := NOW() + INTERVAL '30 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- felhasznalo lejar nem lepthet be automatikus beállítása
CREATE OR REPLACE FUNCTION set_belephet_false_if_lejar_passed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lejar < NOW() THEN
    NEW.belephet := FALSE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- felhasznalo tábla triggerei
CREATE TRIGGER trg_felhasznalo_timestamps
BEFORE INSERT OR UPDATE ON felhasznalo
FOR EACH ROW EXECUTE FUNCTION set_timestamps();

CREATE TRIGGER trg_felhasznalo_lejar
BEFORE INSERT ON felhasznalo
FOR EACH ROW
EXECUTE FUNCTION set_felhasznalo_lejar();

CREATE OR REPLACE FUNCTION set_belephet_false_if_lejar_passed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lejar < NOW() THEN
    NEW.belephet := FALSE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- feladat tábla triggere
CREATE TRIGGER trg_feladat_letrejott
BEFORE INSERT ON feladat
FOR EACH ROW EXECUTE FUNCTION set_letrejott();

-- fldtkep tábla triggere
CREATE TRIGGER trg_fldtkep_letrejott
BEFORE INSERT ON fldtkep
FOR EACH ROW EXECUTE FUNCTION set_letrejott();

-- fldtkp tábla triggere
CREATE TRIGGER trg_fldtkp_timestamps
BEFORE INSERT OR UPDATE ON fldtkp
FOR EACH ROW EXECUTE FUNCTION set_timestamps();

-- fldtflhsznl tábla triggere
CREATE TRIGGER trg_fldtflhsznl_timestamps
BEFORE INSERT OR UPDATE ON fldtflhsznl
FOR EACH ROW EXECUTE FUNCTION set_timestamps();

-- fldtmegoldas tábla triggere
CREATE TRIGGER trg_fldtmegoldas_timestamps
BEFORE INSERT OR UPDATE ON fldtmegoldas
FOR EACH ROW EXECUTE FUNCTION set_timestamps();