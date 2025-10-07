export default function Services() {
  const services = [
    {
      icon: "🌐",
      title: "আধুনিক অনলাইন পর্যায়",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🏆",
      title: "মেধা ও যোগ্যতা বিচারক",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: "📚",
      title: "মানসম্পন্ন শিক্ষা ম্যাটেরিয়ালস",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🎯",
      title: "কলেজের বিজ্ঞাপন ফ্রেম",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🎓",
      title: "ইন্টারেক্টিভ অনলাইন ক্লাস",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: "📲",
      title: "AUTO SMS সিস্টেম",
      gradient: "from-rose-500 to-red-500"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "অভিভাবক অনলাইন পোর্টাল",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: "সফটওয়্যার ডেভেলপমেন্ট",
      gradient: "from-violet-500 to-purple-500"
    },
  ];

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <img 
          src="https://uccgroup.com.bd/assets//images/shebabg.webp" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">সেবা প্রকারসমূহ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 text-xs lg:text-base max-w-2xl mx-auto">
            আধুনিক প্রযুক্তি ও মানসম্পন্ন সেবা নিয়ে আমরা আপনার পাশে
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className={`relative z-10 bg-gradient-to-br ${service.gradient} rounded-2xl p-5 mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white text-3xl lg:text-4xl">{service.icon}</span>
              </div>
              
              {/* Title */}
              <p className="relative z-10 text-gray-800 text-base lg:text-lg font-bold leading-snug group-hover:text-indigo-700 transition-colors duration-300">
                {service.title}
              </p>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}