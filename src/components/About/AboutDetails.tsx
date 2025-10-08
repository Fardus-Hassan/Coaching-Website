import PageHeader from "../Utility/PageHeader";

export default function AboutDetails() {
  return (
    <div className="min-h-screen bg-gray-50 lg:mt-10">
      <PageHeader title="UCC সম্পর্কে" />
      {/* Main Content */}
      <main className="">
        {/* About Section */}
        <section className="mb-20 mt-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            UCC-র <span className="text-indigo-600">যাত্রা শুরুর</span>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2"></div>
          </h2>

          <div className="max-w-7xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              UCC-র প্রতিষ্ঠাতা ও চেয়ারম্যান জনাব ড. এম. এ. হালিম পাটওয়ারী
              চান্দপুর জেলার হাজীগঞ্জ থানার তাভার গ্রামের কৃতি সন্তান। তিনি
              ১৯৮২-৮৩ সেশনে ঢাকা বিশ্ববিদ্যালয়ে ভর্তি হন এবং মুজসীন হলের আবাসিক
              ছাত্র বিসেবে ৬১৯ নং রুমে অবস্থান করেন। ঢাকা বিশ্ববিদ্যালয়ে ভর্তি
              হওয়ার পরপরই তিনি দেশের সেরা কলেজসমূহ ও বিশ্ববিদ্যালয়সমূহ ভর্তি
              যথাযথ কথা অনুধাবন করে ১৯৮৩ সাল থেকে বাংলিশ উদ্যোগ মুজসীন হলেই
              ন্যাচে ব্যাচ বিশ্ববিদ্যালয়ে ভর্তিচ্ছু ছাত্র-ছাত্রীদের ভর্তি কোচে
              সহযোগিতা শুরু করেন। এভাবে ১৯৮৫ ইং সাল পর্যন্ত হলের অতেঘরে
              ছাত্র-ছাত্রীদের বিশ্ববিদ্যালয়ে ভর্তির ব্যাপারে বিভিন্নভাবে
              সহায়তা করে আসছিলেন এবং আধিকাংশ ছাত্র-ছাত্রী কৃতিত্বের সাথে ঢাকা
              বিশ্ববিদ্যালয়ের বিভিন্ন বিভাগে ভর্তির সুযোগ লাভ করে।
            </p>

            <p>
              পরবর্তীতে ১৯৮৬ ইং সনে যখন তিনি দেশেশন হলের অতেঘরে ছাত্র-ছাত্রীদের
              আসন আর সংকুলান হচ্ছে না, তখনই তিনি বাংলিশ উদ্যোগে ধৈরসীন হলের
              পাশেই অবস্থিত নীলক্ষেতের ICMAB ভবনে UCC নামকরণে ঢাকা
              বিশ্ববিদ্যালয়ের তৎকালীন তাইম চ্যাপেলর কর্তৃক আনুষ্ঠানিকভাবে
              উদ্বোধন করেন। উক্ত উদ্বোধনী অনুষ্ঠানে ঢাকা বিশ্ববিদ্যালয়ের
              বিভিন্ন অনুষদের ডীন, বিভাগীয় চেয়ারম্যানবৃন্দ, হলের প্রভোস্টবৃন্দ
              এবং বিভিন্ন বিভাগের শিক্ষকবৃন্দ উপস্থিত ছিলেন। এভাবে ছাটি ছাটি পা
              বা করে UCC এর শাখা প্রশাখা আজ মারা দেশে বিস্তৃতি লাভ করছে।
              বর্তমানে সারা বাংলাদেশে প্রায় শতাধিক শাখায় বিশ্ববিদ্যালয়
              ভর্তিচ্ছু ছাত্র-ছাত্রীদের পদচারণায় মুখরিত হয়ে উঠেছে UCC-র আঙিনা।
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl text-gray-900 font-bold text-center mb-12">
              UCC-র <span className="text-indigo-600">বৈশিষ্ট্য</span> সমূহ
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2"></div>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    UCC-তে সর্বকনিষ্ঠ নিয়োগপ্রাপ্ত আদর্শ ঢাকা বিশ্ববিদ্যালয়ের
                    প্রাক্তন ও বর্তমান বিভিন্ন বর্ষ অভিজ্ঞতাসম্পত আন্তরিক
                    শিক্ষকদের।
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    নিয়মিত পরীক্ষার উপর ভিত্তিক প্রকৃত নিয়ে (লেকচার শীট
                    প্রদান, নিয়মিত পরীক্ষা ও ধর্ষণ (টেস্ট)।
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    অফলাইন ও অনলাইনে ব্যবস্থায় সর্বোচ্চ যুগোপযুগী কুশ ও
                    পরীক্ষা।
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    প্রতিটি বিষয়ের উপর সপ্তাহে ১টি করে Regular Class
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    প্রতি সপ্তাহে English Solution Class
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    ভর্তি পরীক্ষার উপযোগী পাঠসূচী নির্ধারণ এবং সে অনুযায়ী ধাপ
                    সম্পূর্ণ লেকচারগৃহী ও প্রশ্নবই প্রদান।
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    সম্পূর্ণ কনফিডেন্সের ধারনায় ফোর্ড প্ল্যান, লেকচার বিদায়,
                    লেকচারগৃহী, পরীক্ষার প্রশ্নবই প্রদান।
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    প্রতিটি দুপুরে ৩০ মিনিটের Class Test এবং বাকী ১০ মিনিট
                    লেকচারের ব্যবস্থা।
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">সপ্তাহে ১টি English Class.</p>
                </div>

                <div className="flex gap-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <p className="text-gray-700">
                    বিশ্ববিদ্যিক সমস্যা সমাধানের জন্য সপ্তাহে ১দিন বিশেষভিত্তিক
                    Consulting Hour
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
