const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./config/db");
const UserRouter = require("./routes/UserRouter");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gayasrivinay2003-ux-phonesfrontend.vercel.app",
    ],
  })
);

app.use(express.json());

app.use(UserRouter);

const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

db();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server started");
});