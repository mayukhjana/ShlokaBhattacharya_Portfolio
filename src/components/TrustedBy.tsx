
import { useEffect, useRef } from "react";

const TrustedBy = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        
        // Reset scroll position when reaching the end
        if (carouselRef.current.scrollLeft >= 
            (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    };
    
    const interval = setInterval(scrollCarousel, 30);
    return () => clearInterval(interval);
  }, []);

  const schools = [
    {
      name: "Heritage School",
      logo: "/lovable-uploads/heritage-school-logo.png" // Using a placeholder path
    },
    {
      name: "Modern High",
      logo: "/lovable-uploads/modern-high-logo.png"
    },
    {
      name: "La Martiniere",
      logo: "/lovable-uploads/la-martiniere-logo.png"
    },
    {
      name: "St. Xavier's",
      logo: "/lovable-uploads/st-xaviers-logo.png"
    },
    {
      name: "South Point",
      logo: "/lovable-uploads/south-point-logo.png"
    },
    {
      name: "Delhi Public School",
      logo: "/lovable-uploads/dps-logo.png"
    },
    {
      name: "Loreto House",
      logo: "/lovable-uploads/loreto-house-logo.png"
    },
    {
      name: "Don Bosco",
      logo: "/lovable-uploads/don-bosco-logo.png"
    }
  ];

  return (
    <section className="py-12 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Trusted By Students From</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helping students achieve academic excellence from the most prestigious schools across Kolkata
          </p>
        </div>
        
        <div className="overflow-hidden relative">
          {/* Gradient overlays for smooth scroll effect */}
          <div className="absolute left-0 top-0 h-full w-12 z-10 bg-gradient-to-r from-secondary/30 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-secondary/30 to-transparent"></div>
          
          <div 
            ref={carouselRef} 
            className="flex overflow-x-auto scrollbar-hide py-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-12 pr-12" style={{ minWidth: "200%" }}>
              {[...schools, ...schools].map((school, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center glass-effect rounded-lg px-8 py-6 min-w-[180px] h-[150px]"
                >
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    {/* Fallback to a school icon if image fails to load */}
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="m2 22 10-10 10 10"></path>
                        <path d="M4 15v-3a8 8 0 0 1 16 0v3"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center font-medium">{school.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
