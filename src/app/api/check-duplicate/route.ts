import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    
    const existingEntry = await RegistrationForm.findOne({
      $or: [
        { email_address: data.email_address },
        { phone_number: data.phone_number },
        {
          $and: [
            { first_name: data.first_name },
            { middle_name: data.middle_name },
            { surname: data.surname },
            { phone_number: data.phone_number }
          ]
        }
      ]
    });

    if (existingEntry) {
      return NextResponse.json({
        isDuplicate: true,
        message: 'A record with these details already exists'
      }, { status: 409 });
    }

    return NextResponse.json({ isDuplicate: false });
  } catch (error) {
    return NextResponse.json({ error: "Error checking duplicates" }, { status: 500 });
  }
}