import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Home,
  Bed,
  Bath,
  Car,
  Zap,
  Droplets,
  Wind,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";

export default function Predict() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const [form, setForm] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    parking: "",
    mainroad: "yes",
    guestroom: "no",
    basement: "no",
    hotwaterheating: "no",
    airconditioning: "yes",
    prefarea: "yes",
    furnishingstatus: "furnished",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleNextStep = () => {
    const errors = validateStep1();
    if (errors.length === 0) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setValidationErrors(errors);
    }
  };

  const handlePrevStep = () => {
    setValidationErrors([]);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation function for step 1
  const validateStep1 = () => {
    const errors = [];

    if (!form.area) {
      errors.push("Area is required");
    } else if (parseInt(form.area) < 250) {
      errors.push("Minimum area must be 250 sqft");
    } else if (parseInt(form.area) > 1000000) {
      errors.push("Area cannot exceed 1,000,000 sqft");
    }

    if (!form.bedrooms) {
      errors.push("Bedrooms is required");
    } else if (parseInt(form.bedrooms) < 1) {
      errors.push("Minimum 1 bedroom required");
    } else if (parseInt(form.bedrooms) > 20) {
      errors.push("Maximum 20 bedrooms allowed");
    }

    if (!form.bathrooms) {
      errors.push("Bathrooms is required");
    } else if (parseInt(form.bathrooms) < 1) {
      errors.push("Minimum 1 bathroom required");
    } else if (parseInt(form.bathrooms) > 20) {
      errors.push("Maximum 20 bathrooms allowed");
    }

    if (!form.stories) {
      errors.push("Stories is required");
    } else if (parseInt(form.stories) < 1) {
      errors.push("Minimum 1 story required");
    } else if (parseInt(form.stories) > 15) {
      errors.push("Maximum 15 stories allowed");
    }

    if (!form.parking) {
      errors.push("Parking is required");
    } else if (parseInt(form.parking) < 1 || parseInt(form.parking) > 5) {
      errors.push("Parking must be between 1-5 vehicles");
    }

    return errors;
  };

  const isStep1Valid = 
    form.area && 
    parseInt(form.area) >= 250 &&
    parseInt(form.area) <= 1000000 &&
    form.bedrooms && 
    parseInt(form.bedrooms) >= 1 &&
    parseInt(form.bedrooms) <= 20 &&
    form.bathrooms && 
    parseInt(form.bathrooms) >= 1 &&
    parseInt(form.bathrooms) <= 20 &&
    form.stories && 
    parseInt(form.stories) >= 1 &&
    parseInt(form.stories) <= 15 &&
    form.parking && 
    parseInt(form.parking) >= 1 &&
    parseInt(form.parking) <= 5;

  const isStep2Valid = true; // All toggle fields have defaults
  const isFormValid = isStep1Valid && isStep2Valid && form.furnishingstatus;

  const predictPrice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationErrors([]);

    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/predict/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          area: Number(form.area),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          stories: Number(form.stories),
          parking: Number(form.parking),
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      navigate("/result", {
        state: {
          price: data.predicted_price,
          form: form,
        },
      });
    } catch {
      setError("Backend server not responding. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 font-semibold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back Home
          </Link>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                      currentStep >= step
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-8 h-0.5 mx-1 transition-all duration-500 ${
                        currentStep > step ? "bg-black" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left sidebar - Progress info */}
          <div
            className={`hidden lg:block transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="sticky top-24">
              <h3 className="text-2xl font-bold mb-8">
                Property <br /> Details
              </h3>

              {/* Step information */}
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Basic Info",
                    desc: "Area, bedrooms, bathrooms",
                  },
                  {
                    step: 2,
                    title: "Amenities",
                    desc: "Features and facilities",
                  },
                  {
                    step: 3,
                    title: "Final Details",
                    desc: "Furnishing and review",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-4 rounded-lg border-2 transition-all duration-500 cursor-pointer ${
                      currentStep === item.step
                        ? "border-black bg-black text-white"
                        : currentStep > item.step
                        ? "border-black/30 bg-gray-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="text-sm font-bold opacity-75 mb-1">
                      STEP {item.step}
                    </div>
                    <h4
                      className={`font-bold transition-all ${
                        currentStep > item.step
                          ? "opacity-75"
                          : currentStep === item.step
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-sm mt-1 transition-all ${
                        currentStep > item.step
                          ? "opacity-60"
                          : currentStep === item.step
                          ? "opacity-90"
                          : "opacity-40"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Filled fields indicator */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-black/10">
                <h4 className="font-bold mb-3 text-sm">FORM PROGRESS</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {form.area && parseInt(form.area) >= 250 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300" />
                    )}
                    <span className="opacity-60">Area (min 250 sqft)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {form.bedrooms && parseInt(form.bedrooms) >= 1 && form.bathrooms && parseInt(form.bathrooms) >= 1 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300" />
                    )}
                    <span className="opacity-60">Bedrooms & Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {form.furnishingstatus ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300" />
                    )}
                    <span className="opacity-60">Furnishing Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={predictPrice} className="space-y-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div
                  className={`space-y-6 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Basic Information</h2>
                    <p className="text-gray-600">
                      Tell us about the property dimensions
                    </p>
                  </div>

                  {/* Validation Errors */}
                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                      {validationErrors.map((error, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{error}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Area */}
                  <FormInput
                    icon={<Home className="w-5 h-5" />}
                    label="Area (sqft)"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="Minimum 250 sqft"
                    focused={focusedField === "area"}
                    onFocus={() => setFocusedField("area")}
                    onBlur={() => setFocusedField(null)}
                    min="250"
                    max="1000000"
                    hint="Minimum 250 sqft, Maximum 1,000,000 sqft"
                  />

                  {/* Bedrooms & Bathrooms */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormInput
                      icon={<Bed className="w-5 h-5" />}
                      label="Bedrooms"
                      name="bedrooms"
                      value={form.bedrooms}
                      onChange={handleChange}
                      placeholder="e.g., 4"
                      focused={focusedField === "bedrooms"}
                      onFocus={() => setFocusedField("bedrooms")}
                      onBlur={() => setFocusedField(null)}
                      min="1"
                      max="20"
                      hint="1-20 bedrooms"
                    />
                    <FormInput
                      icon={<Bath className="w-5 h-5" />}
                      label="Bathrooms"
                      name="bathrooms"
                      value={form.bathrooms}
                      onChange={handleChange}
                      placeholder="e.g., 2"
                      focused={focusedField === "bathrooms"}
                      onFocus={() => setFocusedField("bathrooms")}
                      onBlur={() => setFocusedField(null)}
                      min="1"
                      max="20"
                      hint="1-20 bathrooms"
                    />
                  </div>

                  {/* Stories & Parking */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormInput
                      label="Stories"
                      name="stories"
                      value={form.stories}
                      onChange={handleChange}
                      placeholder="e.g., 2"
                      focused={focusedField === "stories"}
                      onFocus={() => setFocusedField("stories")}
                      onBlur={() => setFocusedField(null)}
                      min="1"
                      max="15"
                      hint="1-15 stories"
                    />
                    <FormInput
                      icon={<Car className="w-5 h-5" />}
                      label="Parking (Spaces)"
                      name="parking"
                      value={form.parking}
                      onChange={handleChange}
                      placeholder="e.g., 2"
                      focused={focusedField === "parking"}
                      onFocus={() => setFocusedField("parking")}
                      onBlur={() => setFocusedField(null)}
                      min="1"
                      max="5"
                      hint="1-5 parking spaces"
                    />
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStep1Valid}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                        isStep1Valid
                          ? "bg-black text-white hover:bg-gray-900 hover:shadow-lg"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Next Step
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Amenities */}
              {currentStep === 2 && (
                <div
                  className={`space-y-6 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Amenities & Features</h2>
                    <p className="text-gray-600">
                      Select the amenities available in the property
                    </p>
                  </div>

                  {/* Toggle switches */}
                  <div className="space-y-4">
                    <ToggleInput
                      icon={<Home className="w-5 h-5" />}
                      label="Main Road Access"
                      name="mainroad"
                      value={form.mainroad}
                      onChange={handleChange}
                      description="Property faces a main road"
                    />
                    <ToggleInput
                      icon={<Bed className="w-5 h-5" />}
                      label="Guest Room"
                      name="guestroom"
                      value={form.guestroom}
                      onChange={handleChange}
                      description="Dedicated guest bedroom"
                    />
                    <ToggleInput
                      icon={<Home className="w-5 h-5" />}
                      label="Basement"
                      name="basement"
                      value={form.basement}
                      onChange={handleChange}
                      description="Underground basement space"
                    />
                    <ToggleInput
                      icon={<Droplets className="w-5 h-5" />}
                      label="Hot Water Heating"
                      name="hotwaterheating"
                      value={form.hotwaterheating}
                      onChange={handleChange}
                      description="Central hot water system"
                    />
                    <ToggleInput
                      icon={<Wind className="w-5 h-5" />}
                      label="Air Conditioning"
                      name="airconditioning"
                      value={form.airconditioning}
                      onChange={handleChange}
                      description="Central AC system"
                    />
                    <ToggleInput
                      icon={<Zap className="w-5 h-5" />}
                      label="Preferred Area"
                      name="prefarea"
                      value={form.prefarea}
                      onChange={handleChange}
                      description="Located in a premium neighborhood"
                    />
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 border-2 border-black text-black hover:bg-gray-50"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-black text-white hover:bg-gray-900 hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                      Next Step
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Final Details */}
              {currentStep === 3 && (
                <div
                  className={`space-y-6 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Final Details</h2>
                    <p className="text-gray-600">
                      Complete your property information and get the prediction
                    </p>
                  </div>

                  {/* Furnishing Status */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm font-bold text-gray-700 mb-3 block">
                        FURNISHING STATUS
                      </span>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { value: "furnished", label: "Furnished" },
                          {
                            value: "semi-furnished",
                            label: "Semi-Furnished",
                          },
                          { value: "unfurnished", label: "Unfurnished" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                              form.furnishingstatus === option.value
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="furnishingstatus"
                              value={option.value}
                              checked={form.furnishingstatus === option.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className="font-semibold">{option.label}</div>
                          </label>
                        ))}
                      </div>
                    </label>
                  </div>

                  {/* Summary card */}
                  <div className="bg-gray-50 border border-black/10 rounded-lg p-6 my-8">
                    <h3 className="font-bold text-lg mb-4">Summary</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="opacity-60">Area:</span>
                        <span className="font-semibold ml-2">{form.area} sqft</span>
                      </div>
                      <div>
                        <span className="opacity-60">Bedrooms:</span>
                        <span className="font-semibold ml-2">{form.bedrooms}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Bathrooms:</span>
                        <span className="font-semibold ml-2">{form.bathrooms}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Stories:</span>
                        <span className="font-semibold ml-2">{form.stories}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Parking:</span>
                        <span className="font-semibold ml-2">{form.parking}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Main Road Access:</span>
                        <span className="font-semibold ml-2 capitalize">{form.mainroad}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Guest Room:</span>
                        <span className="font-semibold ml-2 capitalize">{form.guestroom}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Basement:</span>
                        <span className="font-semibold ml-2 capitalize">{form.basement}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Hot Water Heating:</span>
                        <span className="font-semibold ml-2 capitalize">{form.hotwaterheating}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Air Conditioning:</span>
                        <span className="font-semibold ml-2 capitalize">{form.airconditioning}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Preferred Area:</span>
                        <span className="font-semibold ml-2 capitalize">{form.prefarea}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Furnishing:</span>
                        <span className="font-semibold ml-2 capitalize">
                          {form.furnishingstatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={loading}
                      className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 border-2 border-black text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || loading}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                        isFormValid && !loading
                          ? "bg-black text-white hover:bg-gray-900 hover:shadow-lg"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Predicting...
                        </>
                      ) : (
                        <>
                          Get Price Prediction
                          <span className="group-hover:scale-110 transition-transform">🎯</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Smooth scroll behavior */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>
    </div>
  );
}

// Form Input Component with hint
const FormInput = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  focused,
  onFocus,
  onBlur,
  min,
  max,
  hint,
}) => {
  const numValue = value ? parseInt(value) : 0;
  const isValid =
    !value ||
    (min && numValue >= parseInt(min) && (max ? numValue <= parseInt(max) : true));

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-3">
        {label}
      </label>
      <div
        className={`relative flex items-center transition-all duration-300 border-2 rounded-lg overflow-hidden ${
          focused
            ? "border-black bg-black/5 shadow-lg"
            : isValid
            ? "border-gray-200 hover:border-gray-300"
            : "border-red-300 bg-red-50/50 hover:border-red-400"
        }`}
      >
        {icon && (
          <div
            className={`ml-4 transition-all duration-300 ${
              focused ? "text-black scale-110" : isValid ? "text-gray-400" : "text-red-600"
            }`}
          >
            {icon}
          </div>
        )}
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          required
          className="flex-1 px-4 py-3 bg-transparent outline-none placeholder-gray-400 text-black font-medium"
        />
      </div>
      {hint && (
        <p className={`text-xs mt-2 transition-colors ${isValid ? "text-gray-500" : "text-red-600"}`}>
          {hint}
        </p>
      )}
    </div>
  );
};

// Toggle Input Component
const ToggleInput = ({
  icon,
  label,
  name,
  value,
  onChange,
  description,
}) => {
  const isYes = value === "yes";

  const handleToggleClick = () => {
    const newValue = isYes ? "no" : "yes";
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <div
      onClick={handleToggleClick}
      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 group ${
        isYes
          ? "border-black bg-black/5"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {icon && (
            <div
              className={`transition-colors ${
                isYes ? "text-black" : "text-gray-600 group-hover:text-black"
              }`}
            >
              {icon}
            </div>
          )}
          <span className="font-semibold">{label}</span>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Custom toggle switch */}
      <div
        className={`flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 ${
          isYes ? "bg-black" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 mt-0.5 ${
            isYes ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </div>

      <input type="hidden" name={name} value={value} />
    </div>
  );
};