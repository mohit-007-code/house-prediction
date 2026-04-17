import { Link } from "react-router-dom";
import { ChevronRight, Home as HomeIcon, TrendingUp, Zap, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroImage1 from "../assets/hero-house.jpg";
import heroImage2 from "../assets/hero-house2.jpg";
import heroImage3 from "../assets/hero-house3.jpg";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    howItWorks: false,
    cta: false,
  });

  const heroImages = [heroImage1, heroImage2, heroImage3];
  const sectionRefs = {
    features: useRef(null),
    howItWorks: useRef(null),
    cta: useRef(null),
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll reveal animation with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section;
          setVisibleSections((prev) => ({
            ...prev,
            [sectionName]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Auto scroll images every 5 seconds
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll, heroImages.length]);

  // Resume auto scroll after 10 seconds of manual interaction
  useEffect(() => {
    if (autoScroll) return;

    const timeout = setTimeout(() => {
      setAutoScroll(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [autoScroll]);

  const handlePrevImage = () => {
    setAutoScroll(false);
    setCurrentImageIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setAutoScroll(false);
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const goToImage = (index) => {
    setAutoScroll(false);
    setCurrentImageIndex(index);
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Accurate Predictions",
      description: "Advanced ML algorithms provide precise price estimates based on property characteristics",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get real-time valuations in seconds with our optimized prediction engine",
    },
    {
      icon: HomeIcon,
      title: "Comprehensive Analysis",
      description: "Detailed insights into how each feature impacts your property's market value",
    },
  ];

  return (
    <div className="bg-white text-black overflow-hidden">
      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background image carousel with smooth transitions - MUCH BRIGHTER */}
        {heroImages.map((image, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
              opacity: idx === currentImageIndex ? 1 : 0,
              zIndex: idx === currentImageIndex ? 1 : 0,
            }}
          />
        ))}

        {/* Lighter overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/30 z-2" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20 z-2" />

        {/* Subtle background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-900/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse z-2" />
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-900/10 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse z-2" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Animated badge - improved visibility */}
          <div
            className={`inline-block mb-8 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/30 transition-all duration-1000 transform hover:bg-white/20 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              transitionDelay: "0.1s",
            }}
          >
            ✨ Powered by Advanced AI
          </div>

          {/* Main heading with staggered animation - improved text styling */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg">
            {["Find", "Your", "Perfect", "Property", "Price"].map((word, idx) => (
              <span
                key={idx}
                className={`inline-block transition-all duration-1000 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${0.15 + idx * 0.1}s`,
                }}
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subtitle with fade-in animation - improved visibility */}
          <p
            className={`text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 drop-shadow-md ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "0.65s",
            }}
          >
            Leverage cutting-edge machine learning to get accurate house price predictions instantly. Make data-driven decisions with confidence.
          </p>

          {/* CTA Button with scale animation - improved styling */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
            style={{
              transitionDelay: "0.8s",
            }}
          >
            <Link
              to="/predict"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95 border border-white group"
            >
              <span>Start Predicting</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Previous Button - improved visibility */}
        <button
          onClick={handlePrevImage}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-all duration-300 group border border-white/40 hover:border-white/80 shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Next Button - improved visibility */}
        <button
          onClick={handleNextImage}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-all duration-300 group border border-white/40 hover:border-white/80 shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Image Indicators - improved visibility */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3 bg-white/10 px-4 py-3 rounded-full backdrop-blur-md border border-white/20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                idx === currentImageIndex
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDelay: "1s",
          }}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={sectionRefs.features}
        data-section="features"
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header with scroll animation */}
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 transform ${
                visibleSections.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Why Choose Us
            </h2>
            <div 
              className={`w-16 h-1 bg-black rounded-full mx-auto mb-6 transition-all duration-1000 transform ${
                visibleSections.features
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
            <p 
              className={`text-gray-600 text-lg max-w-2xl mx-auto transition-all duration-1000 transform ${
                visibleSections.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visibleSections.features ? "0.2s" : "0s",
              }}
            >
              Our intelligent prediction system combines advanced machine learning with real market data
            </p>
          </div>

          {/* Features grid with staggered scroll animation */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-8 rounded-xl border-2 border-black/10 transition-all duration-1000 transform cursor-pointer group ${
                    visibleSections.features
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${
                    hoveredCard === idx
                      ? "bg-black text-white border-black shadow-2xl -translate-y-2"
                      : "bg-white hover:border-black/20"
                  }`}
                  style={{
                    transitionDelay: visibleSections.features
                      ? `${0.1 + idx * 0.15}s`
                      : "0s",
                  }}
                >
                  {/* Icon container */}
                  <div
                    className={`inline-block p-4 rounded-lg mb-6 transition-all duration-500 ${
                      hoveredCard === idx
                        ? "bg-white/20"
                        : "bg-black/5 group-hover:bg-black/10"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 transition-all duration-500 ${
                        hoveredCard === idx
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p
                    className={`transition-all duration-300 ${
                      hoveredCard === idx
                        ? "text-white/80"
                        : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* Animated arrow */}
                  <div
                    className={`mt-6 inline-flex transition-all duration-500 transform ${
                      hoveredCard === idx
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={sectionRefs.howItWorks}
        data-section="howItWorks"
        className="py-20 px-6 bg-black text-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 transform ${
                visibleSections.howItWorks
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              How It Works
            </h2>
            <div 
              className={`w-16 h-1 bg-white rounded-full mx-auto transition-all duration-1000 transform ${
                visibleSections.howItWorks
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </div>

          {/* Steps with scroll animation */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Enter Details", desc: "Provide property information" },
              { num: "02", title: "Analyze", desc: "AI processes the data" },
              { num: "03", title: "Calculate", desc: "ML models compute value" },
              { num: "04", title: "Discover", desc: "Get your price estimate" },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`relative group transition-all duration-1000 transform ${
                  visibleSections.howItWorks
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: visibleSections.howItWorks
                    ? `${0.1 + idx * 0.12}s`
                    : "0s",
                }}
              >
                {/* Step number */}
                <div className="text-6xl font-bold text-white/10 group-hover:text-white/20 transition-all duration-500 mb-4">
                  {step.num}
                </div>

                {/* Step content */}
                <div className="border-l-2 border-white/20 pl-6 py-4 group-hover:border-white/50 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-all duration-300">
                    {step.desc}
                  </p>
                </div>

                {/* Connector line */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 -right-6 w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={sectionRefs.cta}
        data-section="cta"
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 transform ${
              visibleSections.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Ready to Predict Your Property Value?
          </h2>
          <p 
            className={`text-gray-600 text-lg mb-10 max-w-2xl mx-auto transition-all duration-1000 transform ${
              visibleSections.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visibleSections.cta ? "0.2s" : "0s",
            }}
          >
            Join thousands of property buyers, sellers, and investors who trust our AI-powered predictions.
          </p>

          <div
            className={`transition-all duration-1000 transform ${
              visibleSections.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visibleSections.cta ? "0.4s" : "0s",
            }}
          >
            <Link
              to="/predict"
              className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 active:scale-95 border border-black group"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Get Started Now</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">PropertyPrice AI</h3>
              <p className="text-white/60">
                Advanced machine learning for accurate property valuations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-white/60">
              © 2026 PropertyPrice AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}