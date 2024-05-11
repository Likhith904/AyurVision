import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {spawn} from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post("/chatbot", (req, res) => {
});

app.get("/chatbot", (req, res) => {
    res.send("Get request received");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

