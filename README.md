# Feladatleírás és Segédlet

## 📦 A ZIP-ben található állományok

- **alextesztfeladat.txt**  
  _Ez a leírás maga_
- **8felhasznalo.csv**  
  _Segítség a teszt felhasználókhoz_
- **alexteszt.yaml**  
  _OpenAPI definíciós állomány (nem biztos, hogy hibátlan)_
- **backnddbcreate.sql**  
  _Az adatbázist létrehozó állomány (nem biztos, hogy hibátlan)_
- **Tiszaújváros_koordinata.csv**  
  _Néhány hely neve és koordinátája a feladatokhoz (OSM-ből)_

---

## 🛠️ Feladat

### Pár előzetes dolog

- Tedd a **PostgreSQL-t** Dockerbe. (legyen a neve: `psqlab`)
- Tedd a **Node.js és Express-t** Dockerbe (legyen a neve: `bckend`)
- Célszerű a **Vue.js** programot külön Dockerbe tenni (legyen a neve: `frtend`), ez localhost esetén gond nélkül működik.

### Teendők

- Hozd létre az adatbázist.
- A kapott SQL-t szükség szerint javítsd, bővítsd (pl. trigger, hogy írja be, mikor jött létre a rekord).
- Generáld bele a felhasználókat a kapott állomány alapján, 30 napos lejárattal.

---

## 💡 Megjegyzések

- **PC-n futó kliens esetén**: a képet feltölteni kell, a helyet (koordinátákat) be kell írni.
- **Telefonon futó kliens esetén**: fényképezni is lehessen, a helyet (koordinátákat) ki lehessen olvasni.

---

## 📃 OpenAPI (alexteszt.yaml)

- Az `alexteszt.yaml` állományt szükség szerint javítsd (ellenőrizd, megfelel-e az OpenAPI3 specifikációnak!), bővítsd, ha szükséges (a CRUD a cél).
- Ennek segítségével tudod a backend (Express app) vázát legenerálni.
- A legenerált vázat ki kell tölteni, hogy az adatbázist is kezelje.

> **Tipp:** Insomnia segítségével tudod a backendet tesztelni.

- Az OpenAPI3 YAML a Vue.js kliensben is tud segíteni (nézz utána hogyan).

---

## 📝 Mit kell tudni?

- [X] Bejelentkezés
- [ ] Feladat felvétel képpel, képekkel
- [ ] Feladat módosítás, de csak addig, míg nincs készre jelentve
- [ ] Megoldott feladataim
- [ ] Megoldandó feladataim
- [ ] Jóváhagyásra váró feladataim
- [ ] Jóváhagyott feladataim
- [ ] Általam jóváhagyott feladatok
- [ ] Általam jóváhagyható feladatok
- [ ] Egy adott napra
- [ ] Egy adott területre
- [ ] Feladat helyek megmutatása térképen: hely kiválasztását követően a helyhez kapcsolódó feladat megmutatása
- [ ] Feladathoz emberek rendelése
- [ ] Feladat készre jelentése (csak a főnök a feladathoz rendeltek közül)
- [ ] Készre jelentés jóváhagyása, csak az teheti meg, aki nincs az adott feladathoz rendelve

> **Javaslat:** Valószínűleg érdemes a YAML-t kiegészíteni, hogy a fentiekhez is legyen API-hívás.

---

## 🔗 Hasznos linkek és eszközök

- **PostgreSQL**  
  https://www.postgresql.org/
- **pgAdmin**  
  https://www.pgadmin.org/download/pgadmin-4-macos/
- **pgcrypto**  
  https://www.postgresql.org/docs/current/pgcrypto.html
- **PostGIS**  
  https://postgis.net/
- **SQlite**  
  https://sqlitebrowser.org/dl/
- **Vue.js (Kliens oldal)**  
  https://vuejs.org/
- **Insomnia (API-teszthez)**  
  https://insomnia.rest/download
- **Express**  
  https://expressjs.com/
- **NodeJs**  
  https://nodejs.org/en
- **DoubleCommander**  
  https://doublecmd.sourceforge.io/#
- **OpenAPI3 (autentikáció)**  
  https://swagger.io/docs/specification/v3_0/authentication/

---

## 📱 Helyadatok elérése Android 10 vagy magasabb alatt

> "Android 10 vagy magasabb verzió alatt a Chrome böngészőből elérhetőek a helyadatok, de ehhez engedélyezned kell a hozzáférést.

A helyadatok elérésének két fő feltétele van:

1. Az Android-eszköz helymeghatározásának be kell lennie kapcsolva. Ezt a telefonod Beállítások menüjében a "Hely" vagy hasonló nevű menüpontban ellenőrizheted és kapcsolhatod be.
2. A Chrome böngészőnek engedélyt kell adnod a helyadatok elérésére. Ezt kétféleképpen teheted meg:
    - **Általános engedély a Chrome számára:** A telefonod Beállítások menüjében keresd meg az "Alkalmazások" vagy "Alkalmazáskezelő" menüt, válaszd ki a Chrome-ot, majd a "Engedélyek" alatt ellenőrizd, hogy a "Hely" engedély be van-e kapcsolva. Itt beállíthatod, hogy a Chrome mindig, csak használat közben, vagy soha ne férjen hozzá a helyadataidhoz.
    - **Weboldal-specifikus engedély:** Amikor egy weboldal a Chrome-ban kéri a helyzetedet, a böngésző fel fog ugrani egy engedélykérő ablak. Itt dönthetsz úgy, hogy engedélyezed egyszer, engedélyezed a weboldal használata közben, vagy letiltod a hozzáférést. A böngésző címsorában lévő kis ikonra (általában egy lakat vagy egy "i" betű egy körben) kattintva később is módosíthatod az adott weboldal helyhozzáférési beállításait.

**Összefoglalva:** Ha az Android-eszközödön be van kapcsolva a helymeghatározás, és a Chrome böngészőnek (vagy az adott weboldalnak a Chrome-on belül) engedélyt adsz a helyadatok elérésére, akkor a Chrome böngészőből elérhetőek lesznek a helyadataid Android 10 vagy magasabb verzió alatt."
> -- írta a GEMINI

---

## 📷 Böngészőből fényképezés (Android 10+)

> "Bár a Chrome böngésző önmagában nem rendelkezik beépített funkcióval közvetlen fényképezésre weboldalakon keresztül Android 10 vagy magasabb verzió alatt, a weboldalak elméletileg hozzáférhetnek a telefon kamerájához és készíthetnek képeket, ha ehhez engedélyt kapnak.

Íme néhány fontos szempont:

- **Weboldal engedélye:** A weboldalnak külön engedélyt kell kérnie a kamera használatához. Amikor egy weboldal először próbálja meg használni a kamerádat, a Chrome felugró ablakban megkérdezi, hogy engedélyezed-e a hozzáférést. Itt választhatod az "Engedélyezés" vagy a "Letiltás" opciót.
- **Biztonsági megfontolások:** Légy óvatos azzal, hogy mely weboldalaknak adsz hozzáférést a kamerádhoz. Csak megbízható weboldalaknak engedélyezd ezt.
- **Weboldal implementáció:** A weboldalnak rendelkeznie kell a megfelelő technikai implementációval ahhoz, hogy a böngészőn keresztül hozzáférjen a kamerához és rögzítsen képeket. Nem minden weboldal rendelkezik ilyen funkcióval.
- **Chrome beállítások:** A Chrome beállításaiban is kezelheted a weboldalak kamera-hozzáférését. A Beállítások -> Webhelybeállítások -> Kamera menüpontban megtekintheted és módosíthatod az egyes weboldalak engedélyeit.

**Összefoglalva:** Technikailag lehetséges, hogy egy weboldal a Chrome böngészőn keresztül fényképet készítsen Android 10 vagy magasabb verzió alatt, amennyiben a weboldal rendelkezik a szükséges funkcióval és a felhasználó engedélyezi a kamera hozzáférést. Azonban ez nem egy általános, beépített Chrome funkció a böngészés során. A legtöbb esetben a fényképezéshez a telefon natív Kamera alkalmazását vagy más, erre dedikált alkalmazást kell használnod."
> -- írta a GEMINI
