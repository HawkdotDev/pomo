const { program } = require("commander");
const { exec } = require("child_process");
const express = require("express");

const DEFAULT_PORT = 6969;
const DEFAULT_URL = `http://localhost:${DEFAULT_PORT}`;

const app = express();

function startServer(port) {
  try {
    app.listen(port, () => {
      console.log(`pomi is running at http://localhost:${port}`);
      openDefaultBrowser(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

function openDefaultBrowser(url) {
  const openCommand =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
      ? "start"
      : "xdg-open";
  exec(`${openCommand} ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening browser: ${error.message}`);
    } else if (stderr) {
      console.error(`Error opening browser: ${stderr}`);
    } else {
      console.log(`Opened ${url} in the default browser`);
    }
  });
}

function startUI(port) {
  // app.use(express.static(path.join(__dirname, "frontend")));
  // const indexPath = path.join(__dirname, 'frontend').replace(/\\/g, '/');
  // console.log(indexPath)
  app.use(express.static("./frondend"));
  startServer(port);
}

program
  .command("start")
  .description(`Start the UI at localhost: ${DEFAULT_PORT}`)
  .option("-p, --port <port>", "Port number to run the server", parseInt)
  .action((options) => {
    const port = options.port || DEFAULT_PORT;
    startUI(port);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
