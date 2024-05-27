import { ChevronDown } from "lucide-react";

function Topics() {
  return (
    <div className="hidden md:flex flex-col p-3 gap-3">
      <h3 className="uppercase text-base font-semibold text-emerald-500">
        Browse Topic
      </h3>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center hover:bg-slate-900 hover:text-emerald-400 transition-all duration-300 p-3 rounded-md cursor-pointer">
          <span className="text-slate-300">Python</span>
          <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
            4
          </span>
        </div>
        <div className="flex justify-between items-center hover:bg-slate-900 transition-all duration-300 p-3 rounded-md cursor-pointer">
          <span className="text-slate-300">Python</span>
          <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
            4
          </span>
        </div>
        <div className="flex justify-between items-center hover:bg-slate-900 transition-all duration-300 p-3 rounded-md cursor-pointer">
          <span className="text-slate-300">Python</span>
          <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
            4
          </span>
        </div>
      </div>

      <div className="flex gap-2 hover:underline">
        <p className="text-emerald-400">More</p>
        <ChevronDown className="text-emerald-400" />
      </div>
    </div>
  );
}

export default Topics;
