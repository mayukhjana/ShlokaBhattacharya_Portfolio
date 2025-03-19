
import { Button } from "@/components/ui/button";
import ThreeScene from './ThreeScene';
import { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero = () => {
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
    "Heritage School",
    "Modern High",
    "La Martiniere",
    "St. Xavier's",
    "South Point",
    "Delhi Public School",
    "Loreto House",
    "Don Bosco",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ThreeScene />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 z-[1]"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full backdrop-blur-card mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="text-sm font-medium bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">English Literature & Language Tutor</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 animate-fade-in opacity-0 font-display" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Elevating</span> <span className="relative">English 
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent/30 rounded-full"></span>
            </span> <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Education</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Helping students in grades 6-12 master English language and literature with personalized teaching approaches and a passion for literary excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300">
              <a href="#contact">Book a Session</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-medium border-2 border-secondary-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-background/70 hover:-translate-y-1 transition-all duration-300">
              <a href="#services">View Services</a>
            </Button>
          </div>
          
          <div className="mt-20 animate-fade-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3 text-center">Trusted by students from</div>
            
            <div className="overflow-hidden relative">
              {/* Gradient overlays for smooth scroll effect */}
              <div className="absolute left-0 top-0 h-full w-12 z-10 bg-gradient-to-r from-background to-transparent"></div>
              <div className="absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-background to-transparent"></div>
              
              <div 
                ref={carouselRef} 
                className="flex overflow-x-auto scrollbar-hide py-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
              >
                <div className="flex gap-4 pr-8" style={{ minWidth: "150%" }}>
                  {[...schools, ...schools].map((school, index) => (
                    <div 
                      key={index} 
                      className="glass-effect rounded-lg px-6 py-3 text-center text-sm whitespace-nowrap"
                    >
                      {school}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#about" className="flex flex-col items-center text-sm text-muted-foreground group">
          <span className="mb-2 group-hover:text-accent transition-colors">Discover More</span>
          <div className="w-10 h-10 rounded-full backdrop-blur-card flex items-center justify-center group-hover:border-accent transition-colors border border-muted">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-accent transition-colors">
              <path d="M7.29289 23.7071C7.68342 24.0976 8.31658 24.0976 8.70711 23.7071L15.0711 17.3431C15.4616 16.9526 15.4616 16.3195 15.0711 15.9289C14.6805 15.5384 14.0474 15.5384 13.6569 15.9289L8 21.5858L2.34315 15.9289C1.95262 15.5384 1.31946 15.5384 0.928932 15.9289C0.538408 16.3195 0.538408 16.9526 0.928932 17.3431L7.29289 23.7071ZM7 0V23H9V0H7Z" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
