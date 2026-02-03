import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const INTERVAL = 5000;
const TRANSITION_DURATION = 1.4;

const slides = [
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "Build Faster",
    subtitle: "Create scalable applications with modern web technologies",
  },
  {
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    title: "Design Smarter",
    subtitle: "Clean UI, smooth UX, and interactive experiences",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Launch Confidently",
    subtitle: "Production-ready solutions trusted by users",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressRef = useRef(null);
  const intervalRef = useRef(null);
  const progressTween = useRef(null);
  const animationTimeline = useRef(null);

  // Preload images - optimized
  useEffect(() => {
    const images = slides.map((slide) => {
      const img = new Image();
      img.src = slide.image;
      return img;
    });

    // Cleanup on unmount
    return () => {
      images.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

  // Mouse position for parallax effect - throttled for performance
  useEffect(() => {
    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        // Only update if change is significant (reduce unnecessary updates)
        if (Math.abs(x - lastX) > 0.5 || Math.abs(y - lastY) > 0.5) {
          setMousePosition({ x, y });
          lastX = x;
          lastY = y;
        }

        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const animateSlide = useCallback(
    (direction = "next") => {
      if (!containerRef.current || !imagesContainerRef.current) return;

      // Kill any ongoing animations
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }

      animationTimeline.current = gsap.timeline({
        onStart: () => setIsTransitioning(true),
        onComplete: () => setIsTransitioning(false),
      });

      const images = Array.from(
        imagesContainerRef.current.querySelectorAll("img")
      );
      const prevIdx = prevIndex;
      const currentIdx = index;
      const currentImg = images[prevIdx];
      const nextImg = images[currentIdx];

      // Reset all images
      gsap.set(images, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(0px) brightness(0.8)",
        zIndex: 0,
      });

      // Create motion blur effect
      animationTimeline.current
        .to(
          currentImg,
          {
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px) brightness(0.7)",
            duration: TRANSITION_DURATION * 0.6,
            ease: "power2.in",
          },
          0
        )

        .fromTo(
          nextImg,
          {
            opacity: 0,
            scale: 1.2,
            filter: "blur(8px) brightness(1)",
            zIndex: 10,
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: TRANSITION_DURATION,
            ease: "power3.out",
          },
          0.2
        )

        // Container scale with bounce
        .fromTo(
          containerRef.current,
          { scale: 1 },
          {
            scale: 1.03,
            duration: TRANSITION_DURATION * 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          },
          0
        )

        // Text animation
        .to(
          [titleRef.current, subtitleRef.current],
          {
            opacity: 0,
            y: direction === "next" ? -40 : 40,
            duration: TRANSITION_DURATION * 0.4,
            ease: "power2.in",
            onComplete: () => {
              if (titleRef.current)
                titleRef.current.textContent = slides[currentIdx].title;
              if (subtitleRef.current)
                subtitleRef.current.textContent = slides[currentIdx].subtitle;

              // Split text into spans for character animation
              const titleText = titleRef.current?.textContent || "";
              titleRef.current.innerHTML = titleText
                .split("")
                .map(
                  (char) =>
                    `<span class="char">${
                      char === " " ? "&nbsp;" : char
                    }</span>`
                )
                .join("");
            },
          },
          0
        )

        // Animate text in with wave effect
        .fromTo(
          titleRef.current?.querySelectorAll(".char") || [],
          {
            opacity: 0,
            y: 60,
            rotationX: 90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: {
              amount: 0.4,
              from: direction === "next" ? "start" : "end",
            },
            ease: "back.out(1.4)",
          },
          TRANSITION_DURATION * 0.4
        )

        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          TRANSITION_DURATION * 0.5
        );

      // Progress bar animation
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
        progressTween.current = gsap.to(progressRef.current, {
          scaleX: 1,
          duration: INTERVAL / 1000,
          ease: "sine.inOut",
        });
      }
    },
    [index, prevIndex]
  );

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setPrevIndex(index);
    setIndex((i) => (i + 1) % slides.length);
  }, [index, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setPrevIndex(index);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [index, isTransitioning]);

  const goToSlide = useCallback(
    (slideIndex) => {
      if (isTransitioning || slideIndex === index) return;
      setPrevIndex(index);
      setIndex(slideIndex);
    },
    [index, isTransitioning]
  );

  // Handle slide index changes
  useEffect(() => {
    animateSlide(index > prevIndex ? "next" : "prev");
  }, [index, prevIndex]);

  // Auto-play interval
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressTween.current) progressTween.current.pause();

    if (!paused) {
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
        progressTween.current = gsap.to(progressRef.current, {
          scaleX: 1,
          duration: INTERVAL / 1000,
          ease: "sine.inOut",
        });
      }

      intervalRef.current = setInterval(nextSlide, INTERVAL);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressTween.current) progressTween.current.kill();
    };
  }, [paused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setPaused((p) => !p);
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key >= "1" && e.key <= "3") goToSlide(parseInt(e.key) - 1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide, goToSlide]);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 50) {
        e.preventDefault();
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener("wheel", handleWheel);
    };
  }, [nextSlide, prevSlide]);

  // Apply mouse parallax effect - optimized with overflow prevention
  useEffect(() => {
    if (containerRef.current && !isTransitioning) {
      // Clamp x movement to prevent horizontal overflow
      const clampedX = Math.max(-10, Math.min(10, mousePosition.x));
      // Use GSAP for smoother animation
      gsap.to(containerRef.current, {
        x: clampedX,
        y: mousePosition.y,
        duration: 1.2,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  }, [mousePosition.x, mousePosition.y, isTransitioning]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black text-white"
      style={{
        height: "calc(100vh - 77px)",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Background Images Container with 3D effect */}
      <div
        ref={imagesContainerRef}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translateZ(${i === index ? 0 : -100}px)`,
              transition: `transform ${TRANSITION_DURATION}s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
              style={{
                opacity: i === index ? 1 : 0,
                transform: i === index ? "scale(1.1)" : "scale(1)",
                transition: `opacity ${TRANSITION_DURATION}s ease-out, transform ${TRANSITION_DURATION}s ease-out`,
              }}
            />

            {/* Single clean dark overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {/* Animated scan lines */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)`,
                animation: "scan 20s linear infinite",
              }}
            />
          </div>
        ))}
      </div>

      {/* Content with 3D depth */}
      <div
        className="relative z-10 h-full px-6 md:px-12 flex flex-col justify-center max-w-6xl mx-auto"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="space-y-6 md:space-y-8">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter"
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            {slides[index].title}
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-2xl leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            {slides[index].subtitle}
          </p>
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-30 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left shadow-lg shadow-cyan-500/30"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Animated slide indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            disabled={isTransitioning}
            className="group relative"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-white/30 group-hover:bg-white/50"
              }`}
            />
            {i === index && (
              <div className="absolute -inset-2 border-2 border-white/30 rounded-full animate-ping" />
            )}
            <span className="sr-only">Slide {i + 1}</span>
          </button>
        ))}
      </div>

      {/* Enhanced controls with glow effect */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="group p-4 rounded-2xl bg-linear-to-br from-white/5 to-white/10 backdrop-blur-xl
                   border border-white/20 hover:border-white/40 transition-all duration-500
                   hover:scale-110 active:scale-95 shadow-2xl shadow-black/50
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => setPaused((p) => !p)}
          className="group p-5 rounded-2xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl
                   border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500
                   hover:scale-110 active:scale-95 shadow-2xl shadow-cyan-500/30"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        >
          {paused ? (
            <Play className="w-8 h-8 group-hover:scale-110 transition-transform" />
          ) : (
            <Pause className="w-8 h-8 group-hover:scale-110 transition-transform" />
          )}
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="group p-4 rounded-2xl bg-linear-to-br from-white/5 to-white/10 backdrop-blur-xl
                   border border-white/20 hover:border-white/40 transition-all duration-500
                   hover:scale-110 active:scale-95 shadow-2xl shadow-black/50
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Slide counter with animation */}
      <div className="absolute bottom-10 right-10 z-20">
        <div className="text-sm text-white/70 font-mono flex items-center">
          <span className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mx-3 text-white/30">|</span>
          <span className="text-lg">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Instructions with fade in */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:block">
        <div className="text-xs text-white/40 font-mono flex items-center gap-6">
          <span className="flex items-center gap-2 animate-fadeIn">
            <kbd className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
              ← →
            </kbd>
            <span>Navigate</span>
          </span>
          <span
            className="flex items-center gap-2 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <kbd className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
              SPACE
            </kbd>
            <span>Pause</span>
          </span>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .char {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
