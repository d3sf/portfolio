import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/projects/:id
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        skills: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/:id
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    const body = await request.json();
    const { title, description, imageUrl, githubUrl, liveUrl, skills, featured, order } = body;

    // Handle skills - similar to POST logic
    const skillConnections = await Promise.all(
      (skills || []).map(async (skill: string | { name: string; iconUrl?: string }) => {
        if (typeof skill === 'string') {
          // If it's a string, it's an existing skill ID
          return { id: skill };
        } else {
          // If it's an object, create a new skill or find existing
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

    // First, disconnect all skills to avoid conflicts
    await prisma.project.update({
      where: { id },
      data: {
        skills: {
          disconnect: await prisma.project
            .findUnique({
              where: { id },
              include: { skills: true },
            })
            .then((project) => project?.skills.map((skill) => ({ id: skill.id })) || []),
        },
      },
    });

    // Update the project with new data
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        featured,
        order,
        skills: {
          connect: skillConnections,
        },
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/:id
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 