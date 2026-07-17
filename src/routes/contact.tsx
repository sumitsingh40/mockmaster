import { Mail, MessageSquare, Users, Star, Send, MapPin, Phone, Clock, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false); // Add this state

  const PUBLIC_KEY = 'wj_jgb2TlPkr2lMr4';
  const SERVICE_ID = 'service_mm';
  const TEMPLATE_ID = 'template_81mdgz9';

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Attempting to send email with:', {
      serviceId: SERVICE_ID,
      templateId: TEMPLATE_ID,
      publicKey: PUBLIC_KEY,
      formData
    });

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'sumitsingh1138@gmail.com', // Recipient email
        },
        PUBLIC_KEY
      );

      console.log('EmailJS success:', result);

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS Error Details:", {
        error,
        message: error?.text || error?.message,
        status: error?.status,
        fullError: JSON.stringify(error)
      });
      
      let errorMessage = "Please try again later.";
      
      if (error?.text) {
        errorMessage = error.text;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error("Failed to send message", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Our team is here to help",
      value: "sumitsingh1138@gmail.com",
      href: "mailto:sumitsingh1138@gmail.com",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: " +91 9264964023",
      href: "tel:+919264964023",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello",
      value: "Prayagraj Uttar Pradesh, India",
      href: "#",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "Response time",
      value: "24/7 Support Available",
      href: "#",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  const departments = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about our platform, services, or features",
      email: "support@aimockinterview.com",
      color: "border-blue-500",
    },
    {
      icon: Users,
      title: "Business & Partnerships",
      description: "Collaborate, partner, or explore custom solutions",
      email: "sumitsingh1138@gmail.com",
      color: "border-emerald-500",
    },
    {
      icon: Star,
      title: "Feedback & Suggestions",
      description: "Share your thoughts and help us improve",
      email: "feedback@aimockinterview.com",
      color: "border-purple-500",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600 dark:hover:text-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500 dark:hover:text-sky-400" },
  ];

  const faqs = [
    {
      question: "How does Mock Master work?",
      answer: "Simply create an account, select your desired job role and experience level, and our AI will generate 5 personalized interview questions. Answer them and receive instant feedback with detailed ratings."
    },
    {
      question: "Is it really free?",
      answer: "Yes! We offer a free plan with 5 mock interviews per month. For unlimited access and advanced features, you can upgrade to our Pro plan."
    },
    {
      question: "What technologies do you support?",
      answer: "We support all major tech stacks including JavaScript, Python, Java, React, Node.js, and many more. You can specify your exact tech stack when creating an interview."
    },
    {
      question: "How accurate is the AI feedback?",
      answer: "Our AI is trained on thousands of real interview scenarios and provides highly accurate feedback. However, we recommend using it as a practice tool alongside other preparation methods."
    },
    {
      question: "Can I retake the same interview?",
      answer: "Yes! You can retake any interview as many times as you want to practice and improve your responses."
    },
    {
      question: "Do you store my interview responses?",
      answer: "Yes, we securely store your responses so you can review them later and track your progress over time. All data is encrypted and kept private."
    },
    {
      question: "What experience levels do you cover?",
      answer: "We cover all experience levels from 0 years (freshers) to 10+ years (senior positions). Questions are tailored to your specific experience level."
    },
    {
      question: "How long does an interview take?",
      answer: "A typical mock interview with 5 questions takes about 15-20 minutes to complete, depending on the depth of your responses."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white">
            Get in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className={`${method.bgColor} border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{method.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {method.href !== "#" ? (
                    <a href={method.href} className={`${method.iconColor} hover:underline font-medium text-sm`}>
                      {method.value}
                    </a>
                  ) : (
                    <p className={`${method.iconColor} font-medium text-sm`}>{method.value}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content: Form + Departments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-2">
                  <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Departments Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Departments</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Direct contact for specific inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${dept.color} bg-gray-50 dark:bg-slate-900 hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <dept.icon className="w-5 h-5 text-gray-700 dark:text-gray-300 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {dept.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {dept.description}
                        </p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block mt-1"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 border-0 shadow-xl text-white">
              <CardHeader>
                <CardTitle className="text-xl">Connect With Us</CardTitle>
                <CardDescription className="text-blue-100">
                  Follow us on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 shadow-xl text-center">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Looking for Quick Answers?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Check out our FAQ section for instant answers to common questions
              </p>
              <Button
                variant="outline"
                onClick={() => setShowFAQ(!showFAQ)}
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400"
              >
                {showFAQ ? 'Hide FAQ' : 'View FAQ'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section - Only shows when showFAQ is true */}
        {showFAQ && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                >
                  <Card className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900 dark:text-white flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">Q:</span>
                        <span>{faq.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">A:</span>
                        <span>{faq.answer}</span>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
