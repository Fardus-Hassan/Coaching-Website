import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-50">
      <Image
        src="/icon2.png"
        alt="Logo"
        width={100}
        height={100}
        className="animate-bounce"
      />
      {/* <div className="mt-6 w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-medium tracking-wide text-indigo-400 animate-pulse">
        Please wait, loading...
      </p> */}
    </div>
  );
}
