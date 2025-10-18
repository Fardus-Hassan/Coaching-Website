import Banner from "@/components/Home/Banner";
import About from "@/components/Home/About";
import Students from "@/components/Home/Students";
import Success from "@/components/Home/Success";
import Services from "@/components/Home/Services";
import PhotoGallery from "@/components/Home/PhotoGallery";
import SecBanner from "@/components/Home/SecBanner";
import Course from "@/components/Home/Course";
import NoticeSlide from "@/components/Home/NoticeSlide";

export default function HomePage() {

  return (
    <main className="">
      <Banner/>
      <NoticeSlide/>
      <About/>
      <Course/>
      <Students/>
      <Services/>
      <SecBanner/>
      <PhotoGallery isHomePage={true}/>
      <Success/>
    </main>
  );
}

