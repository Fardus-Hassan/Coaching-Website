import ChairmanMessage from "@/components/Chairman/ChairmanMessage";
import PageHeader from "@/components/Utility/PageHeader";


export default function ChairmanPage() {
  return (
    <div className="lg:mt-10">
            <PageHeader title="নীতিনির্ধারকদের বাণী" />
      <ChairmanMessage/>
    </div>
  )
}
