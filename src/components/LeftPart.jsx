import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function LeftPart() {
  return (
    <div className="bg-custom h-auto w-full lg:w-1/2 text-white font-custom px-10 py-10 pb-24 lg:px-40 lg:py-20 relative ">
      {/* Header */}
      <header>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-300 sm:text-5xl pt-6">
          Rahul Kapgate
        </h1>
        <h2 className="mt-3 text-base lg:text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Software Engineer
        </h2>
        <p className="mt-4 max-w-xs text-slate-400 leading-normal text-sm lg:text-base">
          Passionate about Building Innovative Solutions
        </p>
      </header>

      {/* Navigation */}
      <nav className="hidden lg:block">
        <ul className="mt-8 lg:mt-16 w-max">
          <li className="group flex items-center py-2 lg:py-3 cursor-pointer text-slate-400 hover:text-slate-50">
            <div className="h-[2px] bg-slate-400 transition-all duration-300 mr-3 group-hover:w-20 group-hover:bg-slate-50 w-8"></div>
            <span className="transition-all duration-300 text-sm lg:text-base">
              About
            </span>
          </li>
          <li className="group flex items-center py-2 lg:py-3 cursor-pointer text-slate-400 hover:text-slate-50">
            <div className="h-[2px] bg-slate-400 transition-all duration-300 mr-3 group-hover:w-20 group-hover:bg-slate-50 w-8"></div>
            <span className="transition-all duration-300 text-sm lg:text-base">
              Experience
            </span>
          </li>
          <li className="group flex items-center py-2 lg:py-3 cursor-pointer text-slate-400 hover:text-slate-50">
            <div className="h-[2px] bg-slate-400 transition-all duration-300 mr-3 group-hover:w-20 group-hover:bg-slate-50 w-8"></div>
            <span className="transition-all duration-300 text-sm lg:text-base">
              Projects
            </span>
          </li>
        </ul>
      </nav>

      {/* Social Media Links */}
      <ul className="absolute mt-10 left-1/2 transform -translate-x-1/2 lg:bottom-20 lg:left-40 lg:translate-x-0 flex flex-row space-x-4 lg:space-x-6 items-center">
        <li className="text-slate-400 hover:text-white transition duration-300">
          <a
            href="https://github.com/rahul-kapgate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github Profile"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </li>
        <li className="text-slate-400 hover:text-white transition duration-300">
          <a
            href="https://www.linkedin.com/in/rahul-kapgate/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </li>
        <li className="text-slate-400 hover:text-white transition duration-300">
          <a
            href="https://x.com/Rahul__Kapgate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Profile"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LeftPart;
