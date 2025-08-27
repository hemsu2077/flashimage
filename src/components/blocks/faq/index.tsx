"use client";

import { Badge } from "@/components/ui/badge";
import { Section as SectionType } from "@/types/blocks/section";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ({ section }: { section: SectionType }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  if (section.disabled) {
    return null;
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id={section.name} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {section.label && (
            <Badge className="text-xs font-medium mb-4">{section.label}</Badge>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-xl text-gray-600">
            {section.description}
          </p>
        </div>
        
        <div className="space-y-6">
          {section.items?.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <button 
                className="w-full text-left flex justify-between items-center"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.title}
                </h3>
                <ChevronDown 
                  className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              
              {openItems.includes(index) && (
                <div className="mt-4 text-gray-600">
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
