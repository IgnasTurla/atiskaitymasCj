import fs from "fs/promises";
import path from "path";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const tokenPath = path.resolve("cjToken.json");

// gauti nauja cj tokena
export async function getCjAccessToken() {
  try {
    const res = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",
      {
        email: process.env.CJ_EMAIL,
        password: process.env.CJ_API_KEY,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const tokenData = res.data.data;

    // issaugoti tokena i faila
    await fs.writeFile(tokenPath, JSON.stringify(tokenData, null, 2));
    console.log("Cj tokenas issaugotas");

    return tokenData.accessToken;
  } catch (err) {
    console.error("❌ Nepavyko gauti CJ token:", err.response?.data || err.message);
    throw err;
  }
}

// ikelti tokena arba gauti nauja
export async function loadCjToken() {
  try {
    const raw = await fs.readFile(tokenPath, "utf-8");
    const data = JSON.parse(raw);

    const now = new Date();
    const expire = new Date(data.accessTokenExpiryDate);

    if (now < expire) {
      return data.accessToken; 
    } else {
      console.log("token pasibaiges gauname nauja");
      return await getCjAccessToken();
    }
  } catch (err) {
    console.warn("token failas nerastas");
    return await getCjAccessToken();
  }
}


export async function registerUser(req, res) {
  try {
    const { name, surname, email, phone, password } = req.body;

    if (!name || !surname || !email || !phone || !password) {
      return res.status(400).json({ message: "Užpildykite visus laukus" });
    }

    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });

    if (existingEmail) {
      return res.status(400).json({ message: "El. paštas jau naudojamas" });
    }
    if (existingPhone) {
      return res.status(400).json({ message: "Telefono numeris jau naudojamas" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, surname, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Registracija sėkminga!" });
  } catch (err) {
    console.error("Klaida registruojant:", err);
    res.status(500).json({ message: "Serverio klaida" });
  }
}



export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Neteisingi duomenys" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Neteisingi duomenys" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Prisijungimo klaida:", err);
    res.status(500).json({ message: "Serverio klaida" });
  }
}
