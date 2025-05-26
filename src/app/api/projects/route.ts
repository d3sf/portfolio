import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance for the entire application
const prisma = new PrismaClient();

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        skills: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, githubUrl, liveUrl, skills, featured, order } = body;

    // Validate required fields
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle skills - create if they don't exist
    const skillConnections = await Promise.all(
      (skills || []).map(async (skill: string | { name: string; iconUrl?: string }) => {
        if (typeof skill === 'string') {
          // If it's a string, it's an existing skill ID
          return { id: skill };
        } else {
          // If it's an object, create a new skill
          const existingSkill = await prisma.skill.findUnique({
            where: { name: skill.name }
          });
          
          if (existingSkill) {
            return { id: existingSkill.id };
          }

          const newSkill = await prisma.skill.create({
            data: {
              name: skill.name,
              iconUrl: skill.iconUrl
            }
          });
          return { id: newSkill.id };
        }
      })
    );

    // Create project with skills
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        featured: featured || false,
        order: order || 0,
        skills: {
          connect: skillConnections
        },
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 