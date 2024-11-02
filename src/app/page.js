import Image from "next/image";
import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import UpcomingEvents from "../components/UpcomingEvents.jsx"
export default function Home() {
  return (
    <>
    <Navbar />
    <Hero/>
    <UpcomingEvents/>
    </>
  );
}
