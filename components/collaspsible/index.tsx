"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
  title: string;
  status: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}


const Collapsible: React.FC<CollapsibleProps> = ({ title, status,children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full border border-gray-300 rounded-[5px] bg-white shadow-sm transition-all">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-5 py-3 font-medium rounded-[5px] text-gray-800 bg-cyan-500 transition-colors"
      >
        <span className="text-white text-[13px] font-semibold">{title} <span className="text-[10px] bg-amber-900 text-white px-2 py-1 rounded-[8px] font-bold">{status}</span></span>
        <ChevronDown
          className={`w-5 h-5 cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Collapsible Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-3 bg-indigo-100 rounded-[5px]">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
