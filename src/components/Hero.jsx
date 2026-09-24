import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const dailyQuotes = [
  {
    quote: "Keep moving forward, even when the path feels impossible.",
    from: "Attack on Titan inspired",
  },
  {
    quote: "Hard work can turn an ordinary person into someone extraordinary.",
    from: "Naruto inspired",
  },
  {
    quote: "Your limits today don't have to be your limits tomorrow.",
    from: "Dragon Ball inspired",
  },
  {
    quote: "A setback is only another reason to come back stronger.",
    from: "One Piece inspired",
  },
  {
    quote: "Fear disappears when you decide your goal matters more.",
    from: "Demon Slayer inspired",
  },
  {
    quote: "Talent helps, but discipline decides how far you go.",
    from: "Blue Lock inspired",
  },
  {
    quote: "You don't need to be fearless. You just need to keep going.",
    from: "My Hero Academia inspired",
  },
  {
    quote: "Small progress every day eventually becomes something huge.",
    from: "Haikyuu!! inspired",
  },
  {
    quote: "Become stronger than the version of you that existed yesterday.",
    from: "Solo Leveling inspired",
  },
  {
    quote: "The hardest battles often create the strongest people.",
    from: "Vinland Saga inspired",
  },

  {
    quote: "Dream bigger than your current circumstances.",
    from: "One Piece inspired",
  },
  {
    quote: "Your past explains you, but it doesn't have to define you.",
    from: "Naruto inspired",
  },
  {
    quote: "There is always another level if you're willing to work for it.",
    from: "Dragon Ball inspired",
  },
  {
    quote: "When everything feels against you, keep walking anyway.",
    from: "Attack on Titan inspired",
  },
  {
    quote: "Strength means getting back up one more time.",
    from: "Demon Slayer inspired",
  },
  {
    quote: "Stop waiting to feel ready. Start becoming ready.",
    from: "Blue Lock inspired",
  },
  {
    quote: "A real hero keeps going when nobody is watching.",
    from: "My Hero Academia inspired",
  },
  {
    quote: "You don't become great overnight. You build it point by point.",
    from: "Haikyuu!! inspired",
  },
  {
    quote: "If the challenge gets stronger, so should you.",
    from: "Solo Leveling inspired",
  },
  {
    quote: "Winning against yourself is the most important victory.",
    from: "Rocky inspired",
  },

  {
    quote: "Why fall? So you can learn how to rise again.",
    from: "Batman Begins inspired",
  },
  {
    quote: "What you do today shapes who you become tomorrow.",
    from: "Batman inspired",
  },
  {
    quote: "Keep fighting for the person you know you can become.",
    from: "Creed inspired",
  },
  {
    quote: "Pressure doesn't decide your future. Your response does.",
    from: "The Pursuit of Happyness inspired",
  },
  {
    quote: "Great things often begin when someone refuses to quit.",
    from: "Interstellar inspired",
  },
  {
    quote: "You can lose a battle without losing your purpose.",
    from: "Avengers inspired",
  },
  {
    quote: "There is no perfect moment. There is only the decision to begin.",
    from: "Spider-Man inspired",
  },
  {
    quote:
      "Sometimes the impossible only needs someone stubborn enough to try.",
    from: "Iron Man inspired",
  },
  {
    quote:
      "Your biggest competition should always be yesterday's version of you.",
    from: "Anime inspired",
  },
  {
    quote: "Stay hungry enough to learn and patient enough to improve.",
    from: "Shonen anime inspired",
  },
  {
    quote: "Giving up isn't part of the plan. Adapt, improve, continue.",
    from: "Anime inspired",
  },
];

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const today = new Date().getDate();

  const dailyQuote = dailyQuotes[today - 1];

  return (
    <section className="min-h-screen bg-[#070b0f] text-[#d5d9df]">
      {/* ============================= */}
      {/* BANNER */}
      {/* ============================= */}

      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[280px] overflow-hidden bg-gradient-to-br from-[#0c1820] via-[#102430] to-[#090d11]">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80"
          alt="Cover Landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d11] via-[#090d11]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d11]/40 via-transparent to-[#090d11]/40" />

        {/* Inspirational Subtitle Quote Overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
          <div className="text-center max-w-3xl">
            <p className="font-serif italic text-white/90 text-base sm:text-xl md:text-2xl tracking-wide leading-relaxed drop-shadow-md">
              &quot;{dailyQuote.quote}&quot;
            </p>

            <p className="mt-3 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/40">
              {dailyQuote.from}
            </p>
          </div>
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
            technologies. Built production-ready full-stack applications, REST
            APIs and modern responsive user interfaces.
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
              href="/rahul-kapgate-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
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
              Resume
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
                href="https://www.linkedin.com/in/rahul-kapgate"
                icon={faLinkedinIn}
                label="LinkedIn"
              />

              <SocialButton
                href="https://www.x.com/rahul-kapgate"
                icon={faXTwitter}
                label="X"
              />

              <SocialButton
                href="mailto:rahulkapgateyt@gmail.com"
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
