import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

// 🔹 Replace content with your project’s testimonials
const testimonials = [
  {
    name: "Samantha Lee",
    role: "Software Engineer @ Google",
    text: "MockMaster gave me the confidence I needed. The AI feedback was spot-on and helped me ace my interviews.",
    avatar: "/assets/img/user.png",
  },
  {
    name: "Rahul Sharma",
    role: "Backend Developer @ Amazon",
    text: "The mock interviews felt so real! I improved my problem-solving speed and communication drastically.",
    avatar: "/assets/img/user.png",
  },
  {
    name: "Emily Davis",
    role: "Data Scientist @ Microsoft",
    text: "I loved the personalized feedback. It highlighted my weak spots and helped me land my dream job!",
    avatar: "/assets/img/user.png",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = () => {
    setDirection("right");
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection("left");
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[index];

  return (
    <section className="w-full bg-gradient-to-b flex flex-col items-center justify-center px-6 py-16 relative">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-2">
        Candidate <span className="text-blue-600">Testimonials</span>
      </h2>
      <p className="text-blue-400 text-center mb-12 max-w-2xl">
        Hear from our candidates who boosted their confidence and landed jobs
        with MockMaster.
      </p>

      <div className="relative w-full max-w-4xl">
        {/* Left Button */}
        <button
          onClick={prev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-400 text-black p-4 rounded-full shadow-lg z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Testimonial Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            className="bg-white/95 dark:bg-gray-900 border border-gray-400 dark:border-gray-800 rounded-2xl shadow-xl px-8 py-10 text-center"
            initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
            transition={{ duration: 0.5 }}
          >
            <Quote className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 italic mb-6">
              “{testimonial.text}”
            </p>
            <div className="flex flex-col items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-blue-600"
              />
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                {testimonial.name}
              </h3>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {testimonial.role}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Button */}
        <button
          onClick={next}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-400 text-black p-4 rounded-full shadow-lg z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-8">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-blue-400" : "bg-blue-100"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
