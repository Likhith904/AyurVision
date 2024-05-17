import express from "express";
import cors from "cors";
// import { createProxyMiddleware } from "http-proxy-middleware";
import { spawn } from "child_process";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
// app.use((req, res, next) => {
//   res.setHeader("X-Frame-Options", "ALLOW-FROM http://localhost:5173");
//   res.setHeader(
//     "Content-Security-Policy",
//     "frame-ancestors 'self' http://localhost:5173"
//   );
//   next();
// });
// app.use(
//   "/chainlit",
//   createProxyMiddleware({ target: "http://localhost:8000", changeOrigin: true })
// );
app.post("/chatbot", (req, res) => {});

app.get("/chatbot", (req, res) => {
  res.send("Get request received");
});

app.post("/predict", (req, res) => {
  console.log("Request received");
  // Receive input data from client
  const inputData = req.body;

  // Spawn child process
  const pythonProcess = spawn("python", ["model.py"]);

  // Send input data to child process
  pythonProcess.stdin.write(JSON.stringify(inputData));
  pythonProcess.stdin.end();

  var dataToSend = "";

  // Listen for output from child process
  pythonProcess.stdout.on("data", (data) => {
    dataToSend = data.toString();
  });
  pythonProcess.stdout.on("error", (err) => {
    console.error("Error in stdout:", err);
  });

  // Handle errors in stderr
  // pythonProcess.stderr.on("data", (data) => {
  //   console.error("Error in stderr:", data.toString());
  // });

  pythonProcess.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
    try {
      res.status(200).json({ msg: dataToSend });
    } catch (error) {
      console.error("Error:", error.msg);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
