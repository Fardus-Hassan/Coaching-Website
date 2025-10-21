// import baseUrl from "@/apiConfig";
// import Image from "next/image";

// export default async function Loading() {
//   try {
//     const res = await fetch(`${baseUrl()}institutes/`, {
//       cache: "no-store",
//     });

//     const data = await res.json();
//     const institute = data?.[0];

//     return (
//       <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-white z-50">
//         <Image
//           src={institute?.institute_logo || "/icon2.png"}
//           alt={institute?.institute_name || "Logo"}
//           width={100}
//           height={100}
//           className="animate-bounce"
//           priority
//         />
//         <p className="mt-3 text-sm text-[var(--color-text)] animate-pulse">
//           {institute?.institute_name || "Loading..."}
//         </p>
//       </div>
//     );
//   } catch (error) {
//     return (
//       <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-white z-50">
//         <Image
//           src="/icon2.png"
//           alt="Logo"
//           width={100}
//           height={100}
//           className="animate-bounce"
//           priority
//         />
//         <p className="mt-3 text-sm text-[var(--color-text)] animate-pulse">
//           Coaching Management System
//         </p>
//       </div>
//     );
//   }
// }




import { Loader2 } from "lucide-react";

export default async function Loading() {

    return (
      <div className="flex justify-center items-center text-gray-500 bg-white h-screen">
      <Loader2 className="w-14 h-14 text-gray-500 animate-spin" />
    </div>
    );
  }

