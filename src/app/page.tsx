// Server component (no "use client" directive)
import HomeClient from "./HomeClient";
import { Experience as ExperienceType, EducationItem, Quote } from "@/lib/types";
import { Project, GeneralSkill } from "@/lib/api";

// Fetch all data server-side
async function getData() {
  // Fetch profile data
  const profileRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/profile`, { cache: 'no-store' });
  const profile = await profileRes.json();
  
  // Fetch experience data
  const experienceRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/experience`, { cache: 'no-store' });
  const experiences = await experienceRes.json() as ExperienceType[];
  
  // Fetch projects data
  const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects`, { cache: 'no-store' });
  const projects = await projectsRes.json() as Project[];
  
  // Fetch skills data
  const skillsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/general-skills`, { cache: 'no-store' });
  const skills = await skillsRes.json() as GeneralSkill[];
  
  // Fetch education data
  const educationRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/education`, { cache: 'no-store' });
  const education = await educationRes.json() as EducationItem[];
  
  // Fetch quotes data
  const quotesRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/quotes`, { cache: 'no-store' });
  const quotes = await quotesRes.json() as Quote[];
  
  return {
    profile,
    experiences,
    projects,
    skills,
    education,
    quotes
  };
}

export default async function Home() {
  // Fetch all data at once on the server
  const data = await getData();
  
  // Sort projects and experiences data
  const sortedProjects = [...data.projects]
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order);
    
  const sortedExperiences = [...data.experiences]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  
  // Pass the data to the client component
  return (
    <HomeClient 
      profile={data.profile}
      experiences={sortedExperiences}
      projects={sortedProjects}
      skills={data.skills}
      education={data.education}
      quotes={data.quotes}
    />
  );
}
