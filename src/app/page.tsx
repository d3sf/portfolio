// Server component (no "use client" directive)
import HomeClient from "./HomeClient";
import { Experience as ExperienceType, EducationItem, Quote } from "@/lib/types";
import { Project, GeneralSkill } from "@/lib/api";

// Fetch all data server-side
async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    // Fetch all data in parallel
    const [
      profileRes,
      experienceRes,
      projectsRes,
      skillsRes,
      educationRes,
      quotesRes
    ] = await Promise.all([
      fetch(`${baseUrl}/api/profile`, { next: { revalidate: 3600 } }), // Cache for 1 hour
      fetch(`${baseUrl}/api/experience`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/projects`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/general-skills`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/education`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/quotes`, { next: { revalidate: 3600 } })
    ]);

    // Parse all responses in parallel
    const [
      profile,
      experiences,
      projects,
      skills,
      education,
      quotes
    ] = await Promise.all([
      profileRes.json(),
      experienceRes.json(),
      projectsRes.json(),
      skillsRes.json(),
      educationRes.json(),
      quotesRes.json()
    ]);

    return {
      profile,
      experiences: experiences as ExperienceType[],
      projects: projects as Project[],
      skills: skills as GeneralSkill[],
      education: education as EducationItem[],
      quotes: quotes as Quote[]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return empty data structure in case of error
    return {
      profile: null,
      experiences: [],
      projects: [],
      skills: [],
      education: [],
      quotes: []
    };
  }
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
