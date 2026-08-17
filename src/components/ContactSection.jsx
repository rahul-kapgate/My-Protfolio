import { ArrowUpRight, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.015] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88dvh] w-full max-w-7xl flex-col justify-between px-5 py-24 sm:px-8 lg:px-12">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Contact</span>
            <span className="h-px w-12 bg-white/10" />
            <span className="font-mono text-[9px] text-zinc-700">ready for the next build</span>
          </div>

          <div className="max-w-5xl">
            <h2 className="text-[42px] font-semibold leading-[1.05] tracking-[-0.05em] text-zinc-100 sm:text-6xl md:text-7xl lg:text-[82px]">Have something</h2>
            <p className="text-[42px] font-semibold leading-[1.05] tracking-[-0.05em] text-zinc-500 sm:text-6xl md:text-7xl lg:text-[82px]">interesting to build?</p>
          </div>

          <div className="mt-10 grid max-w-6xl gap-8 border-t border-white/[0.08] pt-7 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-xl">
              <p className="text-sm leading-7 text-zinc-400 sm:text-base">I&apos;m open to full-stack engineering opportunities and interesting products where I can work across the complete application lifecycle.</p>
              <a href="mailto:rahulkapgateyt@gmail.com" className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-200 transition hover:text-white">
                <Mail size={15} />
                rahulkapgateyt@gmail.com
              </a>
            </div>

            <a href="mailto:rahulkapgateyt@gmail.com" className="group inline-flex h-12 w-fit items-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition hover:bg-zinc-200">
              Let&apos;s talk
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <footer className="mt-20 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs text-zinc-600">Designed &amp; built by Rahul Kapgate.</p>
              <p className="mt-1 font-mono text-[9px] text-zinc-700">React · Three.js · Framer Motion</p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <a href="https://github.com/rahul-kapgate" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 transition hover:text-white">GitHub</a>
              <a href="https://linkedin.com/in/rahul-kapgate" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 transition hover:text-white">LinkedIn</a>
              <a href="/rahul-kapgate-resume.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 transition hover:text-white">Resume</a>
              <span className="text-xs text-zinc-800">© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
