import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const formEntry = await RegistrationForm.create(data);
    return NextResponse.json({ message: "Success", data: formEntry }, { status: 201 });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: "Error submitting form" }, { status: 500 });
  }
}