import { motion } from "framer-motion";
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  Target,
  MessageSquare,
  Award,
  BarChart3,
  Headphones,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ServicesPage = () => {
  const mainServices = [
    {
      icon: Brain,
      title: "AI-Powered Mock Interviews",
      description: "Experience realistic interview scenarios powered by advanced AI that adapts to your role and experience level.",
      features: [
        "Personalized question generation",
        "Role-specific scenarios",
        "Real-time difficulty adjustment",
        "Industry-standard questions"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      badge: "Most Popular"
    },
    {
      icon: MessageSquare,
      title: "Instant AI Feedback",
      description: "Get comprehensive, actionable feedback on every answer with detailed analysis and improvement suggestions.",
      features: [
        "Response quality analysis",
        "Communication assessment",
        "Technical accuracy check",
        "Improvement recommendations"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      badge: "Pro Feature"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your improvement journey with detailed analytics and performance metrics over time.",
      features: [
        "Performance history",
        "Skill progression tracking",
        "Strengths & weaknesses",
        "Personalized insights"
      ],
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      badge: "New"
    }
  ];

  const additionalServices = [
    {
      icon: Target,
      title: "Custom Tech Stack",
      description: "Prepare for interviews specific to your technology stack and domain expertise.",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere with unlimited access to our platform.",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data and interview sessions are completely confidential and encrypted.",
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description: "From freshers to senior positions, we cover all experience levels.",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback and ratings after completing your interview.",
      color: "text-pink-600 dark:text-pink-400"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Our support team is ready to help you with any questions or issues.",
      color: "text-indigo-600 dark:text-indigo-400"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 mock interviews per day",
        "Basic AI feedback",
        "Standard question library",
        "Email support"
      ],
      cta: "Get Started",
      popular: false,
      color: "border-gray-300 dark:border-gray-600"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious job seekers",
      features: [
        "Unlimited mock interviews",
        "Advanced AI feedback",
        "Premium question library",
        "Progress analytics",
        "Priority support",
        "Custom tech stacks"
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "border-blue-500 dark:border-blue-400"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-purple-500 dark:border-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Interview Preparation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to ace your next interview, powered by cutting-edge AI technology
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Main Services */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive tools to prepare you for success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
              >
                <Card className={`${service.bgColor} border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full group hover:-translate-y-2 relative overflow-hidden`}>
                  {service.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                        {service.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Services Grid */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Benefits
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              More reasons to choose Mock Master
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + 0.05 * index }}
              >
                <Card className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full group hover:-translate-y-1">
                  <CardContent className="p-6">
                    <service.icon className={`w-12 h-12 ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start free, upgrade when you're ready
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
              >
                <Card className={`border-2 ${plan.color} hover:shadow-2xl transition-all duration-300 h-full relative ${plan.popular ? 'ring-4 ring-blue-500/20 dark:ring-blue-400/20' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-5xl font-black text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                      } shadow-lg hover:shadow-xl transition-all duration-300`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-0 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10" />
            <CardContent className="p-12 text-center relative z-10">
              <Award className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of successful candidates who have improved their interview performance with Mock Master.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/generate'}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
