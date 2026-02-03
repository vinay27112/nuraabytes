import React, { memo } from "react";
import Hero from "../components/animations/Hero";
import Belt from "../components/animations/Belt";
import TechnologyContainer from "../components/TechnologyContainer";
import Scroller from "../components/animations/Scroller";
import Hover from "../components/animations/Hover";
import Test from "../components/animations/Test";

const Home = memo(() => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Welcome Section */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/30 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Welcome to NuraBytes
              </h2>
              <div className="section-accent"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl font-medium">
              Discover a world of cutting-edge technology and innovative
              solutions at NuraBytes. We are dedicated to providing top-notch
              services and products that cater to your digital needs. Explore
              our offerings and join us on a journey towards a smarter future.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Container */}
      <TechnologyContainer />

      {/* Skills Belt Section */}
      <Belt />

      {/* Explore More Section */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-purple-50/30 via-indigo-50/20 to-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Explore More
              </h2>
              <div className="section-accent"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl font-medium">
              Dive deeper into our platform to uncover a variety of features
              designed to enhance your experience. From personalized solutions
              to comprehensive support, NuraBytes is here to empower your
              digital journey. Start exploring today and see how we can make a
              difference in your tech world.
            </p>
          </div>
        </div>
      </section>
      <Test />

      {/* Interactive Scroller Section <Scroller /> */}

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Join NuraBytes Today
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed max-w-3xl mx-auto font-medium">
            Become a part of the NuraBytes community and take advantage of our
            innovative solutions. Sign up now to stay updated with the latest in
            technology and enjoy exclusive benefits tailored just for you.
          </p>
          <button className="px-12 py-5 text-lg font-semibold rounded-xl bg-white text-indigo-600 shadow-xl hover:shadow-2xl hover:shadow-white/50 hover:scale-105 active:scale-95 transition-all duration-300 transform">
            Get Started
          </button>
        </div>
      </section>

      {/* Hover/Video Section */}
      <Hover />

      {/* Stay Connected Section */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-white via-indigo-50/20 to-gray-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Stay Connected
              </h2>
              <div className="section-accent"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl font-medium">
              Follow us on social media and subscribe to our newsletter to stay
              informed about the latest updates, news, and exclusive offers from
              NuraBytes. Connect with us and be a part of our growing community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
