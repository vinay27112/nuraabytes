import React, { memo } from "react";
import { Link } from "react-router-dom";

const technologies = [
  "HealthCare",
  "Finance",
  "Technology",
  "Energy",
  "Government",
];

const TechnologyContainer = memo(() => {
  const techColors = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-indigo-500 to-purple-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
  ];

  return (
    <div className="relative w-full py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Explore Technologies
          </h2>
          <div className="section-accent mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl font-medium">
            Discover our specialized solutions across different industries and domains
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <Link 
              key={tech} 
              to={`/${tech.toLowerCase()}`} 
              className="group relative"
            >
              <div
                className={`btn-tech bg-gradient-to-br ${techColors[index % techColors.length]} 
                           text-white font-semibold text-lg md:text-xl
                           relative overflow-hidden`}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {tech}
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

TechnologyContainer.displayName = 'TechnologyContainer';

export default TechnologyContainer;
