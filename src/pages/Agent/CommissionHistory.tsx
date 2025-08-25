import { Clock } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center  bg-white">
      <div className="text-center p-8 max-w-lg">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100">
          <Clock className="w-10 h-10 text-orange-500" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-8">
          We’re working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Notify button (optional) */}
        <button className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md transition">
          Notify Me
        </button>
      </div>
    </div>
  );
}
