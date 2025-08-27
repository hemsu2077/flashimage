import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import Link from "next/link";
import { Section as SectionType } from "@/types/blocks/section";

export default function CTA({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-12 text-center" style={{background: 'linear-gradient(135deg, #92FE9D 0%, #00C9FF 100%)'}}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {section.title}
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {section.description}
          </p>
          {section.buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {section.buttons.map((item, idx) => (
                <Button key={idx} variant="default" size="lg" asChild>
                  <Link
                    href={item.url || ""}
                    target={item.target}
                    className="inline-flex items-center justify-center gap-2 font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {item.icon && (
                      <Icon name={item.icon as string} className="size-5" />
                    )}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
