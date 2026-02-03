import { useState } from "react";
import { 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  FileText,
  Zap,
  Users,
  Code,
  Cloud,
  Cpu,
  Lock,
  Palette,
  Building,
  GraduationCap,
  Factory,
  Settings,
  ChevronRight,
  Download,
  PlayCircle,
  FileText as FileTextIcon,
  ExternalLink,
  Calendar,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
  MapPin,
  Globe,
  Database,
  Brain,
  LineChart,
  Target,
  PieChart,
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const FinancialServices = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const financialServices = [
    {
      id: 1,
      title: "Uncover Financial Intelligence",
      description: "Discover how our data education equips finance teams to interpret complex market trends, customer behaviors, and performance metrics.",
      icon: BarChart3,
      color: "from-blue-600 to-blue-700",
      action: "Download Case Study",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Optimize Risk with Data",
      description: "Learn how advanced analytics and machine learning models help predict and mitigate credit, market, and operational risks.",
      icon: ShieldCheck,
      color: "from-emerald-600 to-emerald-700",
      action: "Watch Demo",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Predictive Analytics for Investments",
      description: "Explore how predictive models transform raw historical data into actionable investment strategies and alpha-generating opportunities.",
      icon: TrendingUp,
      color: "from-purple-600 to-purple-700",
      action: "Access White Paper",
      image: "https://images.unsplash.com/photo-1642790553124-4c56d74c5a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Streamline Compliance with Insights",
      description: "See how data-driven monitoring systems detect anomalies, automate reporting, and ensure regulatory compliance across global markets.",
      icon: FileText,
      color: "from-amber-600 to-amber-700",
      action: "Request Demo",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Real-Time Trading Decisions",
      description: "Understand how high-velocity data pipelines and AI-powered signal detection accelerate trading decisions and reduce latency.",
      icon: Zap,
      color: "from-rose-600 to-rose-700",
      action: "View Dashboard",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 6,
      title: "Transform Wealth Management",
      description: "Master the tools and techniques that enable personalized portfolio recommendations and robo-advisor algorithms through data science.",
      icon: Users,
      color: "from-indigo-600 to-indigo-700",
      action: "Enroll in Workshop",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const techServices = [
    {
      title: "Custom Software Development",
      description: "Tailored solutions that address your specific business requirements.",
      icon: Code,
      color: "bg-blue-100",
      iconColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure to support your growth.",
      icon: Cloud,
      color: "bg-purple-100",
      iconColor: "text-purple-700",
      borderColor: "border-purple-200"
    },
    {
      title: "AI & Machine Learning",
      description: "Implementing intelligent systems that enhance decision-making and automation.",
      icon: Brain,
      color: "bg-green-100",
      iconColor: "text-green-700",
      borderColor: "border-green-200"
    },
    {
      title: "Cybersecurity",
      description: "Protecting your digital assets with robust security measures.",
      icon: Shield,
      color: "bg-red-100",
      iconColor: "text-red-700",
      borderColor: "border-red-200"
    },
    {
      title: "UX/UI Design",
      description: "Creating user-centric designs that ensure a seamless and engaging experience.",
      icon: Palette,
      color: "bg-pink-100",
      iconColor: "text-pink-700",
      borderColor: "border-pink-200"
    }
  ];

  const industries = [
    { 
      name: "Healthcare", 
      icon: "🏥", 
      description: "Developing solutions that improve patient care and streamline operations",
      color: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    { 
      name: "Finance", 
      icon: "💰", 
      description: "Building secure and efficient platforms for financial services",
      color: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    { 
      name: "Retail", 
      icon: "🛍️", 
      description: "Enhancing customer experiences through personalized digital solutions",
      color: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    { 
      name: "Education", 
      icon: "🎓", 
      description: "Creating interactive and accessible learning platforms",
      color: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    { 
      name: "Manufacturing", 
      icon: "🏭", 
      description: "Implementing systems that optimize production and supply chain management",
      color: "bg-rose-50",
      borderColor: "border-rose-200"
    }
  ];

  const approachSteps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We begin by immersing ourselves in your business, understanding your goals, challenges, and the landscape you operate in.",
      icon: Target
    },
    {
      number: "02",
      title: "Design & Development",
      description: "Our team of experts leverages cutting-edge technologies and design principles to create intuitive, scalable, and secure digital solutions.",
      icon: Code
    },
    {
      number: "03",
      title: "Deployment & Optimization",
      description: "Launching your solution is just the beginning. We monitor performance, gather user feedback, and continuously optimize.",
      icon: Cloud
    }
  ];

  const benefits = [
    { title: "47% Average ROI Increase", icon: TrendingUp, color: "text-green-600" },
    { title: "62% Faster Decision Making", icon: Zap, color: "text-blue-600" },
    { title: "99.8% Risk Detection", icon: ShieldCheck, color: "text-emerald-600" },
    { title: "150+ Successful Projects", icon: CheckCircle, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-blue-200 font-medium">Financial Services in the Data Sector</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Finance Reinvented
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Through Data Skills
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Master the tools and technologies shaping modern finance — from data analytics and AI 
              to machine learning and blockchain — and drive smarter decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group">
                <PlayCircle className="w-5 h-5" />
                Watch Overview Video
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Benefits Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-white/20 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{benefit.title.split(' ')[0]}</div>
                    <div className="text-blue-200 text-sm mt-1">{benefit.title.split(' ').slice(1).join(' ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
            <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl text-gray-800 font-medium leading-relaxed">
              Explore the power of data in finance — from predictive analytics and risk management 
              to smarter investments and strategy
            </p>
          </div>
        </div>
      </section>

      {/* Financial Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Financial Data Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how data-driven approaches are transforming every aspect of modern finance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financialServices.map((service) => (
              <div 
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-10`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full">
                      Step {service.id}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button className="w-full py-3.5 bg-gray-50 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2 border border-gray-200 group/btn">
                    {service.action}
                    {service.action.includes("Download") ? <Download className="w-4 h-4" /> : 
                     service.action.includes("Watch") ? <PlayCircle className="w-4 h-4" /> : 
                     service.action.includes("Access") ? <FileTextIcon className="w-4 h-4" /> : 
                     <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Practical Case Studies & Real-World Applications
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Explore how our learners leverage data analytics, AI/ML, and NLP to tackle real-world 
                financial scenarios — from risk prediction and fraud detection to portfolio optimization.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Portfolio Optimization</p>
                    <p className="text-blue-200 text-sm">Machine learning models that increased returns by 47%</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Fraud Detection Systems</p>
                    <p className="text-blue-200 text-sm">AI-powered detection with 99.8% accuracy rate</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Risk Management</p>
                    <p className="text-blue-200 text-sm">Predictive models reducing operational risk by 62%</p>
                  </div>
                </div>
              </div>
              
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
                <PlayCircle className="w-5 h-5" />
                Watch Student Project Showcase
              </button>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Data Analytics Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Performance Improvement</p>
                    <p className="text-2xl font-bold text-white">+47% ROI</p>
                    <p className="text-xs text-blue-200">Across 150+ projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Transforming Ideas into Digital Realities
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At DataSphere, we craft digital experiences that drive innovation, efficiency, and growth. 
              Our approach is rooted in understanding your unique challenges.
            </p>
          </div>

          {/* Our Approach */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">
              Our Approach: From Concept to Execution
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {approachSteps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl font-bold text-gray-300">{step.number}</div>
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ChevronRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Our Expertise */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">Our Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {techServices.map((service, index) => (
                <div 
                  key={index}
                  className={`${service.color} ${service.borderColor} rounded-xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group`}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-white ${service.borderColor} border mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries We Serve */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">Industries We Serve</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {industries.map((industry, index) => (
                <div 
                  key={index}
                  className={`${industry.color} ${industry.borderColor} rounded-xl border p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="text-4xl mb-3">{industry.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{industry.name}</h4>
                  <p className="text-gray-600 text-sm">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-10 text-center">Why Choose DataSphere</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Innovative Solutions", 
                  desc: "We stay ahead of technological trends to deliver cutting-edge solutions", 
                  icon: Zap 
                },
                { 
                  title: "Collaborative Approach", 
                  desc: "Your input is integral at every stage of the project", 
                  icon: Users 
                },
                { 
                  title: "Proven Track Record", 
                  desc: "A history of successful projects across various industries", 
                  icon: ShieldCheck 
                },
                { 
                  title: "Customer-Centric", 
                  desc: "We prioritize your needs and goals to ensure satisfaction", 
                  icon: Settings 
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                  <p className="text-blue-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-3xl p-12 border border-blue-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Build the Future Together
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your business with innovative technology solutions?
              Contact us today to start the conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group">
                <Calendar className="w-5 h-5" />
                Schedule a Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-transparent text-white border-2 border-white/40 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                <FileText className="w-5 h-5" />
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">DataSphere</div>
                  <div className="text-blue-300 text-sm">Financial & Tech Analytics</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Crafting digital experiences that drive innovation, efficiency, and growth.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Information</h4>
              <div className="space-y-3">
                <a href="mailto:contact@datasphere.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@datasphere.com</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">123 Tech Street, San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Financial Analytics', 'Custom Software', 'Cloud Solutions', 'AI/ML Implementation', 'Case Studies'].map((link, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex space-x-3">
                <button className="w-12 h-12 rounded-xl bg-blue-900/50 hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-xl bg-blue-900/50 hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-xl bg-blue-900/50 hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 DataSphere. All rights reserved. | 
              <a href="#" className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">Privacy Policy</a> | 
              <a href="#" className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinancialServices;