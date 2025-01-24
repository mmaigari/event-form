import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    await connectMongoDB();
    const entry = await RegistrationForm.findById(context.params.id);
    
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    
    return NextResponse.json(entry);
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json({ error: "Error fetching entry" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: Context
) {
  try {
    const body = await request.json();
    await connectMongoDB();
    const entry = await RegistrationForm.findByIdAndUpdate(context.params.id, body, { new: true });
    
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    
    return NextResponse.json(entry);
  } catch (err) {
    console.error('PUT Error:', err);
    return NextResponse.json({ error: "Error updating entry" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  try {
    await connectMongoDB();
    const entry = await RegistrationForm.findByIdAndDelete(context.params.id);
    
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error('DELETE Error:', err);
    return NextResponse.json({ error: "Error deleting entry" }, { status: 500 });
  }
}