import Icon from "@/components/icon";
import { Section as SectionType } from "@/types/blocks/section";

export default function Features({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-pretty text-3xl font-bold lg:text-4xl">
            {section.title}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground lg:text-lg">
            {section.description}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {section.items?.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              {item.image && (
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-6">
                  <img
                    src={item.image.src}
                    alt={`${item.title} - Flash Image Feature Demo`}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="flex items-center mb-4">
                {item.icon && (
                  <Icon name={item.icon} className="text-lg text-primary mr-3 flex-shrink-0" />
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
