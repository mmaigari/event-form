import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await connectMongoDB();
    const entry = await RegistrationForm.findById(params.id);
    
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    
    return NextResponse.json(entry);
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json({ error: "Error fetching entry" }, { status: 500 });
  }
}

export async function PUT(_request: NextRequest, { params }: RouteParams) {
  try {
    const body = await _request.json();
    await connectMongoDB();
    const entry = await RegistrationForm.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    
    return NextResponse.json(entry);
  } catch (err) {
    console.error('PUT Error:', err);
    return NextResponse.json({ error: "Error updating entry" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await connectMongoDB();
    const entry = await RegistrationForm.findByIdAndDelete(params.id);
    
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error('DELETE Error:', err);
    return NextResponse.json({ error: "Error deleting entry" }, { status: 500 });
  }
}