import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function HeroSection() {
  return (
    <section className="bg-linear-to-br  from-slate-50 via-blue-50 to-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
          Your next opportunity starts here—
          <span className="text-blue-900 block mt-2">
            find the job that fits today.
          </span>
        </h1>

        {/* Floating Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-2 transform transition-all hover:scale-[1.02] hover:shadow-3xl border border-gray-100">
            <div className="flex items-center">
              <Input
                placeholder="Search for the job you are looking for"
                className="flex-1 border-0 bg-transparent text-lg px-6 py-4 focus:ring-0 placeholder:text-gray-400 placeholder:blur-[0.5px]"
              />
              <div className="bg-linear-to-r from-blue-900 to-blue-700 rounded-xl p-4 shadow-lg transform transition-all hover:scale-110 cursor-pointer">
                <Search className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl -z-10 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}