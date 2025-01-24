import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import RegistrationForm from '@/models/RegistrationForm';

export async function GET() {
  try {
    await connectMongoDB();
    const entries = await RegistrationForm.find({}).sort({ createdAt: -1 });
    
    const statistics = {
      totalEntries: entries.length,
      maleCount: entries.filter(entry => entry.gender === 'Male').length,
      femaleCount: entries.filter(entry => entry.gender === 'Female').length
    };

    return NextResponse.json({ entries, statistics });
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json({ error: "Error fetching entries" }, { status: 500 });
  }
}

function calculateAverageAge(entries: any[]) {
  const today = new Date();
  const ages = entries.map(entry => {
    const birthDate = new Date(entry.date_of_birth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  });
  
  return ages.reduce((a, b) => a + b, 0) / ages.length;
}