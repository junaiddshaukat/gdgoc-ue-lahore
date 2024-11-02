import Image from "next/image";
import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import UpcomingEvents from "../components/UpcomingEvents.jsx"
import Team from "../components/Team.jsx"
import WorkSection from "../components/WorkSection.jsx"
import Footer from "../components/Footer.jsx"
import AboutSection from "@/components/About.jsx";
export default function Home() {
  return (
    <>
    <Navbar />
    <Hero/>
    <UpcomingEvents/>
    <Team/>
    <WorkSection/>
    <AboutSection/>
    <Footer/>
    </>
  );
}
