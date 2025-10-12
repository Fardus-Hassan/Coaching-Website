import Committees from "@/components/Committees/Committees";
import PageHeader from "@/components/Utility/PageHeader";

export default function CommitteesPage() {
  return (
    <div className="lg:mt-10">
      <PageHeader title="কমিটি সদস্যবৃন্দ" />
      <Committees/>
    </div>
  );
}
