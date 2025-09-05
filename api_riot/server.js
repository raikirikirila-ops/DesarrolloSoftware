import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.RIOT_API_KEY;

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de Riot API funcionando 🚀");
});

// Buscar invocador por nombre
app.get("/summoner/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const response = await fetch(
      `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
        name
      )}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error en la API de Riot" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Historial de partidas por PUUID
app.get("/matches/:puuid", async (req, res) => {
  try {
    const { puuid } = req.params;

    const response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error en la API de Riot" });
    }

    const matches = await response.json();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
