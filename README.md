Dropshipping React + Node.js Projektas

Ši aplikacija leidžia vartotojams naršyti CJ Dropshipping produktus, juos įsidėti į krepšelį ir atlikti užsakymą. Tik prisijungę vartotojai gali pirkti.

---

## Projekto struktūra

```
/frontend       -> React + TypeScript (Vite)
/server         -> Node.js + Express (API backend)
/cjToken.json   -> Automatiškai sugeneruojamas CJ token failas
```

---

## 1. Backend priklausomybės

### server/package.json


npm install axios@^1.11.0 bcrypt@^6.0.0 bcryptjs@^3.0.2 cors@^2.8.5 dotenv@^17.2.1 express@^5.1.0 jsonwebtoken@^9.0.2 mongoose@^8.16.5


---

##  2. Frontend priklausomybės

### frontend/package.json


npm install axios@^1.11.0 bootstrap@^5.3.7 framer-motion@^12.23.12 react@^19.1.0 react-bootstrap@^2.10.10 react-dom@^19.1.0 react-icons@^5.5.0 react-router-dom@^7.7.1 react-spinners@^0.17.0


### Dev dependencies (automatiškai per `npm install`):

- TypeScript, Vite
- Sass
- ESLint
- @vitejs/plugin-react
- @types/react

---

## Backend paleidimas

1. Eik i /server aplanka:


cd server


2. Įdiek priklausomybes:


npm install


3. Sukurk `.env` failą:

env
PORT=5000
MONGO_URL=mongodb://localhost:27017/dropshipping
JWT_SECRET=superSlaptasRaktas123
CJ_EMAIL=tavo_cj_email@example.com
CJ_API_KEY=tavo_cj_api_slaptazodis


4. Paleisk serveri:


node server.js


Veiks adresu: `http://localhost:5000`

---

## Frontend paleidimas

1. Eik i /frontend aplanka:


cd frontend


2. Įdiek priklausomybes:


npm install


3. Paleisk Vite:


npm run dev


Veiks adresu: `http://localhost:5173`

---

##  Prisijungimas ir registracija

- Registracija: vardas, pavardė, el. paštas, telefonas, slaptažodis
- Prisijungus vartotojo duomenys ir token saugomi `localStorage`
- Tik prisijunge vartotojai gali atlikti užsakymus

---

## CJ Dropshipping API

- Produktų sąrašas: /product/myProduct/query
- Produktų detalės: /product/query?pid=...
- Token automatiškai atnaujinamas (cjToken.json)

---



## Viskas!

Jei neveikia:
- Patikrink `.env` failą
- Ar MongoDB veikia
- Ar CJ API duomenys teisingi