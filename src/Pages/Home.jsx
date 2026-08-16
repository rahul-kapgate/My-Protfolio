import { useState } from "react";

import Preloader from "../components/NewPreloader";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import GithubProfileSection from "../components/GithubProfileSection";
import ScrollToTop from "../components/ScrollToTop";
import SEOHead from "../components/SEOHead";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import SolarSystemSection from "../components/SolarSystemSection";
import Header from "../components/Header";

const Home = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <main>
      <Preloader
        onComplete={() => {
          setPreloaderComplete(true);
        }}
      />

      <Header />

      <HeroSection isReady={preloaderComplete} />

      <AboutSection />

      <ExperienceSection />

      <GithubProfileSection />

      <SkillsSection />

      <ProjectsSection />

      <SolarSystemSection />

      <ScrollToTop />
    </main>
  );
};

export default Home;
