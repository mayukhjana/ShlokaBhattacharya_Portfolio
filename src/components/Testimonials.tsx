
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "Shloka's teaching methodology has transformed my approach to literature analysis. Her explanations are clear, and she has helped me improve my writing tremendously.",
    name: "Ankita S.",
    role: "Class 12 Student",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    quote: "As a parent, I've seen remarkable improvement in my son's English grades. Shloka knows how to engage students and make complex concepts accessible.",
    name: "Priya M.",
    role: "Parent of Class 8 Student",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    quote: "The way Shloka breaks down literature has helped me understand themes and character development that I previously struggled with. She's patient and thorough.",
    name: "Rohit K.",
    role: "Class 10 Student",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
  };
  
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.disconnect();
      stopAutoScroll();
    };
  }, []);
  
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full backdrop-blur-card mb-4">
            <span className="text-sm font-medium text-accent">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">What My Students Say</h2>
          <p className="text-muted-foreground">
            Feedback from students and parents who have experienced the benefits of personalized English tutoring.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden" style={{ height: '400px' }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col items-center justify-center text-center p-8 ${
                  activeIndex === index 
                    ? 'opacity-100 translate-x-0' 
                    : activeIndex > index 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="mb-8">
                  <svg className="h-12 w-12 text-accent/30 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <div className="backdrop-blur-card rounded-2xl p-8 card-hover">
                  <p className="text-lg mb-6 leading-relaxed">{testimonial.quote}</p>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-display font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  stopAutoScroll();
                  startAutoScroll();
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-accent w-6' : 'bg-accent/30'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
