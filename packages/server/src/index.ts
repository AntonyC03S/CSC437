import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Traveler from "./services/traveler-svc";
import travelers from "./routes/travelers";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("CSC437"); 
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



app.get("/travelers/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Traveler.get(userid).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.use("/api/travelers", authenticateUser, travelers);
app.use("/auth", auth);