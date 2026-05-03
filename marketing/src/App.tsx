import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedDemo from './components/AnimatedDemo';
import HowItWorks from './components/HowItWorks';
import InsideVSCode from './components/InsideVSCode';
import Features from './components/Features';
import AudienceSplit from './components/AudienceSplit';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AnimatedDemo />
        <HowItWorks />
        <InsideVSCode />
        <Features />
        <AudienceSplit />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
