import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const scrollToProjects = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-[#070b0f] text-[#d5d9df]">

      {/* ============================= */}
      {/* BANNER */}
      {/* ============================= */}

      <div className="relative h-[315px] w-full overflow-hidden md:h-[365px]">

        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=90"
          alt="Mountain landscape"
          className="h-full w-full object-cover"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[#070b0f]" />

        {/* Quote */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="px-6 text-center font-serif text-[15px] font-semibold italic text-white/90 sm:text-[17px]">
            &quot;Giving up not in the blood sir, not in the blood&quot;
          </p>
        </div>
      </div>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <div className="mx-auto max-w-[1060px] px-6 md:px-8">

        {/* PROFILE */}
        <div className="relative -mt-[62px] z-10">

          <div className="h-[116px] w-[116px] overflow-hidden rounded-full border-[4px] border-[#070b0f] bg-[#111820] shadow-lg md:h-[126px] md:w-[126px]">

            <img
              src="/rahul.png"
              alt="Rahul Kapgate"
              className="h-full w-full object-cover"
            />

          </div>

        </div>

        {/* INFO */}
        <div className="pb-24 pt-10">

          {/* NAME */}

          <h1 className="font-mono text-[34px] font-bold tracking-[-1px] text-[#f4f5f7] md:text-[42px]">
            Rahul Kapgate
          </h1>

          {/* ROLE */}

          <p className="mt-2 font-mono text-[13px] leading-7 text-[#8793a2] md:text-[15px]">
            Full Stack Developer
            <span className="mx-2">•</span>
            React & Next.js
            <span className="mx-2">•</span>
            Node.js & Python
          </p>

          {/* DESCRIPTION */}

          <p className="mt-6 max-w-[760px] font-mono text-[14px] leading-[1.75] text-[#c1c7cf] md:text-[16px]">
            Full Stack Developer focused on building scalable web applications
            using React, Next.js, Node.js, Python, PostgreSQL and cloud
            technologies. Built production-ready full-stack applications,
            REST APIs and modern responsive user interfaces.
          </p>

          {/* BUTTONS */}

          <div className="mt-8 flex flex-wrap items-center gap-3">

            <button
              onClick={scrollToProjects}
              className="
                h-[52px]
                rounded-[9px]
                border border-[#d8fbff]
                bg-[#10d9e8]
                px-6
                font-mono
                text-[15px]
                font-bold
                text-[#021316]
                shadow-[0_0_0_2px_#070b0f,0_0_0_3px_#d5faff]
                transition
                duration-200
                hover:bg-[#26e6f2]
              "
            >
              View Projects
            </button>

            <a
              href="mailto:YOUR_EMAIL@gmail.com"
              className="
                flex
                h-[52px]
                items-center
                rounded-[9px]
                border
                border-[#242b32]
                bg-[#0d1217]
                px-6
                font-mono
                text-[15px]
                font-bold
                text-[#e1e4e8]
                transition
                duration-200
                hover:border-[#343d46]
                hover:bg-[#111820]
              "
            >
              Contact Me
            </a>

          </div>

          {/* SOCIAL */}

          <div className="mt-10 flex flex-wrap items-center gap-4">

            <span className="font-mono text-[12px] text-[#596676]">
              Find me on —
            </span>

            <div className="flex items-center gap-2">

              <SocialButton
                href="https://github.com/rahul-kapgate"
                icon={faGithub}
                label="GitHub"
              />

              <SocialButton
                href="YOUR_LINKEDIN_URL"
                icon={faLinkedinIn}
                label="LinkedIn"
              />

              <SocialButton
                href="YOUR_X_URL"
                icon={faXTwitter}
                label="X"
              />

              <SocialButton
                href="mailto:YOUR_EMAIL@gmail.com"
                icon={faEnvelope}
                label="Email"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

const SocialButton = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      className="
        flex
        h-[39px]
        w-[39px]
        items-center
        justify-center
        rounded-[9px]
        border
        border-[#202933]
        bg-[#0b1116]
        text-[15px]
        text-[#5f6f81]
        transition
        duration-200
        hover:border-[#34414d]
        hover:bg-[#111820]
        hover:text-[#9eabb9]
      "
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

export default Hero;