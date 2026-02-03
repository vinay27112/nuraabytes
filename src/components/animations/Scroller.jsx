import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Sparkles,
  MousePointer,
  Play,
  Pause,
  Zap,
  Target,
  Shield,
  Users,
  Maximize2,
  Code2,
  Globe,
  Award,
  Rocket,
  Heart,
  Eye,
  Hand,
  Volume2,
  ArrowDown,
  ArrowUp,
  Lock,
  Unlock,
  AlertCircle,
} from "lucide-react";
import gsap from "gsap";

const cards = [
  {
    id: 1,
    title: "Turn Ambition into Action",
    description:
      "Transform your goals into reality with structured learning paths and guided progression",
    color: "bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10",
    border: "border-blue-500/30",
    accent: "text-blue-500",
    accentColor: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    number: "01",
    icon: "🎯",
    iconComponent: <Target className="text-blue-500" size={32} />,
    features: [
      "Interactive lessons for all skill levels",
      "AI, cloud, data & cybersecurity focus",
      "Personalized progress tracking",
    ],
  },
  {
    id: 2,
    title: "Gain Hands-on Expertise",
    description:
      "Build real-world projects that showcase your skills to potential employers and clients",
    color:
      "bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-pink-500/10",
    border: "border-purple-500/30",
    accent: "text-purple-500",
    accentColor: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    number: "02",
    icon: "⚡",
    iconComponent: <Zap className="text-purple-500" size={32} />,
    features: [
      "Portfolio-worthy project building",
      "Industry certification prep",
      "Real-world application focus",
    ],
  },
  {
    id: 3,
    title: "Transform Your Team",
    description:
      "Scale your organization's capabilities with tailored learning paths and team management",
    color:
      "bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-green-500/10",
    border: "border-emerald-500/30",
    accent: "text-emerald-500",
    accentColor: "bg-emerald-500",
    gradient: "from-emerald-500 to-green-500",
    number: "03",
    icon: "👥",
    iconComponent: <Users className="text-emerald-500" size={32} />,
    features: [
      "Flexible content assignment",
      "Team progress dashboard",
      "Custom learning paths",
    ],
  },
  {
    id: 4,
    title: "Go Further Together",
    description:
      "Join a global community committed to growth, collaboration, and excellence in learning",
    color:
      "bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-orange-500/10",
    border: "border-amber-500/30",
    accent: "text-amber-500",
    accentColor: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
    number: "04",
    icon: "🛡️",
    iconComponent: <Shield className="text-amber-500" size={32} />,
    features: [
      "Global learner community",
      "Exclusive events & study groups",
      "Mentorship opportunities",
    ],
  },
];

export default function ScrollHijackInteractive() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isScrollHijacked, setIsScrollHijacked] = useState(false);
  const [showLockIndicator, setShowLockIndicator] = useState(false);
  const [hasReleasedScroll, setHasReleasedScroll] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [isInSection, setIsInSection] = useState(false);

  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const progressBarRef = useRef(null);
  const autoScrollRef = useRef(null);
  const animationTimeline = useRef(null);
  const scrollPositionRef = useRef(0);
  const sectionTopPositionRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const SCROLL_THRESHOLD = 40; // Lower threshold for smoother detection
  const ANIMATION_DURATION = 0.6;
  const CARD_COUNT = cards.length;

  // Initialize refs
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, cards.length);
  }, []);

  // Check if section is in viewport - throttled for performance
  useEffect(() => {
    let rafId = null;
    let ticking = false;

    const checkIfInSection = () => {
      if (!sectionRef.current || ticking) return;

      ticking = true;
      rafId = requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setIsInSection(isVisible);

        if (isVisible) {
          sectionTopPositionRef.current = window.scrollY;
        }

        ticking = false;
      });
    };

    checkIfInSection();
    window.addEventListener("scroll", checkIfInSection, { passive: true });
    window.addEventListener("resize", checkIfInSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkIfInSection);
      window.removeEventListener("resize", checkIfInSection);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP animations for card transitions
  const animateCardTransition = useCallback(
    (fromIndex, toIndex, direction = "next") => {
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }

      setIsAnimating(true);
      isAnimatingRef.current = true;

      animationTimeline.current = gsap.timeline({
        defaults: { duration: ANIMATION_DURATION, ease: "power2.inOut" },
        onComplete: () => {
          setIsAnimating(false);
          isAnimatingRef.current = false;

          // Check if we've reached the last card
          if (toIndex === cards.length - 1 && !hasReleasedScroll) {
            // Show end message
            setShowEndMessage(true);
          }
        },
      });

      // Move cards container
      animationTimeline.current.to(
        cardsContainerRef.current,
        {
          x: `-${toIndex * 100}%`,
          duration: ANIMATION_DURATION,
          ease: "power3.out",
        },
        0
      );

      // Animate progress bar
      if (progressBarRef.current) {
        animationTimeline.current.to(
          progressBarRef.current,
          {
            scaleX: (toIndex + 1) / cards.length,
            duration: ANIMATION_DURATION * 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          0
        );
      }

      // Animate card content
      const currentCardEl = cardRefs.current[fromIndex];
      const nextCardEl = cardRefs.current[toIndex];

      if (currentCardEl) {
        animationTimeline.current.to(
          currentCardEl,
          {
            opacity: 0.3,
            scale: 0.95,
            duration: ANIMATION_DURATION * 0.5,
            ease: "power2.in",
          },
          0
        );
      }

      if (nextCardEl) {
        animationTimeline.current.fromTo(
          nextCardEl,
          {
            opacity: 0,
            scale: 1.1,
            x: direction === "next" ? 50 : -50,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: ANIMATION_DURATION,
            ease: "back.out(1.7)",
          },
          ANIMATION_DURATION * 0.2
        );
      }
    },
    [hasReleasedScroll]
  );

  // Auto-scroll functionality - moved after animateCardTransition is defined
  useEffect(() => {
    if (!isAutoScrolling || !isScrollHijacked) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentCard((prev) => {
        const nextCard = prev < cards.length - 1 ? prev + 1 : 0;
        if (nextCard === 0) {
          setIsAutoScrolling(false);
        }
        // Trigger animation after state update
        setTimeout(() => {
          if (!isAnimatingRef.current) {
            animateCardTransition(
              prev,
              nextCard,
              nextCard > prev ? "next" : "prev"
            );
          }
        }, 0);
        return nextCard;
      });
    }, 3500);

    autoScrollRef.current = intervalId;

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [isAutoScrolling, isScrollHijacked, animateCardTransition]);

  const goToCard = useCallback(
    (index, direction = "next") => {
      if (isAnimating || index < 0 || index >= cards.length) return;

      setCurrentCard((prevCard) => {
        if (index === prevCard) return prevCard;

        // Trigger animation after state update
        setTimeout(() => {
          if (!isAnimatingRef.current) {
            animateCardTransition(prevCard, index, direction);
          }
        }, 0);

        return index;
      });
    },
    [isAnimating, animateCardTransition]
  );

  const nextCard = useCallback(() => {
    if (isAnimating) return;

    setCurrentCard((prev) => {
      if (prev < cards.length - 1) {
        const next = prev + 1;
        // Trigger animation separately
        setTimeout(() => {
          if (!isAnimatingRef.current) {
            animateCardTransition(prev, next, "next");
          }
        }, 0);
        return next;
      } else if (isScrollHijacked && !hasReleasedScroll) {
        // At last card, show release message but don't auto-release
        setShowEndMessage(true);
        setTimeout(() => setShowEndMessage(false), 2000);
      }
      return prev;
    });
  }, [isAnimating, animateCardTransition, isScrollHijacked, hasReleasedScroll]);

  const prevCard = useCallback(() => {
    if (isAnimating) return;

    setCurrentCard((prev) => {
      if (prev > 0) {
        const prevIdx = prev - 1;
        // Trigger animation separately
        setTimeout(() => {
          if (!isAnimatingRef.current) {
            animateCardTransition(prev, prevIdx, "prev");
          }
        }, 0);
        return prevIdx;
      }
      return prev;
    });
  }, [isAnimating, animateCardTransition]);

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScrolling((prev) => !prev);
  }, []);

  // Start scroll hijacking
  const startScrollHijack = useCallback(() => {
    if (!isScrollHijacked && !hasReleasedScroll) {
      scrollPositionRef.current = window.scrollY;

      // Add a class to body to prevent scroll but maintain position
      document.body.classList.add("scroll-locked");
      document.body.style.top = `-${scrollPositionRef.current}px`;

      setIsScrollHijacked(true);
      setShowLockIndicator(true);

      // Show lock indicator briefly
      setTimeout(() => {
        setShowLockIndicator(false);
      }, 1500);
    }
  }, [isScrollHijacked, hasReleasedScroll]);

  // Release scroll hijacking
  const releaseScrollHijack = useCallback(() => {
    if (isScrollHijacked) {
      // Remove the locking styles
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";

      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);

      setIsScrollHijacked(false);
      setHasReleasedScroll(true);
      setShowLockIndicator(true);
      setShowEndMessage(false);

      // Show unlock indicator
      setTimeout(() => {
        setShowLockIndicator(false);
      }, 1500);

      // Scroll down a bit after release
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight * 0.5,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [isScrollHijacked]);

  // Main scroll hijacking logic - OPTIMIZED VERSION
  useEffect(() => {
    let isProcessingWheel = false;
    let wheelDelta = 0;
    let lastScrollTime = 0;
    const WHEEL_COOLDOWN = 150; // Reduced for better responsiveness

    const handleWheel = (e) => {
      // If scroll is already released, let normal scroll happen
      if (hasReleasedScroll) return;

      // If we're in the section and scroll is not hijacked yet
      if (isInSection && !isScrollHijacked && !isAnimating) {
        // Only hijack on downward scroll when at the section
        if (e.deltaY > 10) {
          e.preventDefault();
          startScrollHijack();
          return;
        }
      }

      // If scroll is hijacked, handle card navigation
      if (isScrollHijacked && !isAnimating && !isProcessingWheel) {
        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();
        if (now - lastScrollTime < WHEEL_COOLDOWN) {
          wheelDelta += Math.abs(e.deltaY);
          return;
        }

        wheelDelta += Math.abs(e.deltaY);

        if (wheelDelta > SCROLL_THRESHOLD) {
          isProcessingWheel = true;
          lastScrollTime = now;
          wheelDelta = 0; // Reset immediately

          if (e.deltaY > 0) {
            // Scroll down - next card
            nextCard();
          } else {
            // Scroll up - previous card
            prevCard();
          }

          // Reset processing flag after animation time
          setTimeout(() => {
            isProcessingWheel = false;
          }, ANIMATION_DURATION * 1000);
        }
      }
    };

    // Use capture phase to catch the event early
    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      // Clean up on unmount
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";
    };
  }, [
    isScrollHijacked,
    isAnimating,
    isInSection,
    nextCard,
    prevCard,
    hasReleasedScroll,
    startScrollHijack,
  ]);

  // Touch swipe support
  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;
    const SWIPE_THRESHOLD = 50;
    const SWIPE_TIME_THRESHOLD = 300;

    const handleTouchStart = (e) => {
      if (hasReleasedScroll) return;

      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();

      // If in section and not hijacked yet
      if (isInSection && !isScrollHijacked && !hasReleasedScroll) {
        startScrollHijack();
      }
    };

    const handleTouchMove = (e) => {
      if (isScrollHijacked && !hasReleasedScroll) {
        e.preventDefault(); // Prevent page scroll when hijacked
      }
    };

    const handleTouchEnd = (e) => {
      if (hasReleasedScroll || !isScrollHijacked || isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const diffY = touchStartY - touchEndY;
      const timeDiff = touchEndTime - touchStartTime;

      // Only register as swipe if it's fast enough and far enough
      if (
        timeDiff < SWIPE_TIME_THRESHOLD &&
        Math.abs(diffY) > SWIPE_THRESHOLD
      ) {
        if (diffY > 0) {
          // Swipe up (scroll down equivalent)
          nextCard();
        } else {
          // Swipe down (scroll up equivalent)
          prevCard();
        }
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      section.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      section.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener("touchstart", handleTouchStart);
        section.removeEventListener("touchmove", handleTouchMove);
        section.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [
    isScrollHijacked,
    isAnimating,
    isInSection,
    nextCard,
    prevCard,
    hasReleasedScroll,
    startScrollHijack,
  ]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasReleasedScroll) return;

      // Start hijack on arrow key press when in section
      if (isInSection && !isScrollHijacked && !hasReleasedScroll) {
        if (
          e.key === "ArrowRight" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp"
        ) {
          e.preventDefault();
          startScrollHijack();
          return;
        }
      }

      if (!isScrollHijacked) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextCard();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevCard();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleAutoScroll();
      } else if (e.key === "Escape") {
        e.preventDefault();
        releaseScrollHijack();
      } else if (e.key === "Enter" && currentCard === cards.length - 1) {
        e.preventDefault();
        releaseScrollHijack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isScrollHijacked,
    isInSection,
    nextCard,
    prevCard,
    toggleAutoScroll,
    hasReleasedScroll,
    currentCard,
    startScrollHijack,
    releaseScrollHijack,
  ]);

  // Initial animations
  useEffect(() => {
    // Animate section entrance
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    // Animate initial card
    if (cardRefs.current[0]) {
      setTimeout(() => {
        gsap.fromTo(
          cardRefs.current[0],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }, 300);
    }

    // Hide instructions after 5 seconds
    const hideTimer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => {
      clearTimeout(hideTimer);
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      // Ensure scroll is released on unmount
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";
    };
  }, []);

  // Update progress bar on card change
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: (currentCard + 1) / cards.length,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [currentCard]);

  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-500 animate-pulse" size={28} />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Interactive Experience
              </h1>
              <Sparkles className="text-blue-500 animate-pulse" size={28} />
            </div>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Scroll down to the interactive section. When you scroll into it,
              the page will lock and you can navigate cards with your scroll
              wheel.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="flex flex-col items-center gap-4">
              <ArrowDown className="text-blue-500 animate-bounce" size={48} />
              <div className="text-lg font-medium text-gray-700">
                Scroll down to find the interactive section
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: <Lock className="text-blue-500" />,
                  text: "Scroll locks automatically",
                },
                {
                  icon: <MousePointer className="text-purple-500" />,
                  text: "Scroll to navigate cards",
                },
                {
                  icon: <Unlock className="text-emerald-500" />,
                  text: "Press ESC to exit anytime",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full border border-gray-200"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              {
                label: "Cards",
                value: `${cards.length}`,
                icon: <Target className="text-red-400" />,
                color: "from-red-400 to-pink-400",
              },
              {
                label: "Interactive",
                value: "100%",
                icon: <Hand className="text-green-400" />,
                color: "from-green-400 to-emerald-400",
              },
              {
                label: "Completion",
                value: `${Math.round(
                  ((currentCard + 1) / cards.length) * 100
                )}%`,
                icon: <Award className="text-blue-400" />,
                color: "from-blue-400 to-cyan-400",
              },
              {
                label: "Status",
                value: isScrollHijacked
                  ? "Locked"
                  : hasReleasedScroll
                  ? "Done"
                  : "Ready",
                icon: isScrollHijacked ? (
                  <Lock className="text-amber-400" />
                ) : hasReleasedScroll ? (
                  <Unlock className="text-amber-400" />
                ) : (
                  <ArrowDown className="text-amber-400" />
                ),
                color: "from-amber-400 to-orange-400",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div
                  className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer to ensure smooth scrolling to section */}
      <div className="h-20" />

      {/* Interactive Scroll Section */}
      <section
        ref={sectionRef}
        className="min-h-[85vh] py-12 px-4 relative bg-gradient-to-b from-white to-gray-50 border-t border-b border-gray-200/50"
      >
        {/* Scroll Hijack Status Indicator */}
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isScrollHijacked
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                : hasReleasedScroll
                ? "bg-gray-500/10 border-gray-500/30 text-gray-600"
                : "bg-blue-500/10 border-blue-500/30 text-blue-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isScrollHijacked
                  ? "bg-emerald-500 animate-pulse"
                  : hasReleasedScroll
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
            />
            <span className="text-xs font-medium">
              {isScrollHijacked
                ? "Scroll Locked"
                : hasReleasedScroll
                ? "Scroll Released"
                : "Scroll into section"}
            </span>
          </div>
        </div>

        {/* Lock/Unlock Animation */}
        {showLockIndicator && (
          <div className="fixed top-16 right-4 z-50 animate-fadeIn">
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg">
              {isScrollHijacked ? (
                <>
                  <Lock size={14} />
                  <span className="text-xs font-medium">
                    Scroll Locked - Navigate with scroll wheel
                  </span>
                </>
              ) : (
                <>
                  <Unlock size={14} />
                  <span className="text-xs font-medium">Scroll Released</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* End Message */}
        {showEndMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full shadow-lg">
              <Sparkles size={16} />
              <span className="text-sm font-medium">
                Final card reached! Press ESC or click Release to exit
              </span>
            </div>
          </div>
        )}

        {/* Section Entry Hint */}
        {!isScrollHijacked && !hasReleasedScroll && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center animate-pulse">
            <div className="flex flex-col items-center gap-4 p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl max-w-md">
              <MousePointer className="text-blue-500" size={48} />
              <h3 className="text-2xl font-bold text-gray-900">Scroll Here</h3>
              <p className="text-gray-600">
                Scroll down into this section to start the interactive
                experience
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ArrowDown className="animate-bounce" />
                <span>Scroll down to lock and begin</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto h-full">
          {/* Section Header */}
          <div className="text-center mb-8 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Interactive Showcase
            </h2>
            <p className="text-gray-600 mb-6">
              {hasReleasedScroll
                ? "✓ Experience completed - Scroll normally"
                : isScrollHijacked
                ? `Use scroll wheel to navigate cards (${currentCard + 1}/${
                    cards.length
                  })`
                : "Scroll down into this section to begin"}
            </p>

            {/* Progress Indicator */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {hasReleasedScroll
                    ? "Completed"
                    : `Card ${currentCard + 1} of ${cards.length}`}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentCard + 1) / cards.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className={`h-full bg-gradient-to-r ${cards[currentCard].gradient} origin-left`}
                  style={{
                    transform: `scaleX(${(currentCard + 1) / cards.length})`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Interactive Area */}
          <div className="relative h-[65vh] md:h-[70vh]">
            {/* Navigation Buttons */}
            <button
              onClick={prevCard}
              disabled={currentCard === 0 || isAnimating || !isScrollHijacked}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm border shadow-lg transition-all duration-300 group ${
                currentCard === 0 || isAnimating || !isScrollHijacked
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl active:scale-95"
              }`}
              title="Previous card"
              aria-label="Previous card"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextCard}
              disabled={isAnimating || !isScrollHijacked}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm border shadow-lg transition-all duration-300 group ${
                isAnimating || !isScrollHijacked
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl active:scale-95"
              }`}
              title={
                currentCard === cards.length - 1
                  ? "Final card - Press ESC to exit"
                  : "Next card"
              }
              aria-label={
                currentCard === cards.length - 1
                  ? "Final card - Press ESC to exit"
                  : "Next card"
              }
            >
              {currentCard === cards.length - 1 ? (
                <Unlock size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>

            {/* Auto-scroll Toggle */}
            <button
              onClick={toggleAutoScroll}
              disabled={!isScrollHijacked || hasReleasedScroll}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full backdrop-blur-sm border shadow-lg transition-all duration-300 group ${
                isAutoScrolling
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-blue-500/25"
                  : isScrollHijacked && !hasReleasedScroll
                  ? "bg-white/90 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                  : "bg-gray-100/90 border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              title={
                isScrollHijacked
                  ? isAutoScrolling
                    ? "Pause auto-scroll"
                    : "Start auto-scroll"
                  : "Start experience first"
              }
              aria-label={
                isScrollHijacked
                  ? isAutoScrolling
                    ? "Pause auto-scroll"
                    : "Start auto-scroll"
                  : "Start experience first"
              }
            >
              {isAutoScrolling ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Manual Release Button */}
            {isScrollHijacked && !hasReleasedScroll && (
              <button
                onClick={releaseScrollHijack}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-700 text-sm hover:border-red-500 hover:text-red-600 hover:shadow-lg transition-all duration-300"
                title="Exit interactive mode (ESC)"
                aria-label="Exit interactive mode (ESC)"
              >
                <Unlock size={14} className="inline mr-2" />
                Exit Experience
              </button>
            )}

            {/* Cards Container */}
            <div className="h-full overflow-hidden rounded-2xl bg-white/30 backdrop-blur-sm border border-gray-200/50 shadow-xl">
              <div
                ref={cardsContainerRef}
                className="flex h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentCard * 100}%)` }}
              >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="w-full h-full shrink-0 flex flex-col lg:flex-row"
                  >
                    {/* Left Column - Text Content */}
                    <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className={`w-12 h-12 rounded-xl ${card.accentColor} bg-opacity-10 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer`}
                            onClick={() =>
                              isScrollHijacked &&
                              goToCard(
                                index,
                                index > currentCard ? "next" : "prev"
                              )
                            }
                            aria-label={`Go to card ${index + 1}`}
                          >
                            {card.iconComponent}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Step {card.number}
                            </div>
                            <h3
                              className={`text-2xl md:text-3xl font-bold mt-1 ${card.accent}`}
                            >
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-8 leading-relaxed">
                          {card.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-4">
                          {card.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-300"
                            >
                              <div
                                className={`w-6 h-6 rounded-full ${card.accentColor} bg-opacity-10 flex items-center justify-center shrink-0 mt-0.5`}
                              >
                                <CheckCircle
                                  className={`w-4 h-4 ${card.accent}`}
                                />
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Indicator */}
                      <div className="flex items-center gap-2 mt-8">
                        {cards.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              isScrollHijacked &&
                              goToCard(idx, idx > currentCard ? "next" : "prev")
                            }
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentCard
                                ? `bg-gradient-to-r ${card.gradient} scale-125`
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to card ${idx + 1}`}
                            disabled={isAnimating || !isScrollHijacked}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Visual Content */}
                    <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex items-center justify-center">
                      <div
                        className={`w-full h-full rounded-xl ${card.color} ${
                          card.border
                        } flex items-center justify-center relative overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-500 ${
                          isScrollHijacked ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        {/* Glow Effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transition-opacity duration-500 ${
                            isScrollHijacked
                              ? "group-hover:opacity-100"
                              : "opacity-50"
                          }`}
                        />

                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-6 left-6 text-6xl">
                            {card.icon}
                          </div>
                          <div className="absolute bottom-6 right-6 text-5xl font-bold">
                            {card.number}
                          </div>
                        </div>

                        {/* Main Visual */}
                        <div className="relative z-10 text-center">
                          <div
                            className={`text-7xl mb-6 transition-transform duration-500 ${
                              isScrollHijacked ? "group-hover:scale-110" : ""
                            }`}
                          >
                            {card.icon}
                          </div>
                          <div
                            className={`text-5xl font-bold ${card.accent} opacity-20`}
                          >
                            {card.number}
                          </div>
                        </div>

                        {/* Scroll Hint */}
                        {index === currentCard &&
                          isScrollHijacked &&
                          !isAnimating &&
                          !hasReleasedScroll && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                                <MousePointer className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-700">
                                  Scroll wheel to navigate
                                </span>
                              </div>
                            </div>
                          )}

                        {/* Last Card Indicator */}
                        {index === cards.length - 1 &&
                          currentCard === cards.length - 1 &&
                          isScrollHijacked && (
                            <div className="absolute top-6 left-1/2 -translate-x-1/2">
                              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full shadow-sm">
                                <CheckCircle size={14} />
                                <span className="text-sm font-medium">
                                  Final card - Press ESC to exit
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Panel */}
            {showInstructions && isScrollHijacked && !hasReleasedScroll && (
              <div className="absolute top-4 right-4 z-30 hidden lg:block animate-fadeIn">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-lg max-w-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                      <Volume2 size={14} />
                      Quick Guide
                    </h4>
                    <button
                      onClick={() => setShowInstructions(false)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                      aria-label="Close instructions"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: "SCROLL", text: "Navigate cards" },
                      { key: "← →", text: "Arrow keys" },
                      { key: "SPACE", text: "Auto-scroll" },
                      { key: "ESC", text: "Exit experience" },
                      { key: "CLICK", text: "Jump to any card" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-gray-100 text-xs rounded border border-gray-300 font-medium">
                          {item.key}
                        </kbd>
                        <span className="text-xs text-gray-600">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Control Info */}
          <div className="text-center mt-8 px-4">
            <div className="inline-flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    cards[currentCard].accentColor
                  } ${isAnimating ? "animate-pulse" : ""}`}
                />
                <span>
                  Card {currentCard + 1} of {cards.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isAutoScrolling
                      ? "bg-purple-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                />
                <span>{isAutoScrolling ? "Auto-scroll" : "Manual"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isScrollHijacked
                      ? "bg-emerald-500 animate-pulse"
                      : hasReleasedScroll
                      ? "bg-gray-400"
                      : "bg-blue-500"
                  }`}
                />
                <span>
                  {isScrollHijacked
                    ? "Scroll Locked"
                    : hasReleasedScroll
                    ? "Scroll Released"
                    : "Ready"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Section */}
      <section className="min-h-[60vh] py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <Rocket className="text-blue-500" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">
              {hasReleasedScroll
                ? "Experience Complete!"
                : "Continue Your Journey"}
            </h2>
            <Rocket className="text-blue-500" size={28} />
          </div>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            {hasReleasedScroll
              ? "You've completed the interactive showcase! Scroll normally to continue."
              : "Complete the interactive showcase above to continue exploring."}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Learn More
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Explore our documentation, tutorials, and community resources.
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                View Resources
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get Started
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Begin your journey with our interactive learning platform.
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                Start Free Trial
              </button>
            </div>
          </div>

          {!hasReleasedScroll && (
            <div className="mt-12 flex justify-center">
              <ArrowDown className="text-gray-400 animate-bounce" size={32} />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/95 text-white py-12 px-4 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-400" />
            <span className="text-lg font-bold">
              Scroll Lock Interactive Component
            </span>
            <Sparkles className="text-blue-400" />
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Scroll locks when section is entered, releases with ESC or after
            completion
          </p>
          <div className="border-t border-gray-800 pt-6 text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Interactive Showcase</p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* Fixed scroll locking technique */
        .scroll-locked {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          left: 0 !important;
          right: 0 !important;
        }

        /* Smooth scrolling for the page */
        html {
          scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Prevent pull-to-refresh on mobile when locked */
        body.scroll-locked {
          overscroll-behavior: none;
        }
      `}</style>
    </div>
  );
}
