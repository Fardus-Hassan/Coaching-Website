import TeacherList from "@/components/Teacher/TeacherList";
import PageHeader from "@/components/Utility/PageHeader";
import { useGetTeachersQuery } from "@/redux/features/api/teacher/teacherApi";


export default function TeachersPage() {
  return (
    <div className="lg:mt-10">
        <PageHeader title="শিক্ষকবৃন্দ" />
        <TeacherList/>
    </div>
  )
}
