import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://mp3mate-backend.onrender.com";

import {
  Link2,
  Loader2,
  ArrowRight,
  Music,
  Video,
  FileAudio,
  CheckCircle2,
  AlertCircle,
  Download,
  Play,
  Clock,
  User,
  Headphones,
} from "lucide-react";

interface VideoInfo {
  title: string;
  author: string;
  duration: string;
  thumbnail: string;
  views: string;
}

interface Format {
  quality: string;
  size: string;
  type: "mp3" | "mp4";
  format_id?: string;
  bitrate?: string;
}

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadComplete, setDownloadComplete] = useState<string | null>(null);
  const API_URL = "https://mp3mate-backend.onrender.com";
  const [formats, setFormats] = useState<Format[]>([
    { quality: "320kbps", size: "8.2 MB", type: "mp3", bitrate: "320kbps" },
    { quality: "256kbps", size: "6.5 MB", type: "mp3", bitrate: "256kbps" },
    { quality: "192kbps", size: "4.9 MB", type: "mp3", bitrate: "192kbps" },
    { quality: "128kbps", size: "3.3 MB", type: "mp3", bitrate: "128kbps" },
    { quality: "1080p", size: "42 MB", type: "mp4" },
    { quality: "720p", size: "28 MB", type: "mp4" },
    { quality: "480p", size: "18 MB", type: "mp4" },
    { quality: "360p", size: "12 MB", type: "mp4" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError("");
    } catch {
      inputRef.current?.focus();
    }
  };

  const handleConvert = async () => {
    if (!url.trim()) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    setError("");
    setLoading(true);
    setVideoInfo(null);
    setDownloadComplete(null);

    try {
      console.log("Fetching info for:", url);
      const response = await fetch(`${API_URL}/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Got data:", data);
      
      const mappedFormats = data.formats.map((f: { format_id: string; quality: string; size: string; ext: string; bitrate?: string }) => ({
        format_id: f.format_id,
        quality: f.quality,
        size: f.size,
        type: (f.ext === "mp3" ? "mp3" : "mp4") as "mp3" | "mp4",
        bitrate: f.bitrate,
      }));
      
      setVideoInfo({
        title: data.info.title,
        author: data.info.author,
        duration: data.info.duration,
        thumbnail: data.info.thumbnail,
        views: data.info.views,
      });
      setFormats(mappedFormats);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch video");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: Format) => {
    const formatIdMap: Record<string, string> = {
      "320kbps": "mp3-320",
      "256kbps": "mp3-256",
      "192kbps": "mp3-192",
      "128kbps": "mp3-128",
      "1080p": "video-1080",
      "720p": "video-720",
      "480p": "video-480",
      "360p": "video-360",
    };
    const formatId = formatIdMap[format.quality] || format.format_id;
    if (!formatId) return;

    setDownloading(format.quality);
    
    try {
      const response = await fetch(`${API_URL}/api/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, formatId }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      
      const blob = await response.blob();
      const contentType = response.headers.get("Content-Type") || "";
      const ext = contentType.includes("audio") ? ".mp3" : ".mp4";
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${videoInfo?.title?.slice(0, 50) || "download"}${ext}`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      }, 1000);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(null);
      setDownloadComplete(format.quality);
      setTimeout(() => setDownloadComplete(null), 3000);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
        >
          <Headphones className="w-4 h-4" />
          Free & Fast YouTube Converter
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          YouTube to{" "}
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            MP3
          </span>{" "}
          Converter
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Convert and download YouTube videos to high-quality MP3 or MP4
          formats. Fast, free, and unlimited conversions.
        </motion.p>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm" />
            <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="pl-4 sm:pl-5">
                <Link2 className="w-5 h-5 text-slate-500" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleConvert()}
                placeholder="Paste YouTube URL here..."
                className="flex-1 bg-transparent px-3 sm:px-4 py-4 sm:py-5 text-white placeholder-slate-500 text-sm sm:text-base outline-none"
              />
              <button
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 mr-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                Paste
              </button>
              <button
                onClick={handleConvert}
                disabled={loading}
                className="flex items-center gap-2 px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Converting...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Convert</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Supported Platforms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500"
        >
          <span>Supports:</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Play className="w-3 h-3 text-red-500" /> YouTube
            </span>
            <span className="flex items-center gap-1">
              <Music className="w-3 h-3 text-red-500" /> YouTube Music
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3 text-red-500" /> Shorts
            </span>
          </div>
        </motion.div>

        {/* Video Result */}
        <AnimatePresence>
          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-10 text-left"
            >
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                {/* Video Info */}
                <div className="p-5 sm:p-6 border-b border-slate-800">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-48 h-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                      <img
                        src={videoInfo.thumbnail}
                        alt={videoInfo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white font-medium">
                        {videoInfo.duration}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base sm:text-lg line-clamp-2 mb-2">
                        {videoInfo.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {videoInfo.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {videoInfo.duration}
                        </span>
                        <span>{videoInfo.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-800">
                  <button
                    onClick={() => setActiveTab("mp3")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors relative ${
                      activeTab === "mp3"
                        ? "text-red-400"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <FileAudio className="w-4 h-4" />
                    Audio (MP3)
                    {activeTab === "mp3" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("mp4")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors relative ${
                      activeTab === "mp4"
                        ? "text-red-400"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Video (MP4)
                    {activeTab === "mp4" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                      />
                    )}
                  </button>
                </div>

                {/* Format List */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formats
                      .filter((f) => f.type === activeTab)
                      .map((format) => (
                        <motion.div
                          key={format.quality}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-red-500/30 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                              {activeTab === "mp3" ? (
                                <FileAudio className="w-5 h-5 text-red-400" />
                              ) : (
                                <Video className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm">
                                {format.quality}
                              </div>
                              <div className="text-slate-500 text-xs">
                                {format.size}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(format)}
                            disabled={downloading === format.quality}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              downloadComplete === format.quality
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500 hover:bg-red-600 text-white"
                            } disabled:opacity-70`}
                          >
                            {downloading === format.quality ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="hidden sm:inline">
                                  Preparing...
                                </span>
                              </>
                            ) : downloadComplete === format.quality ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  Done
                                </span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  Download
                                </span>
                              </>
                            )}
                          </button>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
