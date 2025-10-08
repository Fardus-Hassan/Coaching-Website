import PhotoGallery from "@/components/Home/PhotoGallery";
import PageHeader from "@/components/Utility/PageHeader";

export default function GalleryPage() {
  return (
    <div className="lg:mt-10">
      <PageHeader title='ফটো গ্যালারি'/>
      <PhotoGallery isHomePage={false}/>
    </div>
  )
}
