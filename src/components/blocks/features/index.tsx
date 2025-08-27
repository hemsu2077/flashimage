import Icon from "@/components/icon";
import { Section as SectionType } from "@/types/blocks/section";

export default function Features({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-pretty text-3xl font-bold lg:text-4xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {section.title}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground lg:text-lg leading-relaxed">
            {section.description}
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {section.items?.map((item, i) => (
            <div key={i} className="group relative bg-white rounded-2xl p-8 border border-gray-200/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  {item.icon && (
                    <Icon name={item.icon} className="text-2xl text-primary" />
                  )}
                </div>
              </div>

              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                  {item.description}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
