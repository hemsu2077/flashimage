import Icon from "@/components/icon";
import { Section as SectionType } from "@/types/blocks/section";

export default function Feature1({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-20 bg-gradient-to-b from-yellow-50 to-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {section.image && (
            <div className="relative">
              <img
                src={section.image?.src}
                alt="Flash Image AI"
                className="w-full rounded-xl object-cover shadow-2xl"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-2xl -z-10"></div>
            </div>
          )}
          <div className="flex flex-col space-y-8">
            {section.title && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-lg text-muted-foreground/80 leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>
            )}
            <div className="space-y-2">
              {section.items?.map((item, i) => (
                <div key={i} className="group flex gap-4 p-4 rounded-lg  duration-200 border-none">
                  {item.icon && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 bg-gradient-to-br from-primary to-primary/60 rounded-lg shadow-sm">
                        <Icon
                          name={item.icon}
                          className="size-5 text-white"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
