import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

export async function GET(
  _request: Request,
  { params }: { params: { [key: string]: string | undefined } }
): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const entry = await RegistrationForm.findById(id);

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json({ error: 'Error fetching entry' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { [key: string]: string | undefined } }
): Promise<NextResponse> {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await request.json();
    await connectMongoDB();

    const entry = await RegistrationForm.findByIdAndUpdate(id, body, { new: true });

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (err) {
    console.error('PUT Error:', err);
    return NextResponse.json({ error: 'Error updating entry' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { [key: string]: string | undefined } }
): Promise<NextResponse> {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await connectMongoDB();
    const entry = await RegistrationForm.findByIdAndDelete(id);

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error('DELETE Error:', err);
    return NextResponse.json({ error: 'Error deleting entry' }, { status: 500 });
  }
}
