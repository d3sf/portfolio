import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance for the entire application
const prisma = new PrismaClient();

// GET /api/skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/skills
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, iconUrl } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        iconUrl,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

// PUT /api/skills/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const skill = await prisma.skill.update({
      where: { id: params.id },
      data: {
        name: body.name,
        iconUrl: body.iconUrl,
      },
    });

    return NextResponse.json(skill);
  } catch (err) {
    console.error('Error updating skill:', err);
    
    // Check if it's a database connection error
    if (err instanceof Error && err.message.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { error: "Database connection error. Please check your database configuration." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.skill.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting skill:', err);
    
    // Check if it's a database connection error
    if (err instanceof Error && err.message.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { error: "Database connection error. Please check your database configuration." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 