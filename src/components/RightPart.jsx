import React from "react";

function RightPart() {
  return (
    <div className="bg-custom h-auto w-full lg:w-1/2 2xl:h-auto text-slate-400 font-custom px-6 py-8 lg:px-10 lg:py-10 2xl:py-10 flex items-center justify-center overflow-y-auto flex-wrap">
      {/* About */}
      <div className="max-w-4xl w-full 2xl:mt-16">
        <p className="text-left text-md lg:text-base xl:pr-10 xl:-mr-10 2xl:mr-10 2xl:-ml-10">
          <h1 className="text-xl font-bold text-whiteh xl:hidden pb-5">
            About
          </h1>
          I'm a software developer passionate about building secure, scalable,
          and user-focused applications. My work blends development with system
          optimization to create robust and efficient solutions.
          <br />
          <br />
          I’ve contributed to web platforms that improved performance and
          accessibility, implemented clean APIs, and designed responsive UIs
          that scale well across devices.
          <br />
          <br />
          Beyond tech, I love exploring new places, playing cricket and kabaddi,
          and editing videos. Also, a curious space enthusiast!
        </p>
      </div>

      {/* Experience */}
      <h1 className="text-xl font-bold text-whiteh xl:hidden mt-10 mr-auto">
        Experience
      </h1>

      <div className="lg:-ml-40 flex flex-col md:flex-row rounded-lg shadow-lg mt-1 lg:mt-20 pr-3">
        <div className="text-xs mt-8 px-3 text-gray-400">JAN 25 — PRESENT</div>
        <div className="bg-custom text-white p-6 max-w-md w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-300">
              Full Stack Developer
            </h3>
          </div>
          <p className="text-sm text-teal-400 mt-2">Bangalore, India</p>
          <p className="mt-4 text-slate-400 text-sm lg:text-sm">
            As a Full Stack Developer, I actively contribute to multiple
            projects, ensuring seamless development from frontend to backend. I
            collaborate closely with Testing and DevOps teams to enhance
            software quality, optimize deployment processes, and drive efficient
            development workflows.
          </p>
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

      <div className="lg:-ml-40 flex flex-col md:flex-row rounded-lg shadow-lg mt-1 lg:mt-5 pr-3">
        <div className="text-xs mt-8 px-3 text-gray-400">July 24 — SEPT 24</div>
        <div className="bg-custom text-white p-6 max-w-md w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-300">
              System Administrator, Intern
            </h3>
          </div>
          <p className="text-sm text-teal-400 mt-2">
            Micropro Software Solutions Private Limited, Nagpur
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

