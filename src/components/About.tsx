
import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('about');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.disconnect();
    };
  }, []);
  
  return (
    <section id="about" className="bg-secondary/50 py-16 md:py-24">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 mix-blend-overlay z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Shloka teaching"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-lg py-2 px-4 shadow-lg rotate-3">
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span className="font-medium">3rd Year Student</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 -left-4 backdrop-blur-card py-3 px-5 rounded-lg shadow-lg -rotate-2">
              <p className="font-display text-base">The Heritage Academy</p>
            </div>
          </div>
          
          <div>
            <div className={isVisible ? 'animate-fade-in' : 'opacity-0'} style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-6">
                <div className="h-px bg-primary/30 flex-grow mr-4"></div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-accent">About Me</h2>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Passionate English Tutor with a Love for Literature</h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hello! I'm Shloka Bhattacharya, a dedicated English literature student with a passion for teaching and sharing knowledge. Currently in my third year at The Heritage Academy, I'm pursuing my honors in English Literature.
                </p>
                <p>
                  My journey with English literature began early in life, fostered by a deep appreciation for storytelling and language. This passion has evolved into a commitment to help students develop strong language skills and literary understanding.
                </p>
                <p>
                  With a comprehensive understanding of the curriculum requirements for grades 6-12, I tailor my teaching approach to each student's unique learning style and needs. My goal is not just to improve grades, but to cultivate a genuine appreciation for language and literature.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-card p-4 rounded-lg text-center">
                  <p className="font-display font-bold text-2xl text-primary">3</p>
                  <p className="text-sm text-muted-foreground">Years of Experience</p>
                </div>
                <div className="backdrop-blur-card p-4 rounded-lg text-center">
                  <p className="font-display font-bold text-2xl text-primary">30+</p>
                  <p className="text-sm text-muted-foreground">Students Taught</p>
                </div>
                <div className="backdrop-blur-card p-4 rounded-lg text-center md:col-span-1 col-span-2">
                  <p className="font-display font-bold text-2xl text-primary">96%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
