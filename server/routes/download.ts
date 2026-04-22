import { Router } from "express";
import { getVideoInfo, downloadVideo } from "../services/youtube";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.post("/info", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "URL is required" });
      return;
    }

    const result = await getVideoInfo(url);
    res.json(result);
  } catch (error) {
    console.error("Error getting video info:", error);
    res.status(500).json({ error: "Failed to get video info" });
  }
});

router.post("/download", async (req, res) => {
  try {
    const { url, formatId } = req.body;
    if (!url || !formatId) {
      res.status(400).json({ error: "URL and formatId are required" });
      return;
    }

    const timestamp = Date.now();
    const filename = `download_${timestamp}`;
    const isAudio = formatId.startsWith("mp3-");
    const ext = isAudio ? ".mp3" : ".mp4";
    const outputPath = path.join(__dirname, "..", "downloads", filename + ext);

    const filePath = await downloadVideo(url, formatId, outputPath);
    
    res.setHeader("Content-Disposition", `attachment; filename="${filename}${ext}"`);
    res.setHeader("Content-Type", isAudio ? "audio/mpeg" : "video/mp4");
    res.setHeader("Content-Length", String(fs.statSync(filePath).size));
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    fileStream.on("end", () => {
      console.log("Download complete, cleaning up after delay...");
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, () => {});
        }
      }, 300000);
    });
    
    fileStream.on("error", (err) => {
      console.error("Stream error:", err);
    });
  } catch (error) {
    console.error("Error downloading video:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to download video" });
    }
  }
});

export default router;