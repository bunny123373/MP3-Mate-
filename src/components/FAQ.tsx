import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is MP3Mate free to use?",
    answer:
      "Yes! MP3Mate is completely free to use. You can convert and download unlimited YouTube videos to MP3 or MP4 format without any hidden fees or subscriptions.",
  },
  {
    question: "What audio quality can I download?",
    answer:
      "We offer multiple audio quality options including 320kbps (highest quality), 256kbps, 192kbps, and 128kbps. Choose the one that best fits your needs.",
  },
  {
    question: "Is it safe and legal to use?",
    answer:
      "MP3Mate is safe to use - we don't require any software installation or personal information. However, please respect copyright laws and only download content you have permission to use.",
  },
  {
    question: "Can I use this on my phone?",
    answer:
      "Absolutely! MP3Mate works on all devices including iPhones, Android phones, tablets, and desktop computers. Just open your browser and start converting.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No installation needed. MP3Mate is a web-based converter that works directly in your browser. Just visit the website, paste your URL, and download.",
  },
  {
    question: "How long does the conversion take?",
    answer:
      "Most conversions are completed within a few seconds. The exact time depends on the video length and the selected quality, but our optimized servers ensure the fastest possible processing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-4 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
            <HelpCircle className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Got questions? We've got answers.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                  openIndex === index
                    ? "border-red-500/30 bg-slate-900/80"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className={`font-medium text-sm sm:text-base pr-4 ${
                      openIndex === index ? "text-red-400" : "text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`w-5 h-5 ${
                        openIndex === index
                          ? "text-red-400"
                          : "text-slate-500"
                      }`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
