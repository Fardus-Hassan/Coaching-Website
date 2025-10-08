import AdmissionForm from "@/components/Admission/AdmissionForm";
import PageHeader from "@/components/Utility/PageHeader";

export default function Admission() {
  return (
    <div className="lg:mt-10">
      <PageHeader title="ভর্তি ফরম" />
      <AdmissionForm/>
    </div>
  );
}
