import React from "react";
import {
  FaStethoscope,
  FaChartLine,
  FaUserMd,
  FaHospital,
  FaHeartbeat,
  FaBrain,
  FaDatabase,
  FaCloud,
  FaMicrochip,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const HealthcareAI = () => {
  const sections = [
    {
      title: "Accurate Diagnosis",
      text: "AI analyzes medical images, lab results, and patient history to detect diseases early and reduce human error, supporting faster and more accurate decisions.",
      img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1000&q=80",
      icon: <FaStethoscope />,
      benefits: [
        "Early disease detection",
        "Reduced diagnostic errors",
        "Faster decision making",
        "Improved patient outcomes",
      ],
    },
    {
      title: "Predictive Healthcare",
      text: "Data-driven insights help predict risks like heart disease or diabetes before they become critical, enabling preventive interventions and proactive care.",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1000&q=80",
      icon: <FaChartLine />,
      benefits: [
        "Risk prediction models",
        "Preventive interventions",
        "Early warning systems",
        "Population health management",
      ],
    },
    {
      title: "Personalized Treatment",
      text: "AI tailors treatment plans for each patient using genetics, medical history, and lifestyle data to create personalized, precision healthcare solutions.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1000&q=80",
      icon: <FaUserMd />,
      benefits: [
        "Genomic analysis",
        "Custom treatment plans",
        "Precision medicine",
        "Lifestyle-based recommendations",
      ],
    },
    {
      title: "Efficient Hospital Management",
      text: "AI and data optimize hospital operations — from patient scheduling and resource allocation to supply chain and administrative efficiency.",
      img: "https://images.unsplash.com/photo-1516549655669-df6654e44780?auto=format&fit=crop&w=1000&q=80",
      icon: <FaHospital />,
      benefits: [
        "Optimized scheduling",
        "Resource management",
        "Supply chain automation",
        "Cost reduction",
      ],
    },
    {
      title: "Remote Monitoring & IoT",
      text: "Wearable devices continuously track vitals and send real-time data to healthcare providers, enabling remote monitoring and early intervention.",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
      icon: <FaHeartbeat />,
      benefits: [
        "Continuous monitoring",
        "Real-time alerts",
        "Remote patient care",
        "Early intervention",
      ],
    },
  ];

  const techs = [
    {
      title: "AI & Machine Learning",
      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80",
      desc: "Machine learning systems enhance diagnostic accuracy, automate workflows, and predict patient outcomes, empowering data-driven medicine.",
      icon: <FaBrain />,
      applications: [
        "Diagnostic algorithms",
        "Predictive analytics",
        "Clinical decision support",
        "Drug discovery",
      ],
    },
    {
      title: "Big Data & Analytics",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      desc: "Big Data transforms vast healthcare information into meaningful insights, improving decision-making and predictive care models.",
      icon: <FaDatabase />,
      applications: [
        "Data integration",
        "Pattern recognition",
        "Trend analysis",
        "Performance metrics",
      ],
    },
    {
      title: "Cloud Computing",
      img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1000&q=80",
      desc: "Secure and scalable cloud platforms ensure accessible, collaborative healthcare solutions that connect doctors and patients globally.",
      icon: <FaCloud />,
      applications: [
        "Secure data storage",
        "Global collaboration",
        "Scalable infrastructure",
        "Telemedicine platforms",
      ],
    },
    {
      title: "IoT & Wearables",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
      desc: "Connected medical devices provide real-time health insights, fostering early detection and proactive wellness management.",
      icon: <FaMicrochip />,
      applications: [
        "Wearable sensors",
        "Remote monitoring",
        "Real-time alerts",
        "Health tracking",
      ],
    },
    {
      title: "Robotics & Automation",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80",
      desc: "Robotics and automation streamline surgeries, lab testing, and administration — improving accuracy and reducing workload.",
      icon: <FaRobot />,
      applications: [
        "Surgical robots",
        "Lab automation",
        "Pharmacy dispensing",
        "Patient assistance",
      ],
    },
  ];

  const stats = [
    { value: "40%", label: "Reduction in diagnostic errors" },
    { value: "30%", label: "Decrease in hospital readmissions" },
    { value: "50%", label: "Faster drug discovery process" },
    { value: "25%", label: "Improvement in treatment outcomes" },
  ];

  return (
    <div className="font-sans bg-linear-to-b from-white via-blue-50 to-white text-gray-800">
      {/* HERO */}
      <section
        className="relative flex items-center justify-center text-center text-white px-6 py-32"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,40,100,0.8), rgba(0,40,100,0.9)), url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-blue-200 text-sm font-medium">
              HEALTHCARE INNOVATION
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transforming Healthcare with AI & Data Analytics
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Revolutionizing diagnosis, treatment, and patient care through
            intelligent systems and data-driven insights.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              Explore Solutions <FaArrowRight />
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 text-center bg-linear-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            The Future of Healthcare is Intelligent
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            Artificial Intelligence and Data Analytics are revolutionizing
            healthcare by enabling smarter diagnostics, personalized treatments,
            and efficient hospital operations. Discover how technology is
            creating better patient outcomes worldwide.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="text-blue-600 text-2xl mb-4">🏥</div>
              <h3 className="font-semibold text-lg mb-2">
                Clinical Excellence
              </h3>
              <p className="text-gray-600 text-sm">
                Enhanced accuracy in diagnosis and treatment planning
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="text-blue-600 text-2xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-2">
                Operational Efficiency
              </h3>
              <p className="text-gray-600 text-sm">
                Streamlined processes and optimized resource allocation
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="text-blue-600 text-2xl mb-4">🤝</div>
              <h3 className="font-semibold text-lg mb-2">
                Patient-Centric Care
              </h3>
              <p className="text-gray-600 text-sm">
                Personalized treatment plans and improved patient experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Key Applications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore how AI and data are transforming different aspects of
              healthcare delivery
            </p>
          </div>

          {sections.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col lg:flex-row items-center mb-20 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2 p-6">
                <div className="relative">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="rounded-2xl shadow-lg w-full h-80 object-cover"
                  />
                  <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-4 rounded-xl">
                    {s.icon}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-6">
                <h3 className="text-3xl font-bold text-blue-900 mb-4">
                  {s.title}
                </h3>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {s.text}
                </p>
                <div className="space-y-3">
                  {s.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="py-20 bg-linear-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Core Technologies
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Discover the technological foundations driving healthcare
              innovation forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techs.map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    {t.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t.title}
                  </h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">{t.desc}</p>
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-medium mb-3">
                      Key Applications:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {t.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="bg-white/10 text-blue-100 text-sm px-3 py-1 rounded-full"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-linear-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of healthcare professionals who are leveraging AI
              and data to improve patient outcomes and streamline operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Schedule a Demo <FaArrowRight />
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
                Download Whitepaper
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              Free consultation • No commitment • Expert guidance
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-blue-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                Healthcare AI
              </h3>
              <p className="text-blue-300">
                Transforming medicine through technology
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-300 mb-2">
                © {new Date().getFullYear()} Healthcare AI Solutions
              </p>
              <p className="text-blue-400 text-sm">
                All images sourced from Unsplash • Icons from React Icons
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthcareAI;
