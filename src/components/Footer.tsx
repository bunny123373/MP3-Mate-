import { Music, Globe, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                MP3<span className="text-red-500">Mate</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The fastest and most reliable YouTube to MP3 converter. Convert
              your favorite videos to high-quality audio files in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", id: "hero" },
                { label: "Features", id: "features" },
                { label: "How It Works", id: "how-it-works" },
                { label: "FAQ", id: "faq" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-slate-400 hover:text-red-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Terms of Service", "Privacy Policy", "DMCA", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-slate-400 hover:text-red-400 text-sm transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />{" "}
            by MP3Mate Team
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">
              <MessageCircle className="w-5 h-5" />
            </span>
            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">
              <Globe className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
