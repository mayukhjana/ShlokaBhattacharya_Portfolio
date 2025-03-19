
import { useState, useEffect } from 'react';

const services = [
  {
    title: "Grammar & Composition",
    description: "Master English grammar rules, sentence structure, and effective composition techniques. Develop clear, concise writing skills essential for academic success.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4-4"></path>
        <path d="M18 2v10.54a4 4 0 1 1-4-4"></path>
      </svg>
    ),
    grades: "Grades 6-12"
  },
  {
    title: "Literature Analysis",
    description: "Develop critical analysis skills for prose, poetry, and drama. Learn to interpret themes, characterization, imagery, and literary devices across various texts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    grades: "Grades 8-12"
  },
  {
    title: "Exam Preparation",
    description: "Comprehensive preparation for English language and literature exams with practice tests, essay writing techniques, and effective time management strategies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    grades: "Grades 6-12"
  },
  {
    title: "Reading Comprehension",
    description: "Improve reading fluency, comprehension, and analytical skills. Learn effective strategies for interpreting and responding to various text types.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
    ),
    grades: "Grades 6-12"
  },
  {
    title: "Essay Writing",
    description: "Develop structured essay writing skills. Learn effective thesis development, argumentation, evidence integration, and polished academic writing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    ),
    grades: "Grades 8-12"
  },
  {
    title: "Specialized Literary Studies",
    description: "Explore specific literary periods, movements, or authors. Deep-dive into classical works, contemporary literature, or thematic literary studies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    grades: "Grades 9-12"
  }
];

const Services = () => {
  const [visibleItems, setVisibleItems] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start showing items one by one
          let count = 0;
          const interval = setInterval(() => {
            if (count < services.length) {
              setVisibleItems(prev => prev + 1);
              count++;
            } else {
              clearInterval(interval);
            }
          }, 150);
          
          observer.disconnect();
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('services');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.disconnect();
    };
  }, []);
  
  return (
    <section id="services" className="section-container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 rounded-full backdrop-blur-card mb-4">
          <span className="text-sm font-medium text-accent">What I Offer</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Comprehensive English Tutoring Services</h2>
        <p className="text-muted-foreground">
          Tailored tutoring services designed to improve academic performance and foster a genuine appreciation for English literature and language.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className={`backdrop-blur-card rounded-lg p-6 card-hover transition-all duration-500 ${
              index < visibleItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <div className="text-primary">
                {service.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="inline-block px-3 py-1 text-xs bg-secondary rounded-full">
                {service.grades}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 backdrop-blur-card rounded-lg p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/80 via-primary/60 to-accent/80"></div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Personalized Teaching Approach</h3>
            <p className="text-muted-foreground mb-6">
              I believe every student learns differently. My teaching approach is adapted to individual learning styles, strengths, and areas for improvement, ensuring each student receives the support they need to excel.
            </p>
            
            <ul className="space-y-3">
              {[
                "One-on-one attention and personalized feedback",
                "Regular progress assessments and goal setting",
                "Flexible scheduling to accommodate student needs",
                "Supplementary learning materials tailored to interests"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-lg p-5 text-center">
              <div className="text-2xl font-display font-bold text-primary mb-1">60 min</div>
              <div className="text-sm text-muted-foreground">Standard Session</div>
            </div>
            <div className="bg-secondary rounded-lg p-5 text-center">
              <div className="text-2xl font-display font-bold text-primary mb-1">90 min</div>
              <div className="text-sm text-muted-foreground">Extended Session</div>
            </div>
            <div className="bg-secondary rounded-lg p-5 text-center">
              <div className="text-2xl font-display font-bold text-primary mb-1">Flexible</div>
              <div className="text-sm text-muted-foreground">Scheduling</div>
            </div>
            <div className="bg-secondary rounded-lg p-5 text-center">
              <div className="text-2xl font-display font-bold text-primary mb-1">Online</div>
              <div className="text-sm text-muted-foreground">& In-person</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
