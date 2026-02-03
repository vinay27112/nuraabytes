import { useEffect, useRef, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Cloud,
  GitBranch,
  Cpu,
  Play,
  Pause,
  Table2,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Sparkles,
  MessageSquare,
  Image,
  Repeat,
  Server,
  Terminal,
  Snowflake,
  BrainCircuit,
  Bot,
  Box,
  Sigma,
  Warehouse,
  Zap,
  Target,
  Layers,
} from "lucide-react";
import gsap from "gsap";

const skills = [
  {
    icon: <Database size={32} />,
    name: "SQL",
    color: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-300",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    glow: "from-blue-400/40 to-blue-600/40",
    description: "Advanced query optimization & database management",
  },
  {
    icon: <Table2 size={32} />,
    name: "Excel",
    color: "text-emerald-600",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    border: "border-emerald-300",
    gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
    glow: "from-emerald-400/40 to-emerald-600/40",
    description: "Complex data analysis & automation",
  },
  {
    icon: <Code2 size={32} />,
    name: "Python",
    color: "text-amber-600",
    bg: "bg-gradient-to-br from-amber-50 to-amber-100",
    border: "border-amber-300",
    gradient: "from-amber-500 via-amber-600 to-orange-600",
    glow: "from-amber-400/40 to-orange-500/40",
    description: "Data science, ML & automation scripting",
  },
  {
    icon: <BarChart3 size={32} />,
    name: "Power BI",
    color: "text-orange-600",
    bg: "bg-gradient-to-br from-orange-50 to-orange-100",
    border: "border-orange-300",
    gradient: "from-orange-500 via-orange-600 to-red-600",
    glow: "from-orange-400/40 to-red-500/40",
    description: "Interactive dashboards & business intelligence",
  },
  {
    icon: <PieChart size={32} />,
    name: "Tableau",
    color: "text-purple-600",
    bg: "bg-gradient-to-br from-purple-50 to-purple-100",
    border: "border-purple-300",
    gradient: "from-purple-500 via-purple-600 to-violet-700",
    glow: "from-purple-400/40 to-violet-600/40",
    description: "Data visualization & storytelling",
  },
  {
    icon: <LineChart size={32} />,
    name: "Statistics",
    color: "text-cyan-600",
    bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    border: "border-cyan-300",
    gradient: "from-cyan-500 via-cyan-600 to-sky-700",
    glow: "from-cyan-400/40 to-sky-600/40",
    description: "Statistical modeling & hypothesis testing",
  },
  {
    icon: <Cpu size={32} />,
    name: "AI",
    color: "text-indigo-600",
    bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    border: "border-indigo-300",
    gradient: "from-indigo-500 via-indigo-600 to-blue-700",
    glow: "from-indigo-400/40 to-blue-600/40",
    description: "Artificial Intelligence systems & frameworks",
  },
  {
    icon: <Brain size={32} />,
    name: "Machine Learning",
    color: "text-emerald-600",
    bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    border: "border-emerald-300",
    gradient: "from-emerald-500 via-teal-600 to-emerald-700",
    glow: "from-emerald-400/40 to-teal-600/40",
    description: "Predictive models & ML algorithms",
  },
  {
    icon: <Sparkles size={32} />,
    name: "Generative AI",
    color: "text-pink-600",
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    border: "border-pink-300",
    gradient: "from-pink-500 via-rose-600 to-pink-700",
    glow: "from-pink-400/40 to-rose-600/40",
    description: "LLMs, GPT & creative AI applications",
  },
  {
    icon: <MessageSquare size={32} />,
    name: "NLP",
    color: "text-violet-600",
    bg: "bg-gradient-to-br from-violet-50 to-violet-100",
    border: "border-violet-300",
    gradient: "from-violet-500 via-violet-600 to-purple-700",
    glow: "from-violet-400/40 to-purple-600/40",
    description: "Natural Language Processing",
  },
  {
    icon: <Image size={32} />,
    name: "Computer Vision",
    color: "text-rose-600",
    bg: "bg-gradient-to-br from-rose-50 to-red-100",
    border: "border-rose-300",
    gradient: "from-rose-500 via-rose-600 to-red-700",
    glow: "from-rose-400/40 to-red-600/40",
    description: "Image recognition & video analysis",
  },
  {
    icon: <Cloud size={32} />,
    name: "AWS",
    color: "text-orange-600",
    bg: "bg-gradient-to-br from-orange-50 to-amber-100",
    border: "border-orange-300",
    gradient: "from-orange-500 via-amber-600 to-orange-700",
    glow: "from-orange-400/40 to-amber-600/40",
    description: "Cloud infrastructure & services",
  },
  {
    icon: <Cloud size={32} />,
    name: "GCP",
    color: "text-red-600",
    bg: "bg-gradient-to-br from-red-50 to-pink-100",
    border: "border-red-300",
    gradient: "from-red-500 via-red-600 to-pink-700",
    glow: "from-red-400/40 to-pink-600/40",
    description: "Google Cloud Platform services",
  },
  {
    icon: <Cloud size={32} />,
    name: "Azure",
    color: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-50 to-cyan-100",
    border: "border-blue-300",
    gradient: "from-blue-500 via-cyan-600 to-blue-700",
    glow: "from-blue-400/40 to-cyan-600/40",
    description: "Microsoft Azure cloud solutions",
  },
  {
    icon: <GitBranch size={32} />,
    name: "Data Pipelines",
    color: "text-teal-600",
    bg: "bg-gradient-to-br from-teal-50 to-emerald-100",
    border: "border-teal-300",
    gradient: "from-teal-500 via-teal-600 to-emerald-700",
    glow: "from-teal-400/40 to-emerald-600/40",
    description: "ETL/ELT pipeline design & automation",
  },
  {
    icon: <Repeat size={32} />,
    name: "ELT",
    color: "text-yellow-600",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-100",
    border: "border-yellow-300",
    gradient: "from-yellow-500 via-amber-600 to-yellow-700",
    glow: "from-yellow-400/40 to-amber-600/40",
    description: "Extract, Load, Transform processes",
  },
  {
    icon: <Server size={32} />,
    name: "Big Data",
    color: "text-fuchsia-600",
    bg: "bg-gradient-to-br from-fuchsia-50 to-purple-100",
    border: "border-fuchsia-300",
    gradient: "from-fuchsia-500 via-fuchsia-600 to-purple-700",
    glow: "from-fuchsia-400/40 to-purple-600/40",
    description: "Hadoop, Spark & large-scale processing",
  },
  {
    icon: <Terminal size={32} />,
    name: "Linux",
    color: "text-gray-700",
    bg: "bg-gradient-to-br from-gray-50 to-gray-100",
    border: "border-gray-300",
    gradient: "from-gray-500 via-gray-600 to-gray-700",
    glow: "from-gray-400/40 to-gray-600/40",
    description: "System administration & scripting",
  },
  {
    icon: <Snowflake size={32} />,
    name: "Snowflake",
    color: "text-sky-600",
    bg: "bg-gradient-to-br from-sky-50 to-blue-100",
    border: "border-sky-300",
    gradient: "from-sky-500 via-sky-600 to-blue-700",
    glow: "from-sky-400/40 to-blue-600/40",
    description: "Cloud data warehouse platform",
  },
  {
    icon: <BrainCircuit size={32} />,
    name: "Deep Learning",
    color: "text-purple-600",
    bg: "bg-gradient-to-br from-purple-50 to-indigo-100",
    border: "border-purple-300",
    gradient: "from-purple-500 via-indigo-600 to-purple-700",
    glow: "from-purple-400/40 to-indigo-600/40",
    description: "Neural networks & TensorFlow/PyTorch",
  },
  {
    icon: <Bot size={32} />,
    name: "ChatGPT",
    color: "text-green-600",
    bg: "bg-gradient-to-br from-green-50 to-emerald-100",
    border: "border-green-300",
    gradient: "from-green-500 via-green-600 to-emerald-700",
    glow: "from-green-400/40 to-emerald-600/40",
    description: "OpenAI API integration & fine-tuning",
  },
  {
    icon: <Box size={32} />,
    name: "Docker",
    color: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-50 to-cyan-100",
    border: "border-blue-300",
    gradient: "from-blue-500 via-cyan-600 to-blue-700",
    glow: "from-blue-400/40 to-cyan-600/40",
    description: "Containerization & deployment",
  },
  {
    icon: <Database size={32} />,
    name: "Databricks",
    color: "text-orange-600",
    bg: "bg-gradient-to-br from-orange-50 to-red-100",
    border: "border-orange-300",
    gradient: "from-orange-500 via-red-600 to-orange-700",
    glow: "from-orange-400/40 to-red-600/40",
    description: "Unified data analytics platform",
  },
  {
    icon: <Sigma size={32} />,
    name: "R Programming",
    color: "text-cyan-600",
    bg: "bg-gradient-to-br from-cyan-50 to-sky-100",
    border: "border-cyan-300",
    gradient: "from-cyan-500 via-cyan-600 to-sky-700",
    glow: "from-cyan-400/40 to-sky-600/40",
    description: "Statistical computing & graphics",
  },
  {
    icon: <Warehouse size={32} />,
    name: "Data Warehouse",
    color: "text-lime-600",
    bg: "bg-gradient-to-br from-lime-50 to-green-100",
    border: "border-lime-300",
    gradient: "from-lime-500 via-lime-600 to-green-700",
    glow: "from-lime-400/40 to-green-600/40",
    description: "Data architecture & warehousing",
  },
];

export default function SkillBelt() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSkills, setActiveSkills] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  const containerRef = useRef(null);
  const beltRef = useRef(null);
  const skillRefs = useRef([]);
  const autoScrollTween = useRef(null);
  const gradientRef = useRef(null);
  const headerRef = useRef(null);

  // Categorize skills
  const skillCategories = {
    All: skills,
    "AI/ML": skills.filter((skill) =>
      [
        "AI",
        "Machine Learning",
        "Generative AI",
        "NLP",
        "Computer Vision",
        "Deep Learning",
        "ChatGPT",
      ].includes(skill.name)
    ),
    "Data Tools": skills.filter((skill) =>
      [
        "SQL",
        "Excel",
        "Python",
        "Power BI",
        "Tableau",
        "Statistics",
        "R Programming",
        "Data Warehouse",
      ].includes(skill.name)
    ),
    "Cloud & DevOps": skills.filter((skill) =>
      [
        "AWS",
        "GCP",
        "Azure",
        "Docker",
        "Linux",
        "Snowflake",
        "Databricks",
      ].includes(skill.name)
    ),
    "Big Data": skills.filter((skill) =>
      ["Data Pipelines", "ELT", "Big Data", "Server"].includes(skill.name)
    ),
  };

  const currentSkills = skillCategories[currentCategory] || skills;
  const duplicatedSkills = [
    ...currentSkills,
    ...currentSkills,
    ...currentSkills,
  ];

  // Initialize skill refs
  useEffect(() => {
    skillRefs.current = skillRefs.current.slice(0, duplicatedSkills.length);
  }, [currentCategory]);

  // Auto-scroll animation with GSAP
  const startAutoScroll = useCallback(() => {
    if (!beltRef.current || duplicatedSkills.length === 0) return;

    const beltWidth = beltRef.current.scrollWidth / 3;
    const duration = beltWidth / 50;

    autoScrollTween.current = gsap.to(beltRef.current, {
      x: `-=${beltWidth}`,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % beltWidth),
      },
    });
  }, [duplicatedSkills.length]);

  // Stop auto-scroll
  const stopAutoScroll = useCallback(() => {
    if (autoScrollTween.current) {
      autoScrollTween.current.kill();
      autoScrollTween.current = null;
    }
  }, []);

  // Toggle auto-scroll
  const toggleAutoScroll = useCallback(() => {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
    setIsAutoScrolling(!isAutoScrolling);
  }, [isAutoScrolling, startAutoScroll, stopAutoScroll]);

  // Manual scroll functions
  const scrollLeft = useCallback(() => {
    if (!beltRef.current) return;

    stopAutoScroll();
    setIsAutoScrolling(false);

    gsap.to(beltRef.current, {
      x: `+=200`,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        const currentX = gsap.getProperty(beltRef.current, "x");
        if (currentX > 0) {
          gsap.set(beltRef.current, {
            x: `-=${beltRef.current.scrollWidth / 3}`,
          });
        }
      },
    });
  }, [stopAutoScroll]);

  const scrollRight = useCallback(() => {
    if (!beltRef.current) return;

    stopAutoScroll();
    setIsAutoScrolling(false);

    gsap.to(beltRef.current, {
      x: `-=200`,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        const currentX = gsap.getProperty(beltRef.current, "x");
        const maxScroll = -((beltRef.current.scrollWidth / 3) * 2);
        if (currentX < maxScroll) {
          gsap.set(beltRef.current, {
            x: `+=${beltRef.current.scrollWidth / 3}`,
          });
        }
      },
    });
  }, [stopAutoScroll]);

  // Initialize animations on mount
  useEffect(() => {
    startAutoScroll();

    // Animate skill icons on initial load
    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
            rotationY: 60,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.5,
            delay: index * 0.02,
            ease: "back.out(1.4)",
          }
        );
      }
    });

    // Create floating gradient animation
    gradientRef.current = gsap.timeline({ repeat: -1, yoyo: true });
    gradientRef.current
      .to(".left-gradient", {
        background:
          "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.9) 60%, transparent 100%)",
        duration: 4,
        ease: "sine.inOut",
      })
      .to(
        ".right-gradient",
        {
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 40%, #ffffff 100%)",
          duration: 4,
          ease: "sine.inOut",
        },
        0
      );

    // Continuous random skill activation
    let lastActivation = 0;
    const ACTIVATION_COOLDOWN = 2000;

    const activateRandomSkill = () => {
      const now = Date.now();
      if (now - lastActivation < ACTIVATION_COOLDOWN) return;

      if (skillRefs.current.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * skillRefs.current.length
        );
        const skillElement = skillRefs.current[randomIndex];
        if (skillElement && !skillElement.classList.contains("animating")) {
          skillElement.classList.add("animating");
          lastActivation = now;

          gsap.to(skillElement, {
            scale: [1, 1.08, 1],
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              skillElement.classList.remove("animating");
            },
          });
        }
      }
    };

    const activationInterval = setInterval(
      activateRandomSkill,
      ACTIVATION_COOLDOWN
    );

    return () => {
      stopAutoScroll();
      if (gradientRef.current) gradientRef.current.kill();
      clearInterval(activationInterval);
    };
  }, [startAutoScroll, stopAutoScroll]);

  // Skill hover animation
  const handleSkillHover = useCallback(
    (index, isHovering) => {
      if (!skillRefs.current[index]) return;

      const skillElement = skillRefs.current[index];
      const skill = duplicatedSkills[index];

      if (isHovering) {
        setHoveredSkill(index);

        // Enhanced hover animation
        gsap.to(skillElement, {
          scale: 1.1,
          y: -12,
          rotationY: 8,
          zIndex: 100,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
          duration: 0.4,
          ease: "power3.out",
        });

        // Animate icon with enhanced effect
        const icon = skillElement.querySelector(".skill-icon");
        gsap.to(icon, {
          scale: 1.3,
          rotation: 15,
          duration: 0.5,
          ease: "back.out(2)",
        });

        // Animate glow effect
        const glow = skillElement.querySelector(".skill-glow");
        gsap.to(glow, {
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out",
        });

        // Animate description
        const description = skillElement.querySelector(".skill-description");
        gsap.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power3.out",
        });
      } else {
        setHoveredSkill(null);

        // Reset animations
        gsap.to(skillElement, {
          scale: 1,
          y: 0,
          rotationY: 0,
          zIndex: 1,
          boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power3.out",
        });

        const icon = skillElement.querySelector(".skill-icon");
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power3.out",
        });

        const glow = skillElement.querySelector(".skill-glow");
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        const description = skillElement.querySelector(".skill-description");
        gsap.to(description, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [duplicatedSkills]
  );

  // Category change handler
  const handleCategoryChange = useCallback(
    (category) => {
      if (category === currentCategory) return;

      // Enhanced category transition
      gsap.to(".skill-card", {
        opacity: 0,
        scale: 0.8,
        y: 30,
        rotationY: 30,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.01,
        onComplete: () => {
          setCurrentCategory(category);
          setTimeout(() => {
            skillRefs.current.forEach((ref, index) => {
              if (ref) {
                gsap.fromTo(
                  ref,
                  {
                    opacity: 0,
                    scale: 0.8,
                    y: 30,
                    rotationY: -30,
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotationY: 0,
                    duration: 0.5,
                    delay: index * 0.01,
                    ease: "back.out(1.7)",
                  }
                );
              }
            });
          }, 100);
        },
      });
    },
    [currentCategory]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleAutoScroll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollLeft, scrollRight, toggleAutoScroll]);

  // Mouse wheel navigation
  useEffect(() => {
    let lastWheelTime = 0;
    const WHEEL_COOLDOWN = 100;

    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime < WHEEL_COOLDOWN) return;

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        lastWheelTime = now;
        if (e.deltaX > 0) scrollRight();
        else scrollLeft();
      } else if (Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        lastWheelTime = now;
        if (e.deltaY > 0) scrollRight();
        else scrollLeft();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollLeft, scrollRight]);

  return (
    <div className="w-full py-16 px-4 md:px-6 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                [
                  "rgba(59, 130, 246, 0.15)",
                  "rgba(34, 197, 94, 0.15)",
                  "rgba(245, 158, 11, 0.15)",
                  "rgba(168, 85, 247, 0.15)",
                  "rgba(236, 72, 153, 0.15)",
                ][Math.floor(Math.random() * 5)]
              }`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        {/* Header */}

        {/* Category Filter */}

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-2xl 
                     bg-gradient-to-r from-white to-gray-50 backdrop-blur-xl border border-gray-300 
                     shadow-2xl hover:shadow-3xl hover:border-blue-400 hover:scale-110 active:scale-95 
                     transition-all duration-300 group"
            aria-label="Scroll left"
          >
            <ChevronLeft
              size={24}
              className="text-gray-700 group-hover:text-blue-600 transition-colors"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/0 transition-all duration-300" />
          </button>

          <button
            onClick={scrollRight}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-2xl 
                     bg-gradient-to-l from-white to-gray-50 backdrop-blur-xl border border-gray-300 
                     shadow-2xl hover:shadow-3xl hover:border-blue-400 hover:scale-110 active:scale-95 
                     transition-all duration-300 group"
            aria-label="Scroll right"
          >
            <ChevronRight
              size={24}
              className="text-gray-700 group-hover:text-blue-600 transition-colors"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/0 transition-all duration-300" />
          </button>

          {/* Auto-scroll Toggle */}
          <button
            onClick={toggleAutoScroll}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 p-3 rounded-full 
                     bg-gradient-to-br from-blue-500 to-purple-600 text-white
                     border-2 border-white shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 
                     transition-all duration-300 group"
            aria-label={
              isAutoScrolling ? "Pause auto-scroll" : "Resume auto-scroll"
            }
          >
            <div className="relative">
              {isAutoScrolling ? (
                <Pause size={20} className="relative z-10" />
              ) : (
                <Play size={20} className="relative z-10 ml-0.5" />
              )}
              <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors" />
            </div>
          </button>

          {/* Enhanced Gradient Overlays */}
          <div className="left-gradient absolute left-0 top-0 bottom-0 w-32 md:w-64 z-20 pointer-events-none" />
          <div className="right-gradient absolute right-0 top-0 bottom-0 w-32 md:w-64 z-20 pointer-events-none" />

          {/* Skill Belt Container - Full width */}
          <div
            ref={containerRef}
            className="overflow-hidden py-8 px-4 relative w-full max-w-full"
          >
            <div ref={beltRef} className="flex gap-6 px-4 md:px-8">
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={index}
                  ref={(el) => (skillRefs.current[index] = el)}
                  onMouseEnter={() => handleSkillHover(index, true)}
                  onMouseLeave={() => handleSkillHover(index, false)}
                  className={`shrink-0 w-48 h-56 rounded-2xl ${skill.bg} ${skill.border}
                            border-2 flex flex-col items-center justify-center p-5
                            cursor-pointer relative group skill-card
                            transition-all duration-300 backdrop-blur-sm`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {/* Enhanced glow effect */}
                  <div
                    className={`skill-glow absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.glow} 
                             opacity-0 blur-xl transition-opacity duration-500`}
                  />

                  {/* Floating particles around card */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${10 + i * 15}%`,
                          background: `radial-gradient(circle, ${skill.color
                            .replace("text-", "rgba(var(--color-")
                            .replace(")", ", 0.2)")
                            .replace("-", "")})`,
                          animation: `float-particle ${
                            3 + i
                          }s infinite ease-in-out`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Skill icon with enhanced styling */}
                  <div
                    className={`skill-icon mb-5 ${skill.color} relative z-10 
                             transition-all duration-300 p-3 rounded-2xl bg-white/50 backdrop-blur-sm
                             shadow-md group-hover:shadow-lg`}
                  >
                    {skill.icon}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-transparent" />
                  </div>

                  {/* Skill name */}
                  <h3 className="font-bold text-gray-800 text-center text-lg mb-3 relative z-10">
                    {skill.name}
                  </h3>

                  {/* Description on hover */}
                  <div
                    className="skill-description absolute inset-x-5 bottom-5 opacity-0 translate-y-6
                              group-hover:opacity-100 group-hover:translate-y-0 
                              transition-all duration-300 ease-out z-20"
                  >
                    <p className="text-sm text-gray-700 text-center leading-tight px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm">
                      {skill.description}
                    </p>
                  </div>

                  {/* Enhanced progress indicator */}
                  <div className="absolute bottom-3 left-4 right-4 h-2 bg-white/80 backdrop-blur-sm rounded-full overflow-hidden border border-gray-200/50 shadow-inner">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full relative`}
                      style={{
                        width: `${Math.random() * 70 + 30}%`,
                        animation: "progress-pulse 2s ease-in-out infinite",
                      }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>

                  {/* Enhanced level indicator */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 
                              backdrop-blur-sm border border-gray-300/50 shadow-lg"
                  >
                    <span className="text-xs font-bold text-gray-800">
                      {
                        ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐"][
                          Math.floor(Math.random() * 4)
                        ]
                      }
                    </span>
                  </div>

                  {/* Enhanced experience badge */}
                  <div className="absolute top-4 left-4">
                    <div className="text-xs font-bold text-gray-800 bg-gradient-to-r from-white to-gray-100 px-3 py-1.5 rounded-full border border-gray-300/50 shadow-lg">
                      {Math.floor(Math.random() * 5) + 1}+ years
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translate(10px, -15px) rotate(120deg);
            opacity: 0.4;
          }
          66% {
            transform: translate(-5px, 10px) rotate(240deg);
            opacity: 0.3;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(5px, -8px) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes progress-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(var(--color-primary), 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(var(--color-primary), 0);
          }
        }

        @keyframes card-float {
          0%, 100% {
            transform: translateY(0) rotateX(0);
          }
          50% {
            transform: translateY(-8px) rotateX(5deg);
          }
        }

        .skill-card {
          transition: all 0.3s ease;
          will-change: transform, opacity;
          animation: card-float 6s ease-in-out infinite;
          animation-delay: calc(var(--index) * 0.1s);
        }

        .skill-card:hover {
          animation-play-state: paused;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
}
