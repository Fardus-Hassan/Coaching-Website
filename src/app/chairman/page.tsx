import ChairmanMessage from "@/components/Chairman/ChairmanMessage";
import PageHeader from "@/components/Utility/PageHeader";


export default function ChairmanPage() {
  return (
    <div className="lg:mt-10">
            <PageHeader title="চেয়ারম্যানের বার্তা" />
      <ChairmanMessage/>
    </div>
  )
}
