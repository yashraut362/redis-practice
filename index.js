const express = require("express");
const axios = require("axios");
const cors = require("cors");
const redis = require("redis");
const app = express();

app.use(express.urlencoded({ extended: true }));
const defaultExpiry = 3600;
app.use(cors());

const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Something went wrong " + err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis", err);
  }
})();

app.get("/photos", async (req, res) => {
  try {
    const photos = await getOrSetCache("photos", async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos`
      );
      return data;
    });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/photos/:id", async (req, res) => {
  try {
    const photo = await getOrSetCache(`photo:${req.params.id}`, async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
      );
      return data;
    });
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getOrSetCache(key, cb) {
  try {
    const data = await redisClient.get(key);
    if (data) {
      console.log("Cache Hit");
      return JSON.parse(data);
    } else {
      console.log("Cache Miss");
      const freshData = await cb();
      await redisClient.setEx(key, defaultExpiry, JSON.stringify(freshData));
      return freshData;
    }
  } catch (err) {
    console.error("Redis error:", err);
    throw err;
  }
}

const port = 6969;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
