// import { Loader2 } from "lucide-react";

// export default async function Loading() {

//     return (
//       <div >
//       <Loader2 className="w-14 h-14 text-gray-500 animate-spin" />
//     </div>
//     );
//   }

import Image from "next/image";
import { getServerBaseUrl } from "../apiConfig";
import { headers } from "next/headers";

export default async function Loading() {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const apiUrl = getServerBaseUrl(host);
    
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch(`${apiUrl}institutes/`, {
      cache: "force-cache",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const institute = data?.[0];

    return (
      <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
      <Image
          src={institute?.institute_logo || "/icon2.png"}
          alt={institute?.institute_name || "Logo"}
          width={100}
          height={100}
          className="animate-bounce"
          priority
        />
        <p className="mt-3 text-sm text-[var(--color-text)] animate-pulse">
          {institute?.institute_name || "Loading..."}
        </p>
      </div>
      </div>
    );
  } catch (error) {
    console.error('Loading component error:', error);
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/icon2.png"
          alt="Logo"
          width={100}
          height={100}
          className="animate-bounce"
          priority
        />
        <p className="mt-3 text-sm text-[var(--color-text)] animate-pulse">
          Coaching Management System
        </p>
        </div>
      </div>
    );
  }
}