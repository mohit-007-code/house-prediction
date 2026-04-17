import { CheckCircle, TrendingUp, Home, Bed, Bath, Layers, Car, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ResultCard({ price, data }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
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

  const pricePerSqft = (price / parseInt(data.area)).toFixed(2);

  const details = [
    { icon: Home, label: "Area", value: `${data.area} sqft` },
    { icon: Bed, label: "Bedrooms", value: data.bedrooms },
    { icon: Bath, label: "Bathrooms", value: data.bathrooms },
    { icon: Layers, label: "Stories", value: data.stories },
    { icon: Car, label: "Parking", value: data.parking },
  ];

  const formatPrice = (value) => {
    return Math.floor(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div
      className={`mt-10 transition-all duration-1000 transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      {/* Main card */}
      <div className="bg-white border-2 border-black rounded-2xl shadow-2xl overflow-hidden">
        {/* Header section */}
        <div className="bg-black text-white px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full border border-white/30">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
              Prediction Complete
            </span>
          </div>

          <h3 className="text-3xl font-bold leading-tight">
            Estimated <br /> Property Value
          </h3>
        </div>

        {/* Price section */}
        <div className="px-8 py-10 border-b-2 border-black/10">
          <div className="mb-6">
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
              Market Value
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black text-black">
                ₹ {formatPrice(animatePrice)}
              </span>
              <span className="flex items-center gap-1 text-green-600 font-bold text-sm px-3 py-1 bg-green-50 rounded-full">
                <TrendingUp className="w-4 h-4" />
                Market Ready
              </span>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-black/10">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Price Per Sqft
              </p>
              <p className="text-2xl font-bold text-black">
                ₹ {formatPrice(pricePerSqft)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-black/10">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Total Area
              </p>
              <p className="text-2xl font-bold text-black">{data.area} sqft</p>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="px-8 py-8 border-b-2 border-black/10">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span>Property Details</span>
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, idx) => {
              const IconComponent = detail.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 bg-gray-50 border-2 border-black/10 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-default transform ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${0.1 + idx * 0.05}s`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-black/10 group-hover:bg-white group-hover:text-black rounded-lg transition-all">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60 group-hover:opacity-80">
                      {detail.label}
                    </span>
                  </div>
                  <p className="text-xl font-bold group-hover:translate-x-1 transition-transform">
                    {detail.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features section */}
        <div className="px-8 py-8 border-b-2 border-black/10">
          <h4 className="font-bold text-lg mb-4">Additional Features</h4>

          <div className="space-y-2">
            <FeatureTag
              label="Furnishing Status"
              value={data.furnishingstatus}
            />
            <FeatureTag
              label="Main Road Access"
              value={data.mainroad === "yes" ? "Yes" : "No"}
            />
            <FeatureTag
              label="Guest Room"
              value={data.guestroom === "yes" ? "Available" : "Not Available"}
            />
            <FeatureTag
              label="Basement"
              value={data.basement === "yes" ? "Available" : "Not Available"}
            />
            <FeatureTag
              label="Air Conditioning"
              value={data.airconditioning === "yes" ? "Yes" : "No"}
            />
            <FeatureTag
              label="Hot Water Heating"
              value={data.hotwaterheating === "yes" ? "Yes" : "No"}
            />
            <FeatureTag
              label="Preferred Area"
              value={data.prefarea === "yes" ? "Yes" : "No"}
            />
          </div>
        </div>

        {/* Disclaimer section */}
        <div className="px-8 py-6 bg-amber-50 border-t-2 border-amber-200 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900">
              <span className="font-bold">Disclaimer:</span> This estimate is generated using machine learning models trained on historical housing data. Actual market values may vary based on current conditions and other factors.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="mt-6 flex gap-4 justify-center opacity-40">
        <div className="w-2 h-2 bg-black rounded-full" />
        <div className="w-2 h-2 bg-black rounded-full" />
        <div className="w-2 h-2 bg-black rounded-full" />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

// Feature Tag Component
function FeatureTag({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-default">
      <span className="text-sm font-medium opacity-70 group-hover:opacity-90">
        {label}
      </span>
      <span className="font-bold text-sm capitalize group-hover:translate-x-1 transition-transform">
        {value}
      </span>
    </div>
  );
}