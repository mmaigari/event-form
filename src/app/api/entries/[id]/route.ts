import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const entry = await RegistrationForm.findById(params.id);
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching entry" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const entry = await RegistrationForm.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: "Error updating entry" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    await RegistrationForm.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Entry deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting entry" }, { status: 500 });
  }
}