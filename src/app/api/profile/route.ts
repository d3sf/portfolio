import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

// GET /api/profile
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}

// POST /api/profile
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const profile = await prisma.profile.create({
      data,
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating profile' }, { status: 500 });
  }
}

// PUT /api/profile
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const profile = await prisma.profile.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
  }
} 