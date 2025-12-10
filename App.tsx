import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, FileText, Download, Github, Linkedin, ExternalLink, ChevronDown, Menu, X, 
  MessageSquare, Send, Code, Layers, Cpu, Database, Terminal, Sparkles, GraduationCap, 
  Users, Globe, Zap, Heart, Search, UploadCloud, GitPullRequest, Link as LinkIcon, Mail,
  // New Icons for Enhanced Mapping
  Calculator, Atom, Beaker, Binary, Brain, Gamepad2, Palette, Cloud, Server, Shield, 
  Briefcase, Smartphone, Monitor
} from 'lucide-react';
import Background3D from './components/Background3D';
import { SEMESTERS, PRACTICALS, CONTRIBUTOR, HERO_IMAGE, REPO_LINK, UPLOAD_LINK } from './constants';
import { Semester, Subject } from './types';

// Enhanced vibrant color themes with HEX for 3D Context
const THEMES = [
  { 
    name: 'Neon Cyan',
    primaryHex: '#22d3ee', // cyan-400
    secondaryHex: '#3b82f6', // blue-500
    gradient: 'from-blue-500 via-cyan-400 to-teal-300',
    border: 'hover:border-cyan-300',
    bgHover: 'hover:bg-cyan-400/10',
    text: 'text-cyan-300',
    badge: 'bg-cyan-500',
    glow: 'shadow-cyan-400/30'
  },
  { 
    name: 'Cyber Pink',
    primaryHex: '#e879f9', // fuchsia-400
    secondaryHex: '#a855f7', // purple-500
    gradient: 'from-purple-500 via-fuchsia-400 to-pink-300',
    border: 'hover:border-fuchsia-300',
    bgHover: 'hover:bg-fuchsia-400/10',
    text: 'text-fuchsia-300',
    badge: 'bg-fuchsia-500',
    glow: 'shadow-fuchsia-400/30'
  },
  { 
    name: 'Solar Flare',
    primaryHex: '#fb923c', // orange-400
    secondaryHex: '#ef4444', // red-500
    gradient: 'from-red-500 via-orange-400 to-amber-300',
    border: 'hover:border-orange-300',
    bgHover: 'hover:bg-orange-400/10',
    text: 'text-orange-300',
    badge: 'bg-orange-500',
    glow: 'shadow-orange-400/30'
  },
  { 
    name: 'Toxic Lime',
    primaryHex: '#4ade80', // green-400
    secondaryHex: '#10b981', // emerald-500
    gradient: 'from-emerald-500 via-green-400 to-lime-300',
    border: 'hover:border-green-300',
    bgHover: 'hover:bg-green-400/10',
    text: 'text-green-300',
    badge: 'bg-green-500',
    glow: 'shadow-green-400/30'
  },
  { 
    name: 'Electric Indigo',
    primaryHex: '#818cf8', // indigo-400
    secondaryHex: '#8b5cf6', // violet-500
    gradient: 'from-violet-500 via-indigo-400 to-blue-300',
    border: 'hover:border-indigo-300',
    bgHover: 'hover:bg-indigo-400/10',
    text: 'text-indigo-300',
    badge: 'bg-indigo-500',
    glow: 'shadow-indigo-400/30'
  },
  { 
    name: 'Sunset Rose',
    primaryHex: '#f472b6', // pink-400
    secondaryHex: '#f43f5e', // rose-500
    gradient: 'from-rose-500 via-pink-400 to-yellow-300',
    border: 'hover:border-rose-300',
    bgHover: 'hover:bg-rose-400/10',
    text: 'text-rose-300',
    badge: 'bg-rose-500',
    glow: 'shadow-rose-400/30'
  }
];

// --- INTERACTIVE COMPONENTS ---

// 1. Tilt Card Component for 3D Interaction
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on mobile for better scrolling performance
    if (!ref.current || window.innerWidth < 768) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt degrees
    const maxTilt = 8;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt; 
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-transform duration-100 ease-out will-change-transform spotlight-card relative`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

// 2. Typewriter Effect Hook
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{displayText}</span>;
};

// 3. Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);
            
            setCount(Math.floor(ease * end));
            
            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};

// 4. Reveal Animation Component
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// 5. Search Modal Component
interface SearchResult {
  type: 'Note' | 'Paper' | 'Lab' | 'Material';
  title: string;
  subtitle: string;
  link: string;
  icon: React.ElementType;
}

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      setQuery(''); // Reset query on close
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Filter Logic
  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const res: SearchResult[] = [];

    // Search Subjects
    SEMESTERS.forEach(sem => {
      sem.subjects.forEach(sub => {
        if (sub.name.toLowerCase().includes(lowerQuery)) {
           // Notes
           if (sub.notesLink && sub.notesLink !== '#') {
             res.push({ 
               type: sub.name === 'Internship' ? 'Material' : 'Note', 
               title: sub.name, 
               subtitle: `${sem.title} ${sub.name === 'Internship' ? 'Resources' : 'Notes'}`, 
               link: sub.notesLink, 
               icon: FileText 
             });
           }
           // Papers
           if (sub.papersLink && sub.papersLink !== '#') {
             res.push({ 
               type: 'Paper', 
               title: sub.name, 
               subtitle: `${sem.title} Question Papers`, 
               link: sub.papersLink, 
               icon: Download 
             });
           }
        }
      });
    });

    // Search Practicals
    PRACTICALS.forEach(prac => {
       if (prac.name.toLowerCase().includes(lowerQuery)) {
         res.push({ 
           type: 'Lab', 
           title: prac.name, 
           subtitle: 'Practical Manual & Codes', 
           link: prac.link, 
           icon: Code 
         });
       }
    });

    return res.slice(0, 10); // Limit results
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-10 md:pt-24 px-4">
       {/* Backdrop */}
       <div 
         className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200" 
         onClick={onClose}
       ></div>

       {/* Modal Content */}
       <div className="relative bg-slate-900/90 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/10 flex flex-col max-h-[80vh]">
          <div className="flex items-center border-b border-slate-800 p-4 bg-slate-900 sticky top-0 z-10">
             <Search className="w-5 h-5 text-blue-400 mr-3" />
             <input
               ref={inputRef}
               type="text"
               placeholder="Search for notes, papers, or labs..."
               className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg font-medium"
               value={query}
               onChange={e => setQuery(e.target.value)}
             />
             <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">ESC</span>
             </div>
             <button onClick={onClose} className="md:hidden ml-2"><X className="w-5 h-5 text-slate-400" /></button>
          </div>

          <div className="overflow-y-auto p-2 scrollbar-hide">
             {query.trim() === '' ? (
                <div className="py-12 px-6 text-center text-slate-500">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                      <Search className="w-8 h-8 opacity-40" />
                   </div>
                   <p className="text-sm font-medium">Type to search across notes, question papers, and practicals.</p>
                </div>
             ) : results.length > 0 ? (
                <div className="space-y-1">
                   {results.map((res, idx) => (
                      <a 
                        href={res.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        key={idx} 
                        className="flex items-center p-3 hover:bg-slate-800/80 rounded-xl group transition-all duration-200 border border-transparent hover:border-slate-700"
                        onClick={onClose}
                      >
                         <div className={`p-2.5 rounded-lg mr-4 transition-colors ${
                            res.type === 'Lab' ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' :
                            res.type === 'Paper' ? 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20' :
                            'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
                         }`}>
                            <res.icon className="w-5 h-5" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="text-slate-200 font-medium group-hover:text-white transition-colors truncate">
                              {res.title}
                            </h4>
                            <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                                res.type === 'Lab' ? 'bg-purple-500' :
                                res.type === 'Paper' ? 'bg-orange-500' :
                                'bg-blue-500'
                              }`}></span>
                              {res.subtitle}
                            </p>
                         </div>
                         <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 ml-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </a>
                   ))}
                </div>
             ) : (
                <div className="py-12 text-center text-slate-500">
                   <p>No results found for "<span className="text-slate-300">{query}</span>"</p>
                </div>
             )}
          </div>
          
          {/* Footer hint */}
          {results.length > 0 && (
             <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-right">
                <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wide">
                  {results.length} results found
                </span>
             </div>
          )}
       </div>
    </div>
  );
};

// 6. Contribute/Upload Modal
const ContributeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'code'>('files');
  const [subject, setSubject] = useState('');
  const [link, setLink] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isOpen]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = () => {
    if (activeTab === 'files') {
      // Create mailto for file contribution
      const body = `Hi,\n\nI would like to contribute resources for:\nSubject: ${subject}\n\nLink to resources (Drive/Cloud): ${link}\n\n(Or attach your files to this email)`;
      window.open(`mailto:?subject=Resource Contribution for CSD Hub&body=${encodeURIComponent(body)}`);
    } else {
      // Redirect to GitHub Issues for code
      const body = `Hi,\n\nI would like to contribute code/practical solutions.\n\nSubject: ${subject}\nLink to Code (GitHub/Gist): ${link}\n\nDescription:`;
      window.open(`${REPO_LINK}/issues/new?title=Code Contribution: ${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
       <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}></div>
       
       <div className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-blue-400" />
              Contribute Resources
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button 
              onClick={() => setActiveTab('files')}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'files' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              Upload Notes / Papers
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'code' ? 'border-purple-500 text-purple-400 bg-purple-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              Submit Practical Code
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 bg-slate-800/30">
             {activeTab === 'files' ? (
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200 flex items-start gap-3">
                    <UploadCloud className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>To keep this hub high-quality, please share a Google Drive link to your notes or attach them via email.</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-600 transition-all"
                      placeholder="e.g. Data Structures, AI..."
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Drive Link (Optional)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-600 transition-all"
                        placeholder="https://drive.google.com/..."
                        value={link}
                        onChange={e => setLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
             ) : (
               <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-200 flex items-start gap-3">
                    <GitPullRequest className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>We love open source! Share a GitHub Gist or Repo link. We'll add it to the practicals list.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Practical / Lab Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-600 transition-all"
                      placeholder="e.g. Operating Systems Lab 4"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Repo / Gist Link</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-600 transition-all"
                        placeholder="https://github.com/..."
                        value={link}
                        onChange={e => setLink(e.target.value)}
                      />
                    </div>
                  </div>
               </div>
             )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-3">
             <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors">Cancel</button>
             <button 
               onClick={handleSubmit}
               className={`px-5 py-2 rounded-lg text-white font-bold flex items-center gap-2 shadow-lg transition-all transform active:scale-95 ${
                 activeTab === 'files' 
                   ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' 
                   : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
               }`}
             >
               {activeTab === 'files' ? <Mail className="w-4 h-4"/> : <Github className="w-4 h-4"/>}
               {activeTab === 'files' ? 'Send via Email' : 'Submit via GitHub'}
             </button>
          </div>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSem, setActiveSem] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  
  const activeTheme = THEMES[currentThemeIndex];
  
  const cycleTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  // Track mouse for global spotlight effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Disable heavy spotlight calc on mobile
      if (window.innerWidth < 768) return;
      
      const cards = document.querySelectorAll('.spotlight-card');
      
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSem = (id: number) => {
    setActiveSem(activeSem === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const handleFeedback = () => {
    if (!feedbackMsg.trim()) return;
    const body = encodeURIComponent(feedbackMsg);
    window.open(`${REPO_LINK}/issues/new?body=${body}`, '_blank');
    setFeedbackMsg('');
  };

  const getSubjectIcon = (name: string) => {
    const n = name.toLowerCase();
    
    // Mathematics & Statistics
    if (n.includes('math') || n.includes('statistics') || n.includes('discrete')) return <Calculator className="w-5 h-5" />;
    
    // Sciences
    if (n.includes('physics')) return <Atom className="w-5 h-5" />;
    if (n.includes('chemistry')) return <Beaker className="w-5 h-5" />;
    
    // Core CS & Algorithms
    if (n.includes('data structure') || n.includes('algorithm')) return <Binary className="w-5 h-5" />;
    if (n.includes('operating system') || n.includes('os') || n.includes('linux')) return <Server className="w-5 h-5" />;
    
    // Programming Languages
    if (n.includes('programming') || n.includes('c++') || n.includes('java') || n.includes('python')) return <Terminal className="w-5 h-5" />;
    
    // Web & Mobile
    if (n.includes('app') || n.includes('mobile') || n.includes('android')) return <Smartphone className="w-5 h-5" />;
    
    // Data & AI
    if (n.includes('ai') || n.includes('intelligence') || n.includes('deep learning') || n.includes('neural')) return <Brain className="w-5 h-5" />;
    if (n.includes('data') || n.includes('database') || n.includes('dbms') || n.includes('big data')) return <Database className="w-5 h-5" />;
    
    // Hardware & Electronics
    if (n.includes('electronics') || n.includes('iot') || n.includes('hardware') || n.includes('embedded') || n.includes('digital') || n.includes('processor')) return <Cpu className="w-5 h-5" />;
    
    // Graphics, Gaming & VR
    if (n.includes('graphics') || n.includes('game') || n.includes('ar') || n.includes('vr') || n.includes('multimedia')) return <Gamepad2 className="w-5 h-5" />;
    
    // Networking & Cloud
    if (n.includes('network') || n.includes('cloud') || n.includes('distributed')) return <Cloud className="w-5 h-5" />;
    
    // Security & Blockchain
    if (n.includes('security') || n.includes('blockchain') || n.includes('crypto')) return <Shield className="w-5 h-5" />;
    
    // Design & UI/UX
    if (n.includes('design') || n.includes('ui') || n.includes('ux')) return <Palette className="w-5 h-5" />;
    
    // Professional & Management
    if (n.includes('business') || n.includes('management') || n.includes('internship') || n.includes('project')) return <Briefcase className="w-5 h-5" />;
    
    // Drawing/Engineering
    if (n.includes('drawing')) return <Monitor className="w-5 h-5" />;

    return <BookOpen className="w-5 h-5" />;
  };

  const getTheme = (index: number) => THEMES[index % THEMES.length];

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-pink-500/30 overflow-hidden w-full">
      <Background3D primaryColor={activeTheme.primaryHex} secondaryColor={activeTheme.secondaryHex} />
      
      {/* Search Modal Overlay */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Upload/Contribute Modal */}
      <ContributeModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
      
      {/* Vibrant Background Blobs - Animated */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-1 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-pink-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${activeTheme.gradient} rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200`}></div>
                <div className="relative bg-slate-900 p-1.5 rounded-lg border border-white/10">
                   <Code className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className={`font-bold text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient} animate-text-gradient`}>
                KKW CSD Hub
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Trigger (Desktop) */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-lg text-sm text-slate-400 hover:text-white transition-all group mr-2 w-48"
              >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <span className="ml-auto text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-slate-500 group-hover:text-slate-400">Ctrl K</span>
              </button>

              <div className="flex items-center space-x-1">
                {['Home', 'Semesters', 'Practicals', 'Feedback', 'About'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())} 
                    className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/10 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{item}</span>
                  </button>
                ))}

                {/* Theme Switcher Button */}
                <button
                  onClick={cycleTheme}
                  className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 text-white/80 hover:text-white bg-gradient-to-br ${activeTheme.gradient} bg-opacity-10 hover:shadow-lg`}
                  title={`Current Theme: ${activeTheme.name}`}
                  style={{ backgroundClip: 'padding-box' }}
                >
                  <Palette className="w-5 h-5" />
                </button>
                
                {/* Upload Button */}
                <button 
                   onClick={() => setUploadOpen(true)}
                   className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all hover:scale-110 active:scale-95"
                   title="Upload / Contribute"
                >
                   <UploadCloud className="w-5 h-5" />
                </button>

                <a 
                  href={REPO_LINK} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="ml-2 p-2 text-slate-400 hover:text-white transition-all hover:rotate-12 hover:scale-110 hover:bg-white/10 rounded-full"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={cycleTheme}
                className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Palette className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setUploadOpen(true)}
                className="p-2 rounded-md text-blue-400 hover:bg-blue-500/10 transition-colors"
              >
                <UploadCloud className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute w-full glass-nav border-b border-slate-700 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Home', 'Semesters', 'Practicals', 'Feedback', 'About'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="block w-full text-left px-4 py-4 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-transparent active:bg-white/10 transition-all"
              >
                {item}
              </button>
            ))}
            <button 
                onClick={() => { setUploadOpen(true); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-4 rounded-xl text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-transparent active:bg-blue-500/20 transition-all flex items-center gap-2"
            >
                <UploadCloud className="w-5 h-5" /> Contribute / Upload
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[100dvh] pt-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center animate-fade-in-up">
            <div className="text-left space-y-6 md:space-y-8 order-2 md:order-1 relative z-10">
               <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/60 border ${activeTheme.border} backdrop-blur-md text-xs md:text-sm font-medium ${activeTheme.text} shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-colors cursor-default`}>
                 <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeTheme.badge} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${activeTheme.badge}`}></span>
                  </span>
                 Updated for 2024-25 Batch
               </div>
               
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                 <span className="block text-white mb-2 drop-shadow-xl text-3xl sm:text-4xl md:text-6xl typing-cursor min-h-[4rem] md:min-h-auto">
                    <Typewriter text="Computer Science & Design" delay={70} />
                 </span>
                 <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient} animate-text-gradient text-glow`}>
                   Resource Hub
                 </span>
               </h1>
               
               <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg drop-shadow-md">
                 Unlock your potential with our curated collection of notes, question papers, and practical solutions.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
                 <button 
                  onClick={() => scrollToSection('semesters')} 
                  className="group relative px-8 py-4 bg-transparent rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto text-center"
                >
                   <div className="absolute inset-0 animated-border-gradient opacity-100 rounded-xl"></div>
                   <div className="absolute inset-[2px] bg-slate-900 rounded-[10px] z-10"></div>
                   <div className={`relative z-20 flex items-center justify-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${activeTheme.gradient} transition-all`}>
                     <BookOpen className={`w-5 h-5 text-white group-hover:${activeTheme.text}`} /> 
                     Start Learning
                   </div>
                 </button>

                 <button 
                  onClick={() => scrollToSection('practicals')} 
                  className="px-8 py-4 glass-card text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 w-full sm:w-auto"
                 >
                   <Code className="w-5 h-5" /> Lab Manuals
                 </button>

                 <a 
                  href={UPLOAD_LINK} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-4 glass-card text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 w-full sm:w-auto"
                 >
                   <UploadCloud className="w-5 h-5" /> Upload Notes
                 </a>
               </div>
            </div>

            <TiltCard className="order-1 md:order-2 relative group perspective-1000 w-full">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform transition-all duration-500 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-pink-900/40 opacity-80 z-10 mix-blend-overlay"></div>
                <img 
                  src={HERO_IMAGE} 
                  alt="KKW College" 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
                  <div className={`glass-panel p-3 sm:p-4 rounded-xl inline-block border-l-4 ${activeTheme.border} bg-black/60 backdrop-blur-md`}>
                    <p className={`text-[10px] sm:text-xs font-mono ${activeTheme.text} mb-1 flex items-center gap-1`}><GraduationCap size={12}/> EXCELLENCE</p>
                    <p className="font-bold text-white text-base sm:text-lg">KKW CSD Department</p>
                  </div>
                </div>
              </div>
              {/* Image Back Glow */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${activeTheme.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10 animate-pulse`}></div>
            </TiltCard>
          </div>

          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('semesters')}>
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </section>

        {/* Semesters Section */}
        <section id="semesters" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Academic Archives
            </h2>
            <div className={`h-1.5 w-24 bg-gradient-to-r ${activeTheme.gradient} mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]`}></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              Select your semester to access notes, papers, and resources tailored for you.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 spotlight-group">
            {SEMESTERS.map((sem: Semester, index) => {
              const theme = getTheme(index);
              const isActive = activeSem === sem.id;
              
              return (
                <Reveal key={sem.id} delay={index * 100}>
                  <div className="group perspective-500 transition-all duration-300 ease-out hover:scale-[1.02] hover:-rotate-1 hover:z-20 relative">
                    <TiltCard 
                      className={`glass-card rounded-2xl overflow-hidden border transition-all duration-500 relative ${isActive ? `border-transparent ring-2 ring-offset-2 ring-offset-slate-950 ring-${theme.badge.split('-')[1]}-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]` : 'border-slate-800 hover:border-slate-600'}`}
                    >
                      {/* Active State Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-10' : ''}`}></div>

                      <button 
                        onClick={() => toggleSem(sem.id)}
                        className={`relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between text-left transition-all duration-300 ${isActive ? 'bg-slate-900/50' : 'hover:bg-slate-800/40'}`}
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xl sm:text-3xl shadow-lg transition-all duration-300 transform group-hover:rotate-12 ${isActive ? `bg-gradient-to-br ${theme.gradient} text-white scale-110 shadow-${theme.badge.split('-')[1]}-500/50` : 'bg-slate-800 text-slate-500 group-hover:text-white'}`}>
                            {sem.id}
                          </div>
                          <div>
                            <h3 className={`text-lg sm:text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                              {sem.title}
                            </h3>
                            <p className={`text-xs sm:text-sm font-medium ${isActive ? theme.text : 'text-slate-500'}`}>
                              {sem.subjects.length} Modules Available
                            </p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-slate-800/50 transition-all duration-500 border border-slate-700 ${isActive ? `rotate-180 bg-gradient-to-br ${theme.gradient} text-white border-transparent` : 'text-slate-500 group-hover:text-white group-hover:border-slate-500'}`}>
                          <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                      </button>
                      
                      {isActive && (
                        <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 border-t border-white/5 bg-black/20 animate-fade-in-up relative z-10">
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                            {sem.subjects.map((sub: Subject, idx) => (
                              <div key={idx} 
                                className={`p-4 sm:p-5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-${theme.badge.split('-')[1]}-400/50 transition-all flex flex-col justify-between group/card hover:bg-slate-800/80 duration-300 shadow-lg relative overflow-hidden`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                              >
                                {/* Hover Glow Effect */}
                                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${theme.badge.split('-')[1]}-500/20 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity`}></div>

                                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 relative z-10">
                                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${theme.gradient} shadow-lg text-white group-hover/card:scale-110 transition-transform flex-shrink-0`}>
                                    {getSubjectIcon(sub.name)}
                                  </div>
                                  <h4 className="font-semibold text-slate-100 text-base sm:text-lg leading-snug group-hover/card:text-white transition-colors">{sub.name}</h4>
                                </div>
                                
                                <div className="flex flex-col xs:flex-row gap-3 mt-auto relative z-10">
                                  {sub.notesLink && sub.notesLink !== '#' ? (
                                    <a href={sub.notesLink} target="_blank" rel="noreferrer" className={`flex-1 flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-${theme.badge.split('-')[1]}-600 text-slate-300 hover:text-white border border-slate-600 hover:border-${theme.badge.split('-')[1]}-400 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] shadow-sm`}>
                                      <FileText className="w-4 h-4" /> {sub.name === 'Internship' ? 'View Material' : 'Notes'}
                                    </a>
                                  ) : (
                                    <span className="flex-1 flex items-center justify-center gap-2 bg-slate-900/30 text-slate-600 border border-slate-800 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
                                      {sub.name === 'Internship' ? 'No Material' : 'No Notes'}
                                    </span>
                                  )}
                                  
                                  {sub.name !== 'Internship' && (
                                    sub.papersLink && sub.papersLink !== '#' ? (
                                      <a href={sub.papersLink} target="_blank" rel="noreferrer" className={`flex-1 flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-${theme.badge.split('-')[1]}-600 text-slate-300 hover:text-white border border-slate-600 hover:border-${theme.badge.split('-')[1]}-400 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] shadow-sm`}>
                                        <Download className="w-4 h-4" /> Papers
                                      </a>
                                    ) : (
                                      <span className="flex-1 flex items-center justify-center gap-2 bg-slate-900/30 text-slate-600 border border-slate-800 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
                                        No Papers
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {sem.universityPaperLink && (
                            <div className="mt-6 sm:mt-8 flex justify-end">
                              <a href={sem.universityPaperLink} target="_blank" rel="noreferrer" className={`group/link inline-flex items-center gap-2 text-xs sm:text-sm font-bold ${theme.text} hover:brightness-125 transition-all bg-white/5 px-5 py-3 rounded-full hover:bg-white/10 border border-white/5 hover:border-white/20 w-full sm:w-auto justify-center`}>
                                <span>Access Official University Archives</span>
                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </TiltCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Practicals Section */}
        <section id="practicals" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 relative border-y border-white/5">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
           <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
                      <span className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${activeTheme.gradient} shadow-lg shadow-indigo-500/20`}>
                        <Code className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </span>
                      Lab Manuals
                    </h2>
                    <p className="text-slate-400 max-w-xl text-base md:text-lg">
                      Comprehensive practical resources featuring code, outputs, and documentation.
                    </p>
                </div>
                <div className={`hidden md:block h-px flex-1 bg-gradient-to-r from-slate-800 via-${activeTheme.badge.split('-')[1]}-500/50 to-slate-800 mx-8 mb-4`}></div>
                <div className="flex md:block items-center justify-between md:text-right">
                    <div className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeTheme.gradient}`}>
                      <AnimatedCounter end={PRACTICALS.length} />+
                    </div>
                    <div className={`text-sm font-bold ${activeTheme.text} opacity-80 uppercase tracking-widest`}>Labs Available</div>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 spotlight-group">
              {PRACTICALS.map((prac, idx) => {
                const theme = getTheme(idx);
                return (
                  <Reveal key={idx} delay={(idx % 4) * 100} className="h-full">
                    <a 
                      href={prac.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block h-full"
                    >
                      <TiltCard className={`group glass-card p-1 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:${theme.glow} shadow-lg relative overflow-hidden h-full`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 h-full flex items-center gap-4 relative z-10 border border-slate-800 group-hover:border-transparent transition-colors">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-2">{prac.name}</h4>
                            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 inline-flex items-center gap-1 ${theme.text} brightness-110`}>
                              View Files <ExternalLink size={8} />
                            </span>
                          </div>
                        </div>
                      </TiltCard>
                    </a>
                  </Reveal>
                );
              })}
            </div>
           </div>
        </section>

        {/* Feedback Section */}
        <section id="feedback" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Reveal>
            <TiltCard>
              <div className="glass-panel rounded-3xl p-1 border border-slate-700/50 relative overflow-hidden group">
                {/* Animated Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${activeTheme.gradient} opacity-40 group-hover:opacity-60 transition-opacity blur-xl animate-pulse`}></div>
                
                <div className="bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 md:p-12 relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="flex-1 space-y-6 md:space-y-8">
                      <div className={`inline-block p-3 md:p-4 rounded-2xl bg-gradient-to-br ${activeTheme.gradient} shadow-xl shadow-purple-500/20 mb-2 transform rotate-3 hover:rotate-6 transition-transform`}>
                        <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Community Driven</h2>
                        <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                          This project thrives on your contributions. Found a bug? Have better notes? Let's build this together.
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-2">
                          <a href={CONTRIBUTOR.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] transition-all hover:scale-110 border border-slate-700 hover:border-transparent hover:shadow-[0_0_20px_rgba(0,119,181,0.5)]">
                            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                          </a>
                          <a href={REPO_LINK} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black transition-all hover:scale-110 border border-slate-700 hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <Github className="w-4 h-4 md:w-5 md:h-5" />
                          </a>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Submit an Issue / Request</label>
                          <textarea 
                            value={feedbackMsg}
                            onChange={(e) => setFeedbackMsg(e.target.value)}
                            placeholder="Tell us what's on your mind..."
                            className="w-full h-32 md:h-40 bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none placeholder-slate-600 shadow-inner text-sm md:text-base"
                          ></textarea>
                        </div>
                        <button 
                          onClick={handleFeedback}
                          className={`w-full py-3 md:py-4 bg-gradient-to-r ${activeTheme.gradient} text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 active:scale-95`}
                        >
                          <Send className="w-5 h-5" /> Create GitHub Issue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient}`}>
                    Empowering CSD Students
                  </span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  The KKW CSD Hub is more than just a repository; it's a collaborative ecosystem designed to streamline your academic journey.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <Reveal delay={100}>
                 <TiltCard className="h-full">
                   <div className="h-full glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                       <Users className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
                     <p className="text-slate-400 leading-relaxed">
                       Built by students, for students. We understand the curriculum challenges and curate resources that actually matter.
                     </p>
                   </div>
                 </TiltCard>
               </Reveal>

               {/* Card 2 */}
               <Reveal delay={200}>
                 <TiltCard className="h-full">
                   <div className="h-full glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                       <Globe className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3">Open Source</h3>
                     <p className="text-slate-400 leading-relaxed">
                       Completely transparent and open. Contribute your own notes, fix issues, and help the repository grow on GitHub.
                     </p>
                   </div>
                 </TiltCard>
               </Reveal>

               {/* Card 3 */}
               <Reveal delay={300}>
                 <TiltCard className="h-full">
                   <div className="h-full glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                       <Zap className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3">Always Updated</h3>
                     <p className="text-slate-400 leading-relaxed">
                       Regular updates ensure you have access to the latest syllabus changes, question patterns, and practical definitions.
                     </p>
                   </div>
                 </TiltCard>
               </Reveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 mt-20 border-t border-white/5 bg-[#020617] pt-16 pb-8 overflow-hidden">
            {/* Ambient Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-${activeTheme.badge.split('-')[1]}-500 to-transparent opacity-50`}></div>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-${activeTheme.badge.split('-')[1]}-500/10 blur-[60px] rounded-full pointer-events-none`}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    
                    {/* Brand Column */}
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
                            <div className="relative p-2.5 rounded-xl bg-slate-900 border border-white/10 group-hover:border-blue-500/50 transition-colors shadow-lg overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                <Code className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors relative z-10" />
                            </div>
                            <div>
                                <span className="block text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">KKW CSD Hub</span>
                                <span className="block text-xs text-slate-500 font-medium">© {new Date().getFullYear()} Open Source Community</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
                            A collaborative initiative to streamline resources for Computer Science & Design students.
                        </p>
                    </div>

                    {/* Links & Credit Column */}
                    <div className="flex flex-col items-center md:items-end space-y-6">
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: CONTRIBUTOR.github, label: "GitHub" },
                                { icon: Linkedin, href: CONTRIBUTOR.linkedin, label: "LinkedIn" }
                            ].map((social, idx) => (
                                <a 
                                    key={idx}
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="p-3 rounded-full bg-slate-900 border border-white/5 hover:border-blue-500/30 text-slate-400 hover:text-white hover:bg-blue-600/10 transition-all duration-300 hover:scale-110 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                </a>
                            ))}
                        </div>

                        {/* Credits */}
                        <div className="glass-panel px-5 py-3 rounded-full border border-white/5 bg-slate-900/50 backdrop-blur-sm hover:border-white/10 transition-colors">
                            <p className="text-sm text-slate-400 flex items-center gap-1.5">
                                Crafted with 
                                <span className="relative inline-flex items-center justify-center">
                                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                                    <span className="absolute inset-0 bg-rose-500 blur-md opacity-40 animate-pulse"></span>
                                </span>
                                by 
                                <a 
                                    href={CONTRIBUTOR.linkedin} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${activeTheme.gradient} hover:brightness-125 transition-all hover:tracking-wide`}
                                >
                                    {CONTRIBUTOR.name}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default App;