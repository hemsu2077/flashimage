import Icon from "@/components/icon";
import { Section as SectionType } from "@/types/blocks/section";
import { Button } from "@/components/ui/button";

export default function TransformationExamples({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="space-y-16">
          {section.items?.map((item, i) => {
            // Define color schemes for different use cases
            const colorSchemes = [
              { bg: 'bg-blue-100', text: 'text-blue-800', gradientFrom: 'from-blue-100', gradientTo: 'to-blue-200', iconColor: 'text-blue-400', titleColor: 'text-blue-600', subtitleColor: 'text-blue-500' },
              { bg: 'bg-green-100', text: 'text-green-800', gradientFrom: 'from-green-100', gradientTo: 'to-green-200', iconColor: 'text-green-400', titleColor: 'text-green-600', subtitleColor: 'text-green-500' },
              { bg: 'bg-purple-100', text: 'text-purple-800', gradientFrom: 'from-purple-100', gradientTo: 'to-purple-200', iconColor: 'text-purple-400', titleColor: 'text-purple-600', subtitleColor: 'text-purple-500' },
              { bg: 'bg-orange-100', text: 'text-orange-800', gradientFrom: 'from-orange-100', gradientTo: 'to-orange-200', iconColor: 'text-orange-400', titleColor: 'text-orange-600', subtitleColor: 'text-orange-500' },
              { bg: 'bg-pink-100', text: 'text-pink-800', gradientFrom: 'from-pink-100', gradientTo: 'to-pink-200', iconColor: 'text-pink-400', titleColor: 'text-pink-600', subtitleColor: 'text-pink-500' }
            ];
            const colorScheme = colorSchemes[i % colorSchemes.length];

            return (
              <div key={i} className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {/* Content side */}
                <div className={`${i % 2 === 1 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'} mb-8 lg:mb-0`}>
                  <div className={`inline-flex items-center ${colorScheme.bg} ${colorScheme.text} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                    {item.icon && <Icon name={item.icon} className="mr-2" />}
                    {item.label || item.title}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  {item.children && (
                    <ul className="space-y-2 text-gray-600">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} className="flex items-center">
                          <Icon name="RiCheckLine" className="text-green-500 mr-3" />
                          {child.title || child.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Image side */}
                <div className={`${i % 2 === 1 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'} relative`}>
                  {item.image ? (
                    <img
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                  ) : (
                    <div className={`aspect-video bg-gradient-to-br ${colorScheme.gradientFrom} ${colorScheme.gradientTo} rounded-xl`}>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}