import AboutDetails from "@/components/About/AboutDetails";
import PageHeader from "@/components/Utility/PageHeader";

export default function AboutPage() {
  return (
    <div className="lg:mt-10">
            <PageHeader title="প্রতিষ্ঠানের সম্পর্কে" />
      <AboutDetails/>
    </div>
  )
}
