import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cpu, Zap, Shield, Play } from "lucide-react";
import gsap from "gsap";

const contentSections = [
  {
    id: 1,
    title: "Hands-on, interactive courses",
    description:
      "Short videos are broken up by interactive exercises. Practice new skills immediately to retain information.",
    icon: <Cpu size={28} />,
    accent: "border-purple-500",
    accentColor: "text-purple-600",
    avifSrc: "/slide-one.avif",
  },
  {
    id: 2,
    title: "Real-World Projects",
    description:
      "Apply your learning in real situations, perfect for developing practical skills and building your portfolio.",
    icon: <Zap size={28} />,
    accent: "border-amber-500",
    accentColor: "text-amber-600",
    avifSrc: "/slide-two.avif",
  },
  {
    id: 3,
    title: "Become a certified professional",
    description:
      "Prove you're job-ready. Earn industry-leading certifications built around in-demand roles.",
    icon: <Shield size={28} />,
    accent: "border-red-500",
    accentColor: "text-red-600",
    avifSrc: "/slide-three.avif",
  },
];

export default function AvifPlayerHub() {
  const [activeAvif, setActiveAvif] = useState(0);
  const playerRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRef = useRef(null);

  // Initialize GSAP animations
  useEffect(() => {
    // Animate the player on mount
    gsap.fromTo(
      playerRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );

    // Animate cards on mount
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -30,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            delay: index * 0.1,
            ease: "back.out(1.5)",
          }
        );
      }
    });
  }, []);

  // Handle image change with GSAP animation
  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          // Reset to show new image
          gsap.set(imageRef.current, {
            opacity: 0,
            scale: 1.05,
          });

          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    }
  }, [activeAvif]);

  // Handle card hover with GSAP
  const handleCardHover = (index, isHovering) => {
    const card = cardRefs.current[index];
    if (!card) return;

    if (isHovering) {
      // Scale up and lift
      gsap.to(card, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });

      // Change active image with slight delay for smoothness
      setTimeout(() => {
        setActiveAvif(index);
      }, 50);

      // Animate icon
      const iconWrapper = card.querySelector(".icon-wrapper");
      if (iconWrapper) {
        gsap.to(iconWrapper, {
          scale: 1.1,
          duration: 0.2,
          ease: "back.out(1.7)",
        });
      }

      // Show play button
      const playButton = card.querySelector(".play-button");
      if (playButton) {
        gsap.to(playButton, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    } else {
      // Only reset if not active
      if (activeAvif !== index) {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

        const iconWrapper = card.querySelector(".icon-wrapper");
        if (iconWrapper) {
          gsap.to(iconWrapper, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        }

        const playButton = card.querySelector(".play-button");
        if (playButton) {
          gsap.to(playButton, {
            opacity: 0,
            x: 10,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      }
    }
  };

  // Handle card click with GSAP
  const handleCardClick = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      // Bounce effect
      gsap.to(card, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.2,
            ease: "elastic.out(1, 0.5)",
          });
        },
      });
    }
    setActiveAvif(index);
  };

  // Active bar animation
  useEffect(() => {
    const activeCard = cardRefs.current[activeAvif];
    if (!activeCard) return;

    const activeBar = activeCard.querySelector(".active-bar");
    if (activeBar) {
      // Reset and animate
      gsap.set(activeBar, { width: 0 });
      gsap.to(activeBar, {
        width: "100%",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Ensure play button is visible on active card
    const playButton = activeCard.querySelector(".play-button");
    if (playButton) {
      gsap.to(playButton, {
        opacity: 1,
        x: 0,
        duration: 0.2,
      });
    }
  }, [activeAvif]);

  return (
    <>
      <Link
        className="z-20 absolute right-4 top-4 text-sm bg-linear-to-r from-amber-200 to-yellow-200 text-gray-800 rounded-xl px-4 py-2 hover:from-amber-300 hover:to-yellow-300 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        to="/"
      >
        Home
      </Link>

      <div className="w-full min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 text-gray-900 py-10 md:py-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Equal-height grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1.7fr] gap-10 items-stretch">
            {/* Left: Fixed AVIF player (thinner) */}
            <div className="flex h-full">
              <div
                ref={playerRef}
                className="relative w-full h-125 md:h-150 rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl bg-white flex items-center justify-center"
              >
                <img
                  ref={imageRef}
                  src={contentSections[activeAvif].avifSrc}
                  alt={contentSections[activeAvif].title}
                  className="w-full h-full object-contain object-center transition-all duration-300"
                />
              </div>
            </div>

            {/* Right: Content area (wider) */}
            <div className="flex flex-col justify-between h-full space-y-6">
              {contentSections.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                  onClick={() => handleCardClick(index)}
                  className={`relative cursor-pointer rounded-2xl p-6 border-2 overflow-hidden transition-all duration-300 group grow ${
                    activeAvif === index
                      ? `${section.accent} bg-linear-to-r from-white to-gray-50 shadow-xl`
                      : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-lg"
                  }`}
                >
                  {/* Icon + Text */}
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`icon-wrapper p-3 rounded-xl transition-all duration-200 ${
                        activeAvif === index
                          ? `${section.accent.replace(
                              "border",
                              "bg"
                            )} bg-opacity-20 border ${section.accent}`
                          : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div
                        className={
                          activeAvif === index
                            ? section.accentColor
                            : "text-gray-500"
                        }
                      >
                        {section.icon}
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h4
                        className={`font-bold text-lg truncate ${
                          activeAvif === index
                            ? "text-gray-900"
                            : "text-gray-800"
                        }`}
                      >
                        {section.title}
                      </h4>
                      <p
                        className={`text-sm text-ellipsis overflow-hidden line-clamp-3 ${
                          activeAvif === index
                            ? "text-gray-700"
                            : "text-gray-600"
                        }`}
                      >
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom active bar */}
                  {activeAvif === index && (
                    <div className="absolute bottom-0 left-0 h-1 overflow-hidden">
                      <div
                        className="active-bar h-full bg-linear-to-r from-current via-current to-current opacity-70"
                        style={{
                          background:
                            section.accent === "border-purple-500"
                              ? "linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc)"
                              : section.accent === "border-amber-500"
                              ? "linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)"
                              : "linear-gradient(90deg, #ef4444, #f87171, #fca5a5)",
                        }}
                      />
                    </div>
                  )}

                  {/* Floating play icon */}
                  <div
                    className={`play-button absolute top-1/2 -right-2 -translate-y-1/2 opacity-0 translate-x-10 transition-all duration-200 ${
                      activeAvif === index ? "opacity-100 translate-x-0" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        activeAvif === index
                          ? section.accent.replace("border", "bg")
                          : "bg-gray-200"
                      }`}
                    >
                      <Play size={14} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
