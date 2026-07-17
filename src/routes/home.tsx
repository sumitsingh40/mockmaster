import { Counter } from "@/components/counter";
import Testimonials from "@/components/testimonial";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  BarChart2, 
  FileText, 
  Handshake, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2,
  Play,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  X
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const features = [
	{
		icon: <UserCheck className="w-8 h-8 text-blue-600" />,
		title: "Simulate Real Interviews",
		desc: "Practice coding, system design, and behavioral rounds with professionals.",
		gradient: "from-blue-500 to-blue-600"
	},
	{
		icon: <BarChart2 className="w-8 h-8 text-emerald-600" />,
		title: "Career Advice & Growth",
		desc: "Receive guidance from industry leaders on career advancement and offer negotiation.",
		gradient: "from-emerald-500 to-emerald-600"
	},
	{
		icon: <FileText className="w-8 h-8 text-violet-600" />,
		title: "Resume Feedback",
		desc: "Stand out by getting actionable feedback on your resume.",
		gradient: "from-violet-500 to-violet-600"
	},
	{
		icon: <Handshake className="w-8 h-8 text-yellow-500" />,
		title: "Mentorship & Negotiation",
		desc: "Get mentorship for your dream role and maximize your compensation.",
		gradient: "from-yellow-500 to-yellow-600"
	},
];

const techLogos = [
	{ src: "/assets/img/logo/tailwindcss.png", alt: "Tailwind" },
	{ src: "/assets/img/logo/firebase.png", alt: "Firebase" },
	{ src: "/assets/img/logo/meet.png", alt: "Google Meet" },
	{ src: "/assets/img/logo/zoom.png", alt: "Zoom" },
	{ src: "/assets/img/logo/microsoft.png", alt: "Microsoft" },
];

const HomePage = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Video Modal Component
  const VideoModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowVideoModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Mock Master Works
          </h3>
		  <button
			onClick={() => setShowVideoModal(false)}
			className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
			aria-label="Close video modal"
		  >
			<X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
		  </button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/_xvVx-5UTIc?autoplay=1&rel=0"
            title="Mock Master Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 dark:bg-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Step 1: Choose Role</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Select your target position</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Step 2: Practice</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Answer AI-generated questions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Step 3: Get Feedback</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Receive instant AI analysis</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
	<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
		
		{/* HERO SECTION - Enhanced */}
		<header className="relative overflow-hidden">
			{/* Animated Background Effects */}
			<div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
			<div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full -z-10" />
			<div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full -z-10" />

			<div className="max-w-7xl mx-auto pt-20 pb-16 px-6 flex flex-col md:flex-row-reverse items-center gap-16">
				{/* Right Side: Animated Image */}
				<div className="flex justify-center md:w-1/2 w-full">
					<motion.div
						className="relative w-full max-w-md md:max-w-lg lg:max-w-md"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						<motion.div
							className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-30 blur-3xl"
							animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
							transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
						/>
						<motion.img
  src="/assets/img/girl.png"
  alt="Mock Interview Illustration"
  className="relative w-full h-auto object-contain z-10 drop-shadow-2xl"
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  whileHover={{ scale: 1.05 }}
/>
					</motion.div>
				</div>

				{/* Left Side: Enhanced Text Content */}
				<motion.div
					className="flex flex-col items-start justify-center md:w-1/2 w-full md:pl-12 text-left space-y-6"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1 }}
				>
					{/* Badge */}
					<motion.div 
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
						<span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI-Powered Interview Preparation</span>
					</motion.div>

					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
						Simulate real interviews{" "}
						<span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
							with top engineers.
						</span>
					</h1>

					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
						Coding, System Design, Behavioral, Career Growth, Resume Feedback, and
						Negotiation — everything you need to land your dream job.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<Link to="/generate">
							<motion.button 
								className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Start Your Mock Interview
								<ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</motion.button>
						</Link>
						
						<motion.button 
							onClick={() => setShowVideoModal(true)}
							className="group px-8 py-4 text-lg font-semibold border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 text-gray-900 dark:text-white flex items-center gap-2"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
							Watch Demo
						</motion.button>
					</div>

					{/* Quick Stats */}
					<div className="flex flex-wrap gap-8 pt-4">
						{[
							{ number: "10K+", label: "Mock Interviews" },
							{ number: "95%", label: "Success Rate" },
							{ number: "500+", label: "Companies" }
						].map((stat, index) => (
							<motion.div 
								key={index} 
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 + index * 0.1 }}
							>
								<div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
									{stat.number}
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</header>

		{/* STEPS SECTION - Enhanced */}
		<section className="w-full py-20 bg-white dark:bg-gray-900">
			<div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-900 to-indigo-900 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
						Unlock Your Interview Success in 3 Steps!
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Simple, effective, and proven process to ace your interviews
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative">
					{/* Connection Lines - Fixed */}
					<div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -z-10">
        <div className="absolute left-[16.66%] w-[16.66%] h-full bg-gradient-to-r from-blue-300 to-blue-400 dark:from-blue-700 dark:to-blue-600" />
        <div className="absolute left-[50%] w-[16.66%] h-full bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600" />
    </div>

    {[
        {
            num: "1",
            title: "Choose a Role or Job Detail",
            desc: "AI will generate potential interview questions based on the role you choose. Select your target role for the best results.",
            icon: <Target className="w-6 h-6" />
        },
        {
            num: "2",
            title: "Start Your Mock Interview",
            desc: "After your questions are generated, start your mock interview to experience a realistic video-based session.",
            icon: <Zap className="w-6 h-6" />
        },
        {
            num: "3",
            title: "Get AI-Based Feedback",
            desc: "See your score, video and feedback once your mock interview is complete. Now you're ready for the real one!",
            icon: <TrendingUp className="w-6 h-6" />
        },
    ].map((step, i) => (
        <motion.div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center border-t-4 border-blue-600 dark:border-blue-500 relative group hover:-translate-y-2 transition-all duration-300 z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
        >
            {/* Number Badge */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20">
                <span className="text-3xl font-bold text-white">
                    {step.num}
                </span>
            </div>
            
            {/* Icon */}
            <div className="mt-8 mb-4 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {step.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {step.desc}
            </p>
        </motion.div>
    ))}
</div>

				<Link to="/generate" className="mt-16">
					<motion.button 
						className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Let's Get Started
						<ArrowRight className="inline-block ml-2 w-5 h-5" />
					</motion.button>
				</Link>
			</div>
		</section>

		{/* STATISTICS SECTION */}
		<section className="py-20 w-full bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Proven success for our candidates
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Our candidates achieve real results—higher confidence, better
						performance, and job offers from top tech companies.
					</p>
				</motion.div>

				<div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-10">
					<motion.div
						className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0 }}
						viewport={{ once: true }}
					>
						<div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
							<Counter to={8000} suffix="+" decimals={0} />
						</div>
						<div className="text-base text-gray-600 dark:text-gray-400 text-center max-w-xs">
							sessions conducted
						</div>
					</motion.div>

					<motion.div
						className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-2">
							<Counter to={85} suffix="%" decimals={0} />
						</div>
						<div className="text-base text-gray-600 dark:text-gray-400 text-center max-w-xs">
							of users land job offers at top tech firms
						</div>
					</motion.div>

					<motion.div
						className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
					>
						<div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent mb-2">
							<Counter to={4.96} suffix="/5" decimals={2} />
						</div>
						<div className="text-base text-gray-600 dark:text-gray-400 text-center max-w-xs">
							average mentor rating
						</div>
					</motion.div>
				</div>
			</div>
		</section>

		{/* FEATURES SECTION - Enhanced */}
		<section className="max-w-6xl mx-auto py-20 px-4">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
					Everything You Need to Succeed
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					Comprehensive tools and guidance for every step of your interview journey
				</p>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{features.map((item, i) => (
										<motion.div
											key={i}
											className="group flex items-start gap-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 border-l-4 hover:-translate-y-1 transition-all duration-300"
											style={{
												borderLeftColor:
													i === 0
														? "#2563eb"
														: i === 1
														? "#059669"
														: i === 2
														? "#7c3aed"
														: "#eab308",
											}}
											initial={{ opacity: 0, x: -40 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.7, delay: i * 0.15 }}
											viewport={{ once: true }}
										>
											<div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-10 group-hover:scale-110 transition-transform`}>
												{item.icon}
											</div>
											<div className="flex-1">
												<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
													{item.title}
												</h3>
												<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
													{item.desc}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</section>
					
							{/* TECH LOGOS SECTION */}
							<section className="py-16 bg-white dark:bg-gray-900">
								<div className="max-w-6xl mx-auto px-4">
									<h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-8">
										Trusted by professionals from
									</h3>
									<Marquee gradient={false} speed={50}>
										{techLogos.map((logo, i) => (
											<img
												key={i}
												src={logo.src}
												alt={logo.alt}
												className="h-12 mx-8 opacity-60 hover:opacity-100 transition-opacity"
											/>
										))}
									</Marquee>
								</div>
							</section>
					
								{/* TESTIMONIALS SECTION */}
								<Testimonials />
							
							{/* BEGINNER'S GUIDE SECTION - NEW */}
							<section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
  <div className="max-w-7xl mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
        New to Mock Interviews?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Don't worry! Here's everything you need to know to get started
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: "🎯",
          title: "What is a Mock Interview?",
          description: "A practice session that simulates real job interviews to help you prepare and build confidence.",
          color: "from-blue-500 to-blue-600"
        },
        {
          icon: "🤖",
          title: "How Does AI Help?",
          description: "Our AI generates personalized questions based on your role and provides instant, detailed feedback.",
          color: "from-purple-500 to-purple-600"
        },
        {
          icon: "📊",
          title: "What Will I Get?",
          description: "5 tailored questions, video recording of your responses, performance ratings, and improvement tips.",
          color: "from-emerald-500 to-emerald-600"
        },
        {
          icon: "⏱️",
          title: "How Long Does It Take?",
          description: "About 15-20 minutes for a complete session. You can pause and resume anytime!",
          color: "from-orange-500 to-orange-600"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-2"
        >
          <div className={`text-4xl mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>

    {/* Quick Start Tips */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">Quick Start Tips for Beginners</h3>
          <ul className="space-y-3">
            {[
              "Choose a quiet space with good lighting and internet connection",
              "Prepare your resume and have it ready for reference",
              "Dress professionally as you would for a real interview",
              "Speak clearly and take your time to think before answering",
              "Review your feedback and practice weak areas"
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span className="text-blue-50">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => setShowVideoModal(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Watch Tutorial
          </button>
		</div>
	  </div>
	</motion.div>
  </div>
</section>

	  {/* Video Modal */}
	  {showVideoModal && <VideoModal />}
	</div>
  );
};

export default HomePage;