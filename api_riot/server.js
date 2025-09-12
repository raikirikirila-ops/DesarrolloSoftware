require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.RIOT_API_KEY;
const REGIONAL_ROUTE = process.env.REGIONAL_ROUTE || "americas";

// 🔎 Buscar perfil por Riot ID (gameName + tagLine)
app.get("/profile/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;

    const url = `https://${REGIONAL_ROUTE}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}?api_key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error en la API de Riot" });
    }

    const data = await response.json();
    res.json(data); // Devuelve { puuid, gameName, tagLine }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
