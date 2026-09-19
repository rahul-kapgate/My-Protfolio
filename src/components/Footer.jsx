import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  faCode,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const socialLinks = [
  {
    label: "GITHUB",
    href: "https://github.com/rahul-kapgate",
    icon: faGithub,
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/rahul-kapgate",
    icon: faLinkedinIn,
  },
  {
    label: "X",
    href: "YOUR_X_URL",
    icon: faXTwitter,
  },
  {
    label: "RESUME",
    href: "/rahul-kapgate-resume.pdf",
    icon: faEnvelope,
  }
];

const Footer = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const indiaTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  const indiaDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();

  return (
    <footer className="border-t border-[#151c22] bg-[#070b0f]">
      <div className="mx-auto max-w-[1060px] px-6 pb-12 pt-14 md:px-8">

        {/* SOCIAL LINKS */}

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">

          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={
                item.href.startsWith("mailto:")
                  ? undefined
                  : "_blank"
              }
              rel={
                item.href.startsWith("mailto:")
                  ? undefined
                  : "noreferrer"
              }
              className="
                group
                flex
                items-center
                gap-2
                font-mono
                text-[12px]
                font-bold
                tracking-[0.04em]
                text-[#d0d6dc]
                transition
                hover:text-[#11d9e7]
              "
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-[13px] text-[#9ba7b3] transition group-hover:text-[#11d9e7]"
              />

              <span>
                {item.label}
              </span>

              <span
                className="
                  text-[12px]
                  text-[#778491]
                  transition
                  duration-200
                  group-hover:-translate-y-[2px]
                  group-hover:translate-x-[2px]
                  group-hover:text-[#11d9e7]
                "
              >
                ↗
              </span>
            </a>
          ))}

        </div>

        {/* LOCATION / TIME */}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 font-mono">

          <div className="flex items-center gap-2">
            <span className="h-[9px] w-[9px] rounded-full bg-[#16b982]" />

            <span className="text-[12px] font-bold tracking-[0.08em] text-[#e4e7ea]">
              INDIA
            </span>
          </div>

          <span className="text-[11px] tracking-[0.12em] text-[#87a0bb]">
            {indiaTime}
          </span>

          <span className="text-[11px] tracking-[0.12em] text-[#87a0bb]">
            {indiaDate}
          </span>

        </div>

        {/* SEPARATOR */}

        <div className="mt-14 h-px w-full bg-[#161e25]" />

        {/* COPYRIGHT */}

        <div className="pt-12 text-center">

          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#627a96]">
            © {date.getFullYear()} RAHUL KAPGATE. ALL RIGHTS RESERVED.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;