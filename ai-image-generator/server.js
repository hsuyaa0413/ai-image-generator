const express = require("express")
const axios = require("axios")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())

const invokeUrl =
  "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl"

const API_KEY = process.env.API_KEY

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello there!")
})

app.post("/generate-image", async (req, res) => {
  try {
    const response = await axios.post(invokeUrl, req.body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    })

    res.status(200).send(response.data)
  } catch (e) {
    res.status(500).json({
      error: "API request not successful",
    })
  }
})

const PORT = 3000

app.listen(PORT, () => console.log(`The app is running on port ${PORT}...`))
