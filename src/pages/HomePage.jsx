import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
// import About from '../components/About';
// import Highlights from '../components/Highlights';
import Footer from '../components/Footer';
import heroImg from '../assets/hero-img.jpg'

export default function HomePage() {
  return (
    <div>
        <Navbar/>
        <Hero />
        <HowItWorks/>
        <CTA/>
        <Footer />
    </div>
  );
}
