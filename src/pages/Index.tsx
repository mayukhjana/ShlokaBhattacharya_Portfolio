
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useSEO } from '@/utils/seo';

const Index = () => {
  // Apply SEO
  useSEO({
    title: 'Shloka Bhattacharya | English Tutor in Kolkata',
    description: 'Expert English tutoring for grades 6-12 by Shloka Bhattacharya, an honors student at The Heritage Academy. Personalized guidance in literature, grammar, and writing skills.',
    keywords: [
      'English tutor', 
      'Kolkata English tutoring', 
      'literature tutoring', 
      'English grammar tutor', 
      'high school English classes', 
      'middle school English help', 
      'Heritage Academy tutor'
    ]
  });

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
