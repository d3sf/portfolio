"use client";

import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import { useProfile } from "@/lib/context/ProfileContext";

export default function Home() {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {profile ? (
        <Hero
          name={profile.name}
          title={profile.title}
          description={profile.bio}
          primaryButtonText="Book a Meet"
          secondaryButtonText="Get in touch"
          demoLinkText="View Rainbow Button Demos"
          demoLinkHref="/demo"
          calLink={profile.calLink}
        />
      ) : (
        <Hero
          name="Your Name"
          title="Your Title"
          description="Add your bio in the admin profile section"
          primaryButtonText="Book a Meet"
          secondaryButtonText="Get in touch"
          demoLinkText="View Rainbow Button Demos"
          demoLinkHref="/demo"
        />
      )}

      {/* Projects Section */}
      <Projects />
      
      {/* Experience Section */}
      <Experience />
      
      {/* Education Section */}
      <Education />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Contact Section */}
      <Contact profile={profile} />
    </div>
  );
}
