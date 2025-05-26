"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiX, SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { Home, User, FolderKanban, MailIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useProfile } from "@/lib/context/ProfileContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { profile } = useProfile();
  const [mounted, setMounted] = useState(false);

  // After component mounts, set mounted to true to trigger fade-in animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default social links that will be shown before profile data loads
  const defaultSocialLinks = {
    twitterUrl: false,
    githubUrl: false,
    linkedinUrl: false,
    email: false,
    resumeUrl: false,
  };

  // Social links from profile or defaults
  const socialLinks = {
    twitterUrl: profile?.twitterUrl || defaultSocialLinks.twitterUrl,
    githubUrl: profile?.githubUrl || defaultSocialLinks.githubUrl,
    linkedinUrl: profile?.linkedinUrl || defaultSocialLinks.linkedinUrl,
    email: profile?.email || defaultSocialLinks.email,
    resumeUrl: profile?.resumeUrl || defaultSocialLinks.resumeUrl,
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-50">
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-600/10 border border-gray-200 dark:border-white/20 rounded-full shadow dark:shadow-none">
      {/* Dark: navbar color same as bg */}
      {/* <div className="backdrop-blur-lg bg-white/10 dark:bg-[#1A1A1A]/10 border border-gray-200 dark:border-white/20 rounded-full shadow dark:shadow-none"> */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* All links container - centered with max width */}
            <div className="w-full max-w-xl flex items-center justify-center gap-8">
              {/* Navigation Links with Icons - Always visible */}
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                  </Link>   
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Home
                  </span>
                </div>
                
                <div className="relative group">
                  <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <User className="h-5 w-5" />
                    <span className="sr-only">About</span>
                  </Link>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    About
                  </span>
                </div>
                
                <div className="relative group">
                  <Link href="/projects" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <FolderKanban className="h-5 w-5" />
                    <span className="sr-only">Projects</span>
                  </Link>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Projects
                  </span>
                </div>
                
                <div className="relative group">
                  <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <MailIcon className="h-5 w-5" />
                    <span className="sr-only">Contact</span>
                  </Link>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Contact
                  </span>
                </div>
              </div>

              {/* Vertical Line Separator - Always visible */}
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

              {/* Social Media Icons - Fade in when loaded */}
              <div className={`flex items-center space-x-3 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {socialLinks.twitterUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.twitterUrl || '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                    >
                      <SiX className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Twitter
                    </span>
                  </div>
                )}
                
                {socialLinks.githubUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.githubUrl || '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors"
                    >
                      <SiGithub className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      GitHub
                    </span>
                  </div>
                )}
                
                {socialLinks.linkedinUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.linkedinUrl || '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-500 transition-colors"
                    >
                      <SiLinkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      LinkedIn
                    </span>
                  </div>
                )}
                
                {socialLinks.email && (
                  <div className="relative group">
                    <a 
                      href={`mailto:${profile?.email || ''}`}
                      className="text-gray-600 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400 transition-colors"
                    >
                      <SiGmail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </a>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Email
                    </span>
                  </div>
                )}
              </div>
              
              {/* Vertical Line Separator - Always visible */}
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
              
              {/* Theme Toggle and Resume Button - Fade in for resume */}
              <div className="flex items-center space-x-3">
                <div className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                  {socialLinks.resumeUrl ? (
                    <Link href={profile?.resumeUrl || '#'} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Resume
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="sm" className="rounded-full">
                      Resume
                    </Button>
                  )}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 