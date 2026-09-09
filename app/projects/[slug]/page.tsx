import { PRIMARY_PROJECTS, SECONDARY_PROJECTS } from '../../../data/portfolio';
import { SpotlightCard } from '../../../components/SpotlightCard';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const allProjects = [...PRIMARY_PROJECTS, ...SECONDARY_PROJECTS];
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const allProjects = [...PRIMARY_PROJECTS, ...SECONDARY_PROJECTS];
  const project = allProjects.find(p => p.id === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#070809] flex items-center justify-center text-[#D7FF00] font-mono">
        &gt; SYSTEM ERROR: PROJECT NOT FOUND
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070809] text-white selection:bg-[#D7FF00] selection:text-black font-sans pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070809]/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group outline-none">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black text-sm tracking-tighter group-hover:bg-[#D7FF00] transition-colors">
              &lt;
            </div>
            <span className="font-mono text-xs tracking-widest text-white/70 group-hover:text-[#D7FF00] transition-colors">RETURN</span>
          </Link>
          <div className="font-mono text-[10px] text-white/50 tracking-widest">
            {project.id.toUpperCase()} // SPEC
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D7FF00]" />
          <span>{project.category}</span>
        </div>
        <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter mb-4 text-white">
          {project.title}
        </h1>
        <p className="font-mono text-sm sm:text-base text-white/40 uppercase tracking-widest mb-12">
          {project.subtitle}
        </p>

        {/* Hero Image */}
        {project.imageSrc && (
          <SpotlightCard className="w-full h-[300px] sm:h-[500px] lg:h-[700px] mb-16 rounded border border-white/10 relative overflow-hidden group">
            <img
              src={project.imageSrc}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070809] to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#D7FF00] tracking-widest">
              ASSET: {project.id}_hero_image.png
            </div>
          </SpotlightCard>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                SYSTEM DESCRIPTION
              </h2>
              <p className="font-sans text-lg sm:text-xl text-[#9AA0A3] leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                TECHNICAL STACK
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-[#111416] border border-white/10 text-white/80 text-xs font-mono uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                METRICS
              </h2>
              <div className="space-y-2 font-mono text-xs text-[#D7FF00]">
                {project.metrics ? project.metrics.map(m => (
                  <div key={m}>&gt; {m}</div>
                )) : <div>&gt; NO METRICS LOGGED</div>}
              </div>
            </div>

            <div className="pt-6">
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-[#D7FF00] text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#D7FF00]/10">
                <span>LAUNCH DEPLOYMENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
