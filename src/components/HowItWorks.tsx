import { motion } from "framer-motion";
import { Link2, Settings, Download, Play } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Paste URL",
    description:
      "Copy the YouTube video URL and paste it into the input field above.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Choose Format",
    description:
      "Select your preferred format - MP3 for audio or MP4 for video, and pick the quality.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download",
    description:
      "Click the download button and your file will be ready in seconds. It's that simple!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Converting YouTube videos to MP3 has never been easier. Just follow
            these three simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20 mb-6 relative z-10">
                <step.icon className="w-7 h-7 text-white" />
              </div>

              {/* Number Badge */}
              <div className="absolute -top-2 -right-2 md:right-1/3 md:translate-x-8 w-8 h-8 rounded-full bg-slate-800 border border-red-500/30 flex items-center justify-center">
                <span className="text-xs font-bold text-red-400">
                  {step.number}
                </span>
              </div>

              <h3 className="text-white font-semibold text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Demo Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative aspect-video bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-500/90 flex items-center justify-center shadow-xl shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-medium text-sm">
                Watch how to convert YouTube to MP3
              </p>
              <p className="text-slate-500 text-xs mt-1">
                1:30 min tutorial
              </p>
            </div>
            {/* Decorative */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-red-500/5 rounded-full blur-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
