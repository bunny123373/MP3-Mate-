export interface VideoInfo {
  id: string;
  title: string;
  author: string;
  duration: string;
  thumbnail: string;
  views: string;
}

export interface Format {
  format_id: string;
  quality: string;
  ext: string;
  size: string;
  bitrate?: string;
}

export interface DownloadOptions {
  url: string;
  format: string;
  quality?: string;
}

export async function getVideoInfo(url: string): Promise<{ info: VideoInfo; formats: Format[] }> {
  const { exec } = await import("child_process");
  const { promisify } = await import("util");
  const execAsync = promisify(exec);

  try {
    const command = `yt-dlp --dump-json --no-download --no-warnings "${url}"`;
    console.log("Running command:", command);
    const { stdout, stderr } = await execAsync(command, { timeout: 90000 });
    
    if (stderr) console.log("stderr:", stderr);
    
    if (!stdout || stdout.trim() === "") {
      throw new Error(stderr || "No output from yt-dlp - video may be unavailable or private");
    }
    
    const info = JSON.parse(stdout);

    const durationSeconds = info.duration || 0;
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const videoInfo: VideoInfo = {
      id: info.id,
      title: info.title,
      author: info.uploader || "Unknown",
      duration,
      thumbnail: info.thumbnail || info.thumbnails?.[0]?.url || "",
      views: `${(info.view_count || 0).toLocaleString()} views`,
    };

    const formats: Format[] = [
      { format_id: "mp3-320", quality: "320kbps", ext: "mp3", size: "~8 MB", bitrate: "320k" },
      { format_id: "mp3-256", quality: "256kbps", ext: "mp3", size: "~6 MB", bitrate: "256k" },
      { format_id: "mp3-192", quality: "192kbps", ext: "mp3", size: "~5 MB", bitrate: "192k" },
      { format_id: "mp3-128", quality: "128kbps", ext: "mp3", size: "~3 MB", bitrate: "128k" },
      { format_id: "video-1080", quality: "1080p", ext: "mp4", size: "~42 MB" },
      { format_id: "video-720", quality: "720p", ext: "mp4", size: "~28 MB" },
      { format_id: "video-480", quality: "480p", ext: "mp4", size: "~18 MB" },
      { format_id: "video-360", quality: "360p", ext: "mp4", size: "~12 MB" },
    ];

    return { info: videoInfo, formats };
  } catch (error) {
    console.error("yt-dlp error:", error);
    throw error;
  }
}

export async function downloadVideo(
  url: string,
  formatId: string,
  outputPath: string
): Promise<string> {
  const { exec } = await import("child_process");
  const { promisify } = await import("util");
  const execAsync = promisify(exec);

  let command = "";
  if (formatId.startsWith("mp3-")) {
    const bitrate = formatId.split("-")[1];
    command = `yt-dlp -x --audio-format mp3 --audio-quality ${bitrate}k -o "${outputPath}" "${url}"`;
  } else if (formatId.startsWith("video-")) {
    const resolution = parseInt(formatId.split("-")[1]);
    command = `yt-dlp -f "best[height<=${resolution}]" -o "${outputPath}" "${url}"`;
  }

  try {
    console.log("Running:", command);
    const { stdout, stderr } = await execAsync(command);
    if (stderr) console.log("stderr:", stderr);
    console.log("stdout:", stdout);
    return outputPath;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}