import { Loader2 } from "lucide-react";

export default async function Loading() {

    return (
      <div className="flex justify-center items-center text-gray-500 bg-white h-screen">
      <Loader2 className="w-14 h-14 text-gray-500 animate-spin" />
    </div>
    );
  }

