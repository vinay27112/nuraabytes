import { useRef, useState, useEffect, useCallback } from "react";

const cards = [
  {
    id: 1,
    title: "Turn ambition into action",
    bulletPoints: [
      "Find guided paths and interactive lessons no matter your skill level",
      "Fuel your growth with in-demand subjects like AI, cloud, data, cybersecurity, and more",
    ],
    image:
      "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-1-desktop.webp",
    color: "from-blue-500 to-cyan-500",
    icon: "🚀",
  },
  {
    id: 2,
    title: "Gain hands-on expertise",
    bulletPoints: [
      "Build portfolio-worthy projects that stand out in a competitive job market",
      "Grow in your career with prep for industry certifications from AWS, Microsoft, CompTIA, ISC2, and more",
    ],
    image:
      "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-2-desktop.webp",
    color: "from-purple-500 to-pink-500",
    icon: "⚡",
  },
  {
    id: 3,
    title: "Transform your team",
    bulletPoints: [
      "Ensure you're meeting your unique business needs with flexible content assignment",
      "Access an exclusive admin dashboard to easily manage and track team progress",
    ],
    image:
      "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-3-desktop.webp",
    color: "from-emerald-500 to-green-500",
    icon: "👥",
  },
  {
    id: 4,
    title: "Go further together",
    bulletPoints: [
      "Get help when you need it, build your network, and learn together with access to exclusive events, clubs, study groups, and more in our global learner community",
    ],
    image:
      "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-4-desktop.webp",
    color: "from-amber-500 to-orange-500",
    icon: "🌍",
  },
];

export default function PolishedHorizontalScroll() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const autoScrollTimer = useRef(null);
  const scrollTimeout = useRef(null);
  const userHasInteracted = useRef(false);

  const totalItems = cards.length;
  const cardWidth = 920;
  const gap = 24;

  // Check scroll boundaries
  const checkBoundaries = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
  }, []);

  // Update current index based on scroll position
  const updateCurrentIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    const clampedIndex = Math.min(Math.max(index, 0), totalItems - 1);

    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
    }

    checkBoundaries();
  }, [currentIndex, cardWidth, gap, totalItems, checkBoundaries]);

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index) => {
      if (index < 0 || index >= totalItems || !scrollRef.current) return;

      userHasInteracted.current = true;

      const targetX = index * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: targetX,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    },
    [cardWidth, gap, totalItems]
  );

  const scrollNext = useCallback(() => {
    if (currentIndex < totalItems - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, scrollToIndex]);

  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  // Mouse wheel scrolling
  const handleWheel = useCallback(
    (e) => {
      if (!scrollRef.current) return;

      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY * 0.8;

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(updateCurrentIndex, 100);

      userHasInteracted.current = true;
    },
    [updateCurrentIndex]
  );

  // Mouse drag handling
  const handleMouseDown = useCallback((e) => {
    if (!scrollRef.current || e.button !== 0) return;

    dragStartX.current = e.clientX;
    scrollStartX.current = scrollRef.current.scrollLeft;
    setIsDragging(true);
    userHasInteracted.current = true;

    document.body.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !scrollRef.current) return;

      const dragDistance = e.clientX - dragStartX.current;
      scrollRef.current.scrollLeft = scrollStartX.current - dragDistance;
      updateCurrentIndex();
    },
    [isDragging, updateCurrentIndex]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = "";

      updateCurrentIndex();
    }
  }, [isDragging, updateCurrentIndex]);

  // Touch handling
  const handleTouchStart = useCallback((e) => {
    if (!scrollRef.current) return;

    const touch = e.touches[0];
    dragStartX.current = touch.clientX;
    scrollStartX.current = scrollRef.current.scrollLeft;
    setIsDragging(true);
    userHasInteracted.current = true;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging || !scrollRef.current) return;

      e.preventDefault();
      const touch = e.touches[0];
      const dragDistance = touch.clientX - dragStartX.current;
      scrollRef.current.scrollLeft = scrollStartX.current - dragDistance;
      updateCurrentIndex();
    },
    [isDragging, updateCurrentIndex]
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      updateCurrentIndex();
    }
  }, [isDragging, updateCurrentIndex]);

  // Auto-scroll functionality
  useEffect(() => {
    if (
      autoScroll &&
      !isDragging &&
      !isHovering &&
      !userHasInteracted.current
    ) {
      autoScrollTimer.current = setInterval(() => {
        if (currentIndex < totalItems - 1) {
          scrollToIndex(currentIndex + 1);
        } else {
          scrollToIndex(0);
        }
      }, 4000);
    } else {
      clearInterval(autoScrollTimer.current);
    }

    return () => clearInterval(autoScrollTimer.current);
  }, [
    autoScroll,
    isDragging,
    isHovering,
    currentIndex,
    totalItems,
    scrollToIndex,
  ]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          scrollPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          scrollNext();
          break;
        case " ":
          e.preventDefault();
          if (e.target === document.body) {
            scrollNext();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  // Setup event listeners
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    updateCurrentIndex();

    const handleScroll = () => {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(updateCurrentIndex, 50);
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("scroll", handleScroll);

      clearInterval(autoScrollTimer.current);
      clearTimeout(scrollTimeout.current);
      document.body.style.userSelect = "";
    };
  }, [
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    updateCurrentIndex,
  ]);

  // Initialize boundaries
  useEffect(() => {
    checkBoundaries();
  }, [checkBoundaries]);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Interactive Features
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Scroll horizontally to explore
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInstructions(true)}
                className="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
              >
                Help
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                <div
                  className={`w-2 h-2 rounded-full ${
                    autoScroll ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm text-gray-700">
                  {autoScroll ? "Auto-scroll" : "Manual"}
                </span>
              </div>

              <button
                onClick={() => setAutoScroll(!autoScroll)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  autoScroll
                    ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {autoScroll ? "Stop Auto" : "Start Auto"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  How to Navigate
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    ←→
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Navigation Buttons
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Use arrows or click buttons to move between cards
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    🎮
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Scroll & Drag</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Use mouse wheel or click and drag to scroll horizontally
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    ⌨️
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Keyboard</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Use arrow keys or space bar to navigate
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className="relative"
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Navigation Arrows - Enhanced */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20">
          <button
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            className={`absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto w-12 h-12 rounded-full bg-white border shadow-lg flex items-center justify-center transition-all ${
              !canScrollLeft
                ? "opacity-0 cursor-not-allowed"
                : "opacity-100 text-gray-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-xl border-gray-300 hover:scale-105"
            }`}
            aria-label="Previous card"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollRight}
            className={`absolute right-6 top-1/2 -translate-y-1/2 pointer-events-auto w-12 h-12 rounded-full bg-white border shadow-lg flex items-center justify-center transition-all ${
              !canScrollRight
                ? "opacity-0 cursor-not-allowed"
                : "opacity-100 text-gray-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-xl border-gray-300 hover:scale-105"
            }`}
            aria-label="Next card"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Progress Indicator - Top */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-full border border-gray-200 shadow-sm">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`w-8 h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to card ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className={`w-full h-screen overflow-x-auto overflow-y-hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="flex h-full items-center pl-4 md:pl-[max(1rem,min(calc(50vw-460px),calc(100vw-920px)))] pr-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="flex-shrink-0 mx-3"
                style={{ width: `${cardWidth}px` }}
              >
                <div
                  className={`h-[540px] rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "border-blue-100 shadow-xl bg-white"
                      : "border-gray-100 shadow-lg bg-white/90"
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-7 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl shadow-md`}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {card.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                            Step {card.id}
                          </span>
                          <span className="text-sm text-gray-500">
                            {index + 1} of {totalItems}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-2 h-[calc(540px-96px)]">
                    {/* Left Column - Content */}
                    <div className="p-7 overflow-y-auto">
                      <div className="space-y-5">
                        {card.bulletPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mt-0.5 shadow-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            </div>
                            <p className="text-gray-700 leading-relaxed text-[15px]">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 pt-6 border-t border-gray-100">
                        <button
                          onClick={() => console.log("Learn more:", card.title)}
                          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover opacity-90"
                        loading="lazy"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-10`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Card Indicator - Bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-8 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 shadow-lg">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => scrollToIndex(idx)}
                className={`flex flex-col items-center gap-3 transition-all ${
                  idx === currentIndex
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    idx === currentIndex
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    idx === currentIndex ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  {card.title.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
