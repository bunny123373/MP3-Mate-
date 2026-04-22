import express from "express";
import cors from "cors";
import downloadRouter from "../routes/download";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
}));

app.use(express.json({ limit: "10mb" }));

app.use("/api", downloadRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;