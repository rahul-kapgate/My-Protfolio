const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Interfaces, application flows and responsive experiences.",
    skills: [
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
      },
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react/61DAFB",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
      {
        name: "HTML & CSS",
        icon: "https://cdn.simpleicons.org/html5/E34F26",
      },
    ],
  },

  {
    number: "02",
    title: "Mobile",
    description: "Cross-platform mobile applications for Android and iOS.",
    skills: [
      {
        name: "React Native",
        icon: "https://cdn.simpleicons.org/react/61DAFB",
      },
      {
        name: "Expo",
        icon: "https://cdn.simpleicons.org/expo/FFFFFF",
      },
    ],
  },

  {
    number: "03",
    title: "Backend & APIs",
    description: "APIs, services, application logic and integrations.",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.simpleicons.org/python/3776AB",
      },
      {
        name: "FastAPI",
        icon: "https://cdn.simpleicons.org/fastapi/009688",
      },
      {
        name: "Node.js",
        icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      },
      {
        name: "Express.js",
        icon: "https://cdn.simpleicons.org/express/FFFFFF",
      },
    ],
  },

  {
    number: "04",
    title: "Database",
    description: "Relational and document-based data for real applications.",
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.simpleicons.org/mongodb/47A248",
      },
      {
        name: "Supabase",
        icon: "https://cdn.simpleicons.org/supabase/3FCF8E",
      },
      {
        name: "SQL",
        icon: "https://cdn.simpleicons.org/mysql/4479A1",
      },
    ],
  },

  {
    number: "05",
    title: "Authentication",
    description: "Secure identity and application access patterns.",
    skills: [
      {
        name: "JWT",
        icon: "https://cdn.simpleicons.org/jsonwebtokens/FFFFFF",
      },
      {
        name: "Auth0",
        icon: "https://cdn.simpleicons.org/auth0/EB5424",
      },
    ],
  },

  {
    number: "06",
    title: "Cloud & DevOps",
    description: "Deployment, CI/CD, storage and infrastructure fundamentals.",
    skills: [
      {
        name: "AWS",
        icon: "/icons/aws.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.simpleicons.org/docker/2496ED",
      },
      {
        name: "Nginx",
        icon: "https://cdn.simpleicons.org/nginx/009639",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions/2088FF",
      },
      {
        name: "Linux",
        icon: "https://cdn.simpleicons.org/linux/FCC624",
      },
      {
        name: "Networking",
        icon: "https://cdn.simpleicons.org/cisco/1BA0D7",
      },
      {
        name: "Cloudinary",
        icon: "https://cdn.simpleicons.org/cloudinary/3448C5",
      },
      {
        name: "Backblaze B2",
        icon: "https://cdn.simpleicons.org/backblaze/E21E29",
      },
    ],
  },

  {
    number: "07",
    title: "Tools",
    description: "Tools I use for development, debugging and collaboration.",
    skills: [
      {
        name: "Git & GitHub",
        icon: "https://cdn.simpleicons.org/github/FFFFFF",
      },
      {
        name: "Postman",
        icon: "https://cdn.simpleicons.org/postman/FF6C37",
      },
      {
        name: "Figma",
        icon: "https://cdn.simpleicons.org/figma/F24E1E",
      },

      {
        name: "Cursor",
        icon: "https://cdn.simpleicons.org/cursor/FFFFFF",
      },

    ],
  },

  {
    number: "08",
    title: "Services",
    description: "Services used to support and ship production applications.",
    skills: [
      {
        name: "Resend",
        icon: "https://cdn.simpleicons.org/resend/FFFFFF",
      },
      {
        name: "Netlify",
        icon: "https://cdn.simpleicons.org/netlify/00C7B7",
      },
      {
        name: "Render",
        icon: "https://cdn.simpleicons.org/render/FFFFFF",
      },
      {
        name: "Supabase Storage",
        icon: "https://cdn.simpleicons.org/supabase/3FCF8E",
      },
    ],
  },
];

const Skills = () => {
  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0,
  );

  return (
    <section
      id="skills"
      className="border-t border-[#161d23] bg-[#070b0f] py-24 text-[#d5d9df]"
    >
      <div className="mx-auto max-w-[1060px] px-6 md:px-8">

        {/* HEADER */}

        <div>
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[#09d8e7]">
            // TECH STACK
          </p>

          <h2 className="mt-3 font-mono text-[32px] font-bold tracking-[-1px] text-[#f4f5f7] md:text-[39px]">
            Skills & Technologies
          </h2>
        </div>

        {/* SKILL GROUPS */}

        <div className="mx-auto mt-14 max-w-[780px] space-y-12">
          {skillGroups.map((group) => (
            <SkillGroup key={group.number} group={group} />
          ))}
        </div>

        {/* FOOTER */}

        <div className="mt-16 flex flex-col items-center justify-center gap-2 border-t border-[#182128] pt-8 font-mono">
          <p className="text-[13px] text-[#8995a1]">
            Always learning. Always refining the stack.
          </p>

          <p className="text-[11px] text-[#53616e]">
            {totalSkills} technologies
          </p>
        </div>
      </div>
    </section>
  );
};

const SkillGroup = ({ group }) => {
  return (
    <div className="text-center">

      {/* CATEGORY */}

      <div className="mb-5">
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-[10px] text-[#09d8e7]">
            {group.number}
          </span>

          <h3 className="font-mono text-[18px] font-bold text-[#f1f3f5] md:text-[20px]">
            {group.title}
          </h3>
        </div>

        <p className="mx-auto mt-2 max-w-[500px] font-mono text-[11px] leading-[1.6] text-[#667583]">
          {group.description}
        </p>
      </div>

      {/* TECHNOLOGIES */}

      <div className="flex flex-wrap justify-center gap-2.5">
        {group.skills.map((skill) => (
          <SkillCard
            key={`${group.title}-${skill.name}`}
            skill={skill}
          />
        ))}
      </div>
    </div>
  );
};

const SkillCard = ({ skill }) => {
  return (
    <div
      className="
        group
        flex
        h-[78px]
        w-[104px]
        cursor-default
        flex-col
        items-center
        justify-center
        gap-2
        rounded-[4px]
        border
        border-[#29323a]
        bg-[#11171c]
        transition
        duration-200
        hover:-translate-y-[2px]
        hover:border-[#40505b]
        hover:bg-[#151c22]
      "
    >
      <img
        src={skill.icon}
        alt=""
        loading="lazy"
        className="
          h-[29px]
          w-[29px]
          object-contain
          transition
          duration-200
          group-hover:scale-110
        "
      />

      <span
        className="
          max-w-[94px]
          truncate
          px-1
          font-mono
          text-[10px]
          text-[#a9b1b9]
          transition
          group-hover:text-[#f0f2f4]
        "
      >
        {skill.name}
      </span>
    </div>
  );
};

export default Skills;