import express from "express";
import cors from "cors";
import path from "path";
// import { createProxyMiddleware } from "http-proxy-middleware";
import { fork, spawn } from "child_process";
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
const __dirname = path.resolve();
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

// const getPrakriti = (dataToSend, res) => {
//   const virtualEnvPath = path.resolve(__dirname, "..", ".venv");
//   const pythonExecutable = path.join(virtualEnvPath, "Scripts", "python");

//   // console.log(`Using Python executable: ${pythonExecutable}`);

//   // const args = ["./child.py", JSON.stringify(dataToSend.data)];

//   const pythonProcess = spawn(pythonExecutable, args);

//   pythonProcess.stdout.on("data", (data) => {
//     console.log(`stdout from Python script: ${data}`);
//     // You might want to send this data as a response
//     res.status(200).json({ output: data.toString() });
//   });

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`stderr from Python script: ${data}`);
//     res.status(500).send("Error occurred in Python script.");
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`Python process exited with code ${code}`);
//     if (code !== 0) {
//       res.status(500).send("Error occurred during Python execution.");
//     }
//   });
// };

const getPrakriti = (dataToSend, res) => {
  const virtualEnvPath = path.resolve(__dirname, "..", ".venv");
  const activateScript =
    process.platform == "win32"
      ? path.join(virtualEnvPath, "Scripts", "activate")
      : path.join("source", virtualEnvPath, "bin", "activate");
  // const activateScript = escape(activateScript1);
  console.log(activateScript);
  const activateProcess = exec(activateScript, [], { shell: true });
  activateProcess.stdout.on("data", (data) => {
    console.log(`stdout (activate): ${data}`);
  });

  activateProcess.stderr.on("data", (data) => {
    console.error(`stderr (activate): ${data}`);
  });

  activateProcess.on("close", (code) => {
    console.log(`child process (activate) exited with code ${code}`);
    const pythonProcess = spawn("./child.js", []);

    console.log("running inside getPrakriti");
    const data = dataToSend.data;
    console.log(dataToSend);
    pythonProcess.send({ data: dataToSend });

    // Listen for messages from the child process
    pythonProcess.on("message", (message) => {
      if (message.error) {
        console.error(`stderr in child: ${message.error}`);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(message.data);
        // res.status(200).send("Success");
      }
    });

    // Handle child process exit
    pythonProcess.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
      try {
        // Handle received data as needed
        res.status(200).json({ success: true, data: dataToSend });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
      }
    });
  });
};

app.post("/chatbot", (req, res) => {
  console.log("prakriti request send");
  let input_data = req.query.msg || "";
  getPrakriti(input_data, res);
});

// app.get("/chatbot", (req, res) => {
//   // console.log("prakriti request send");
//   const input_data = req.query.msg || "";
//   getPrakriti(input_data, res);
// });

app.post("/predict", (req, res) => {
  console.log("Request received");
  // Receive input data from client
  const inputData = req.body;
  const pythonExecutable = path.resolve(
    __dirname,
    "..",
    ".venv",
    "Scripts",
    "python.exe"
  );
  // Spawn child process
  // const pythonProcess = spawn("python", ["model.py"]);
  const pythonProcess = spawn(pythonExecutable, ["./model.py"]);

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

  //Handle errors in stderr
  pythonProcess.stderr.on("data", (data) => {
    console.error("Error in stderr:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
    // getPrakriti({ prakriti: dataToSend });

    try {
      // console.log(dataToSend);
      res.status(200).json(dataToSend);
    } catch (error) {
      console.error("Error:", error.msg);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
