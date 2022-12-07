import "dotenv/config";

import path from "path";
import cors from "cors";
import express from "express";
import routes from "./routes";
import fs from "fs";
import https from "https";
import "./database";

class App {
  constructor() {
    const key = fs.readFileSync("./key.pem");
    const cert = fs.readFileSync("./cert.pem");
    this.app = express();
    this.server = https.createServer({ key: key, cert: cert }, this.app);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.app.use(routes);
  }
}
export default new App().server;
