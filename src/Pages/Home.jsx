import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Footer />
    </main>
  );
};

export default Home;