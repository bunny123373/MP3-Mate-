import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Infinity,
  Smartphone,
  Headphones,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Convert YouTube videos to MP3 in seconds with our optimized processing engine.",
  },
  {
    icon: Shield,
    title: "100% Safe & Secure",
    description:
      "No registration required. No malware. Your privacy is our top priority.",
  },
  {
    icon: Infinity,
    title: "Unlimited Downloads",
    description:
      "Download as many videos as you want. No daily limits, no restrictions.",
  },
  {
    icon: Headphones,
    title: "High Quality Audio",
    description:
      "Get crystal clear MP3 files up to 320kbps bitrate for the best listening experience.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Works perfectly on any device - iPhone, Android, tablet, or desktop browser.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "Compatible with all major browsers including Chrome, Firefox, Safari, and Edge.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              MP3Mate
            </span>
            ?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            The most reliable YouTube to MP3 converter with features designed
            for the best user experience.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
