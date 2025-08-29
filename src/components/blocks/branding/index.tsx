"use client";

import { Section as SectionType } from "@/types/blocks/section";

export default function Branding({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  const partnerBadges = [
    {
      href: "https://fazier.com/launches/picturetodrawing.com",
      src: "https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=neutral",
      alt: "Fazier badge",
      width: 200,
      height: 75
    },
    {
      href: "https://turbo0.com/item/picture-to-drawing",
      src: "https://img.turbo0.com/badge-listed-light.svg",
      alt: "Listed on Turbo0",
      width: 150,
      height: 68
    },
    {
      href: "https://twelve.tools",
      src: "https://twelve.tools/badge2-light.svg",
      alt: "Featured on Twelve Tools",
      width: 188,
      height: 68
    },
    {
      href: "https://code.market?code.market=verified",
      src: "https://code.market/assets/manage-product/featured-logo-bright.svg",
      alt: "ai tools code.market",
      width: 200,
      height: 68
    },
    {
      href: "https://tinylaunch.com",
      src: "https://tinylaunch.com/tinylaunch_badge_featured_on.svg",
      alt: "TinyLaunch Badge",
      width: 175,
      height: 68
    },
    {
      href: "https://dang.ai/",
      src: "https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png",
      alt: "Dang.ai",
      width: 150,
      height: 68
    },
    {
      href: "https://localmote.com/flash-image-ai.html",
      src: "https://localmote.com/find-us.png",
      alt: "Find us on Localmote",
      width: 150,
      height: 68
    }
  ];

  return (
    <section id={section.name} className="py-16">
      <div className="container flex flex-row items-center justify-center">
        <div className="flex flex-col items-center gap-6 w-full">
          <p className="text-center text-primary/80 text-lg">
            {section.title}
          </p>
          <div className="w-full overflow-hidden relative">
            {/* Left gradient mask */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            {/* Right gradient mask */}
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll gap-6 items-center">
              {/* First set of badges */}
              {partnerBadges.map((badge, idx) => (
                <a
                  key={idx}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    width={badge.width}
                    height={badge.height}
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ))}
              {/* Duplicate set for seamless scrolling */}
              {partnerBadges.map((badge, idx) => (
                <a
                  key={`duplicate-${idx}`}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    width={badge.width}
                    height={badge.height}
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: calc(200% + 2rem);
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
