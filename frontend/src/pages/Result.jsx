import { useLocation, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home,
  Bed,
  Bath,
  Layers,
  Car,
  CheckCircle,
  ArrowRight,
  Share2,
  TrendingUp,
  Copy,
  Zap,
} from "lucide-react";

export default function Result() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [animatePrice, setAnimatePrice] = useState(0);
  const [copied, setCopied] = useState(false);

  // Protect direct access
  if (!location.state) {
    return <Navigate to="/predict" />;
  }

  const { price, form } = location.state;

  useEffect(() => {
    setIsVisible(true);

    // Generate confetti
    const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
      size: Math.random() * 8 + 4,
    }));
    setConfetti(confettiPieces);

    // Animate price counter
    let start = 0;
    const increment = Math.ceil(price / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= price) {
        setAnimatePrice(price);
        clearInterval(timer);
      } else {
        setAnimatePrice(start);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [price]);

  const handleCopyPrice = () => {
    navigator.clipboard.writeText(formatPrice(price));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (value) => {
    return Math.floor(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  const pricePerSqft = (price / parseInt(form.area)).toFixed(2);

  const details = [
    { icon: Home, label: "Area", value: `${form.area} sqft` },
    { icon: Bed, label: "Bedrooms", value: form.bedrooms },
    { icon: Bath, label: "Bathrooms", value: form.bathrooms },
    { icon: Layers, label: "Stories", value: form.stories },
    { icon: Car, label: "Parking", value: form.parking },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden relative">
      {/* Confetti animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed pointer-events-none"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            animation: `fall ${piece.duration}s linear forwards`,
            animationDelay: `${piece.delay}s`,
            zIndex: 10,
          }}
        >
          <div
            className="bg-black rounded-full opacity-80"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
            }}
          />
        </div>
      ))}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 font-semibold group"
          >
            <Home className="w-5 h-5" />
            PropertyPrice AI
          </Link>
          <button 
            onClick={handleCopyPrice}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 group"
            title="Copy price"
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: "0.2s",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Prediction Complete
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            Your Property's <br />
            <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              Estimated Market Value
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based on comprehensive ML analysis of property features and market data
          </p>
        </div>

        {/* Main Price Card */}
        <div
          className={`mb-16 p-12 bg-black text-white rounded-2xl border-2 border-black transition-all duration-1000 transform ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
          style={{
            transitionDelay: "0.4s",
          }}
        >
          <p className="text-sm font-bold opacity-70 uppercase tracking-wider mb-4">
            Estimated Market Value
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="text-6xl md:text-7xl font-black mb-2">
                ₹ {formatPrice(animatePrice)}
              </div>
              <p className="text-white/60 text-sm">
                Based on {form.area} sqft property
              </p>
            </div>

            <button
              onClick={handleCopyPrice}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/30 hover:bg-white/10 ${
                copied ? "bg-green-500/20 border-green-500" : ""
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Price"}
            </button>
          </div>

          {/* Price Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="space-y-2">
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider">
                Price Per Sqft
              </p>
              <p className="text-3xl font-bold">₹ {formatPrice(pricePerSqft)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider">
                Total Area
              </p>
              <p className="text-3xl font-bold">{form.area} sqft</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider">
                Market Status
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-lg font-bold">Market Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Property Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {details.map((detail, idx) => {
              const IconComponent = detail.icon;
              return (
                <div
                  key={idx}
                  className={`group p-6 bg-white border-2 border-black/10 rounded-xl hover:border-black hover:bg-black hover:text-white transition-all duration-500 cursor-default transform ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${0.6 + idx * 0.1}s`,
                  }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-black/5 group-hover:bg-white/20 rounded-lg transition-all duration-300">
                      <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <p className="text-xs font-bold opacity-60 group-hover:opacity-80 uppercase tracking-wider text-center mb-2">
                    {detail.label}
                  </p>
                  <p className="text-2xl font-bold text-center">
                    {detail.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Amenities */}
          <div
            className={`p-8 bg-gray-50 rounded-xl border border-black/10 transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "1.2s",
            }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Property Amenities
            </h3>
            <div className="space-y-3">
              <FeatureTag
                label="Furnishing Status"
                value={form.furnishingstatus}
              />
              <FeatureTag
                label="Main Road Access"
                value={form.mainroad === "yes" ? "Yes" : "No"}
              />
              <FeatureTag
                label="Guest Room"
                value={form.guestroom === "yes" ? "Available" : "Not Available"}
              />
              <FeatureTag
                label="Basement"
                value={form.basement === "yes" ? "Available" : "Not Available"}
              />
              <FeatureTag
                label="Air Conditioning"
                value={form.airconditioning === "yes" ? "Yes" : "No"}
              />
              <FeatureTag
                label="Hot Water Heating"
                value={form.hotwaterheating === "yes" ? "Yes" : "No"}
              />
              <FeatureTag
                label="Preferred Area"
                value={form.prefarea === "yes" ? "Yes" : "No"}
              />
            </div>
          </div>

          {/* Insights & Disclaimer */}
          <div className="space-y-6">
            {/* Insights */}
            <div
              className={`p-8 bg-blue-50 rounded-xl border border-blue-200 transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "1.3s",
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-blue-900">
                💡 Key Insights
              </h3>
              <ul className="space-y-3 text-blue-800 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Price per sqft: <strong>₹{formatPrice(pricePerSqft)}</strong>
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Property has <strong>{Object.values(form).filter(v => v === "yes").length}</strong> premium features
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Located in <strong>{form.prefarea === "yes" ? "preferred" : "standard"}</strong> area
                  </span>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div
              className={`p-6 bg-amber-50 rounded-xl border border-amber-200 transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "1.4s",
              }}
            >
              <p className="text-sm text-amber-900">
                <span className="font-semibold">Disclaimer:</span> This is an estimated price generated using machine learning models trained on historical data. Actual market values may vary based on current conditions, location specifics, and other factors.
              </p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: "1.5s",
          }}
        >
          <InfoCard
            icon={TrendingUp}
            title="Market Analysis"
            description="Prediction based on current market trends and comparable property data"
          />
          <InfoCard
            icon={CheckCircle}
            title="Data Driven"
            description="Built using advanced ML models trained on thousands of properties"
          />
          <InfoCard
            icon={Home}
            title="Reliable Insights"
            description="Get accurate valuations to make informed decisions about your property"
          />
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: "1.6s",
          }}
        >
          <Link
            to="/predict"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-black/30 hover:scale-105 active:scale-95 group"
          >
            <span>Predict Another Property</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 group"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 mb-4">
            © 2024 PropertyPrice AI. Powered by Advanced Machine Learning
          </p>
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

// Feature Tag Component
function FeatureTag({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-black/5 hover:border-black/20 transition-all duration-300">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="font-semibold text-gray-900 capitalize bg-gray-100 px-3 py-1 rounded-full text-xs">
        {value}
      </span>
    </div>
  );
}

// Info Card Component
function InfoCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 bg-white border-2 border-black/10 rounded-xl hover:border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer">
      <div className="p-3 bg-black/5 rounded-lg w-fit mb-4 group-hover:bg-white/20 transition-all duration-300">
        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 group-hover:text-white/80 text-sm leading-relaxed transition-colors">
        {description}
      </p>
    </div>
  );
}