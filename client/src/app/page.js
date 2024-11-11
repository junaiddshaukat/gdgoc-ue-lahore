import Image from "next/image";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import UpcomingEvents from "../components/UpcomingEvents.jsx";
import Team from "../components/Team.jsx";
import WorkSection from "../components/WorkSection.jsx";
import Footer from "../components/Footer.jsx";
import AboutSection from "../components/About.jsx";
import PastEvents from "../components/Pastevents.jsx";

import ContactForm from "../components/contact-form.jsx";

export default function Home() {
  return (
    <>
       <Navbar />
      <Hero />
      <div id="UpcomingEvents">
        <UpcomingEvents />
      </div>
      <div id="Team">
        <Team />
      </div>
      <div id="Pasevents">
        <PastEvents />
      </div>
      <div id="WorkSection">
        <WorkSection />
      </div>
      
      <div id="About">
        <AboutSection />
      </div>
      
      <Footer/>
   
    </>
  );
}
