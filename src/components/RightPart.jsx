import React from "react";

function RightPart() {
  return (
    <div className="bg-custom h-auto w-full lg:w-1/2 2xl:h-auto text-slate-400  font-custom px-6 py-8 lg:px-10 lg:py-10 2xl:py-10 flex items-center justify-center overflow-y-auto flex-wrap  ">
      {/* About */}
      <div className="max-w-4xl w-full 2xl:mt-16">
        <p className="text-left text-md lg:text-base xl:pr-10 xl:-mr-10 2xl:mr-10 2xl:-ml-10">
          <h1 className="text-xl font-bold text-whiteh xl:hidden pb-5">
            About
          </h1>
          I’m a developer passionate about creating secure, intuitive, and
          scalable software solutions that enhance user experiences while
          optimizing workflows. My work combines development with systems
          optimization to deliver applications and infrastructures that are
          functional, robust, and efficient.
          <br />
          <br />
          During my Software Engineer Internship at{" "}
          <span className=" text-white">Bliinc Innovations Pvt. Ltd.</span>, I
          contributed to developing a Patient Management System web application
          that improved security and accessibility for patient data. This
          solution enabled healthcare providers to manage information
          efficiently, reducing retrieval time by 40% and significantly
          streamlining administrative workflows.
          <br />
          <br />
          In my System Administrator Internship at{" "}
          <span className=" text-white">
            {" "}
            Micropro Software Solutions Private Limited{" "}
          </span>
          I ensured seamless software integration with existing infrastructures,
          automated system monitoring tasks, and deployed scalable cloud
          environments to enhance operational efficiency and support testing and
          deployment pipelines.
          <br />
          <br />
          Outside of coding, I enjoy exploring new destinations, playing outdoor
          sports like cricket and kabaddi, or capturing moments through video
          editing. A space enthusiast at heart .
        </p>
      </div>

      {/* Expriance */}
      <h1 className="text-xl font-bold text-whiteh xl:hidden mt-10 mr-auto">
        Expriance
      </h1>

      <div className="lg:-ml-40 flex flex-col md:flex-row rounded-lg shadow-lg mt-1 lg:mt-20 pr-3">
        <div className="text-xs mt-8 px-3 text-gray-400">JAN 25 — PRESENT</div>
        <div className="bg-custom text-white p-6 max-w-md w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-300">
              Full Stack Developer
            </h3>
          </div>
          <p className="text-sm text-teal-400 mt-2">
            Sirpi Data Science, Bangalore
          </p>
          <p className="mt-4 text-slate-400 text-sm lg:text-sm">
As a Full Stack Developer, I actively contribute to multiple projects, ensuring seamless development from frontend to backend. I collaborate closely with Testing and DevOps teams to enhance software quality, optimize deployment processes, and drive efficient development workflows          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              React
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Fast API
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Shandcn UI
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Docker
            </span>
          </div>
        </div>
      </div>


      <div className="lg:-ml-40 flex flex-col md:flex-row rounded-lg shadow-lg mt-1 lg:mt-20 pr-3">
        <div className="text-xs mt-8 px-3 text-gray-400">OCT 23 — MAR 24</div>
        <div className="bg-custom text-white p-6 max-w-md w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-300">
              Frontend Engineer, Intern
            </h3>
          </div>
          <p className="text-sm text-teal-400 mt-2">
            Bliinc Innovations Pvt. Ltd. , Nagpur
          </p>
          <p className="mt-4 text-slate-400 text-sm lg:text-sm">
            Developed a Patient Management System for healthcare providers to
            access previous patient information efficiently. Optimized
            processes, achieving a 40% reduction in data retrieval time.
            <br />
            Collaborated with cross-functional teams to design and implement
            scalable features. Contributed to improving the system's user
            interface for better accessibility.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              JavaScript
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Tailwind
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              HTML
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              CSS
            </span>
          </div>
        </div>
      </div>


      <div className="lg:-ml-40 flex flex-col md:flex-row rounded-lg shadow-lg mt-1 lg:mt-5 pr-3">
        <div className="text-xs mt-8 px-3 text-gray-400">APR 24 — SEPT 24</div>
        <div className="bg-custom text-white p-6 max-w-md w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-300">
              System Administrator, Intern
            </h3>
          </div>
          <p className="text-sm text-teal-400 mt-2">
            Micropro Software Solutions Private Limited , Nagpur
          </p>
          <p className="mt-4 text-slate-400 text-sm lg:text-sm">
            Collaborated with development teams to align system requirements
            with software goals, ensuring seamless integration of software
            solutions into existing infrastructure.
            <br />
            Automated system monitoring and maintenance tasks using scripting
            tools, reducing manual effort and improving efficiency.
            <br />
            Enhanced cloud infrastructure knowledge by deploying scalable
            environments that supported software testing and deployment
            pipelines.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Linux
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Networking
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Shell Scripting
            </span>
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              Databases
            </span>
          </div>
        </div>
      </div>


    </div>
    
  );
}

export default RightPart;
