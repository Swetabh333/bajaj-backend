import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
  allowHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const PORT = process.env.PORT || "5000";

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
