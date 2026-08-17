import { lazy, Suspense, useState } from "react";

import Preloader from "../components/NewPreloader";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import GithubProfileSection from "../components/GithubProfileSection";
import ScrollToTop from "../components/ScrollToTop";
import SEOHead from "../components/SEOHead";
import ProjectsSection from "../components/ProjectsSection";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import DeferredSection from "../components/DeferredSection";

const SkillsSection = lazy(() => import("../components/SkillsSection"));
const SolarSystemSection = lazy(() => import("../components/SolarSystemSection"));

const SectionFallback = () => <div className="min-h-[100dvh] bg-[#0a0a0a]" />;

const Home = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <main>
      <SEOHead />

      <Preloader onComplete={() => setPreloaderComplete(true)} />

      <Header />
      <HeroSection isReady={preloaderComplete} />
      <AboutSection />
      <ExperienceSection />
      <GithubProfileSection />

      <DeferredSection id="skills">
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
      </DeferredSection>

      <ProjectsSection />

      <DeferredSection id="playground">
        <Suspense fallback={<SectionFallback />}>
          <SolarSystemSection />
        </Suspense>
      </DeferredSection>

      <ContactSection />
      <ScrollToTop />
    </main>
  );
};

export default Home;
