// child.js
import { exec } from "child_process";
import path from "path";
import fs from "fs";
const __dirname = path.resolve();
// Run the pip show chainlit command

process.on("message", (msg) => {
  // const appPath = path.resolve(__dirname, "..", "rag-chatbot", "app.py");
  const envPath = path.resolve(__dirname, "..", "rag-chatbot", ".env");

  // Read the existing content of the .env file
  let envContent = "";
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }

  // Construct the new line to be written
  const newLine = `PRAKRITI=${msg.data}\n`;

  // Check if CHAINLIT_ARG already exists in the .env file
  const regex = /^PRAKRITI=.*/m;
  if (regex.test(envContent)) {
    // If CHAINLIT_ARG exists, replace its value
    envContent = envContent.replace(regex, newLine);
  } else {
    // If CHAINLIT_ARG does not exist, append it to the end
    envContent += newLine;
  }

  // Write the modified content back to the .env file
  fs.writeFileSync(envPath, envContent);

  const appPath = path.resolve(__dirname, "..", "rag-chatbot", "app.py");
  const command = `chainlit run ${appPath}`;
  console.log("running this command :", command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log("error here : ", error);
      process.send({ error: stderr });
      return;
    }
    process.send({ data: stdout });
  });
});
