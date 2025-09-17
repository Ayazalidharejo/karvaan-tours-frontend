import React, { useState } from "react";
import { Globe, Star, Users, MessageCircle, Check, Volume2 } from "lucide-react";

const LanguageSection = () => {
  const [selectedLang, setSelectedLang] = useState("English");
  
  const languages = [
    { 
      lang: "English", 
      flag: "🇺🇸", 
      level: "Native",
      guides: 15,
      color: "from-blue-500 to-blue-600",
      accent: "border-blue-200 bg-blue-50"
    },
    { 
      lang: "Japanese", 
      flag: "🇯🇵", 
      level: "Native",
      guides: 12,
      color: "from-red-500 to-pink-500",
      accent: "border-red-200 bg-red-50"
    },
    { 
      lang: "Chinese", 
      flag: "🇨🇳", 
      level: "Fluent",
      guides: 8,
      color: "from-yellow-500 to-orange-500",
      accent: "border-yellow-200 bg-yellow-50"
    },
    { 
      lang: "Korean", 
      flag: "🇰🇷", 
      level: "Fluent",
      guides: 6,
      color: "from-purple-500 to-indigo-500",
      accent: "border-purple-200 bg-purple-50"
    },
    { 
      lang: "Urdu", 
      flag: "🇵🇰", 
      level: "Fluent",
      guides: 4,
      color: "from-green-500 to-emerald-500",
      accent: "border-green-200 bg-green-50"
    }
  ];

  const features = [
    { icon: MessageCircle, title: "Real-time Translation", desc: "Instant communication support" },
    { icon: Users, title: "Cultural Insights", desc: "Local customs & traditions" },
    { icon: Star, title: "Premium Experience", desc: "Certified professional guides" }
  ];
  
  return (
    <section id="languages" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 text-8xl">🌍</div>
        <div className="absolute bottom-20 right-10 text-6xl">💬</div>
        <div className="absolute top-1/2 left-1/4 text-4xl">🗣️</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-4 px-4 py-2 text-sm font-medium border-2 border-blue-200 bg-blue-50 text-blue-700 rounded-full inline-flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            MULTILINGUAL SUPPORT
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Guides Available in Multiple Languages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience Japan with professional guides who speak your language fluently and understand your cultural preferences
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {languages.map((language, index) => (
            <div 
              key={language.lang} 
              className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 rounded-lg ${
                selectedLang === language.lang ? language.accent : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedLang(language.lang)}
            >
              <div className="p-6 text-center relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {language.flag}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {language.lang}
                  </h3>
                  <div className="space-y-2">
                    <div 
                      className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center ${
                        language.level === 'Native' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      <Star className="w-3 h-3 mr-1" />
                      {language.level}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{language.guides} guides</span>
                    </div>
                  </div>
                  
                  {/* Selected indicator */}
                  {selectedLang === language.lang && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Why Choose Our Multilingual Guides?</h3>
            <p className="text-gray-600">Professional expertise in your preferred language</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">45+</div>
            <div className="text-sm text-gray-600">Professional Guides</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Languages Supported</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Language Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            Request Your Language Guide
          </button>
          <p className="text-sm text-gray-500 mt-4">Available 24/7 • Instant confirmation</p>
        </div>
      </div>
    </section>
  );
};

export default LanguageSection;