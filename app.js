import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDatabase from "./src/database/db.js";
import router from "./src/routes/index.js";

const app = express();
connectDatabase();

const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`🟢 Server On ${port}`);
});
