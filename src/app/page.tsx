// Server component (no "use client" directive)
import HomeClient from "./HomeClient";
import { EducationItem, Quote } from "@/lib/types";
import { Project, GeneralSkill } from "@/lib/api";

// Fetch all data server-side
async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    // Fetch all data in parallel
    const [
      profileRes,
      projectsRes,
      skillsRes,
      educationRes,
      quotesRes
    ] = await Promise.all([
      fetch(`${baseUrl}/api/profile`),
      fetch(`${baseUrl}/api/projects`),
      fetch(`${baseUrl}/api/general-skills`),
      fetch(`${baseUrl}/api/education`),
      fetch(`${baseUrl}/api/quotes`)
    ]);

    // Parse all responses in parallel
    const [
      profile,
      projects,
      skills,
      education,
      quotes
    ] = await Promise.all([
      profileRes.json(),
      projectsRes.json(),
      skillsRes.json(),
      educationRes.json(),
      quotesRes.json()
    ]);

    return {
      profile,
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
  
  // Sort projects data
  const sortedProjects = [...data.projects]
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order);
  
  // Pass the data to the client component
  return (
    <HomeClient 
      profile={data.profile}
      projects={sortedProjects}
      skills={data.skills}
      education={data.education}
      quotes={data.quotes}
    />
  );
}
