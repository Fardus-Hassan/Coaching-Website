import Image from "next/image";

export default async function Loading() {
  try {
    const res = await fetch("https://coaching.attendclub.top/api/institutes/", {
      cache: "force-cache",
    });

    const data = await res.json();
    const institute = data?.[0];

    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-50">
        <Image
          src={institute?.institute_logo || "/icon2.png"}
          alt={institute?.institute_name || "Logo"}
          width={100}
          height={100}
          className="animate-bounce"
          priority
        />
        <p className="mt-3 text-sm text-gray-300 animate-pulse">
          {institute?.institute_name || "Loading..."}
        </p>
      </div>
    );
  } catch (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-50">
        <Image
          src="/icon2.png"
          alt="Logo"
          width={100}
          height={100}
          className="animate-bounce"
          priority
        />
        <p className="mt-3 text-sm text-gray-300 animate-pulse">
          Coaching Management System
        </p>
      </div>
    );
  }
}
