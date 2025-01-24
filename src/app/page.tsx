'use client'
import { useState } from 'react';
import Image from "next/image";

interface FormData {
  first_name: string;
  middle_name: string;
  surname: string;
  gender: string;
  marital_status: string;
  date_of_birth: string;
  state: string;
  lga: string;
  ward: string;
  email_address: string;
  phone_number: string;
  year_of_musabaqa: number;
  home_address: string;
  bank_details: {
    bank_name: string;
    account_name: string;
    account_number: string;
  };
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    middle_name: '',
    surname: '',
    gender: '',
    marital_status: '',
    date_of_birth: '',
    state: '',
    lga: '',
    ward: '',
    email_address: '',
    phone_number: '',
    year_of_musabaqa: 0,
    home_address: '',
    bank_details: {
      bank_name: '',
      account_name: '',
      account_number: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check for duplicates first
      const checkDuplicate = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const duplicateCheck = await checkDuplicate.json();

      if (duplicateCheck.isDuplicate) {
        alert('A record with these details already exists.');
        setIsSubmitting(false);
        return;
      }

      // If no duplicate, proceed with submission
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Reset form
        setFormData({
          first_name: '',
          middle_name: '',
          surname: '',
          gender: '',
          marital_status: '',
          date_of_birth: '',
          state: '',
          lga: '',
          ward: '',
          email_address: '',
          phone_number: '',
          year_of_musabaqa: 0,
          home_address: '',
          bank_details: {
            bank_name: '',
            account_name: '',
            account_number: ''
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-black text-center mb-8">Registration Form</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-black">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-1">First Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Middle Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.middle_name}
                  onChange={(e) => setFormData({...formData, middle_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Surname</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Date of Birth</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Gender</label>
                <div className="mt-2 space-x-4">
                  {['Male', 'Female'].map((option) => (
                    <label key={option} className="inline-flex items-center text-black">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        required
                        checked={formData.gender === option}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Marital Status</label>
                <div className="mt-2 space-x-4">
                  {['Married', 'Single', 'Widow'].map((option) => (
                    <label key={option} className="inline-flex items-center text-black">
                      <input
                        type="radio"
                        name="marital_status"
                        value={option}
                        required
                        checked={formData.marital_status === option}
                        onChange={(e) => setFormData({...formData, marital_status: e.target.value})}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-black">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black">Email Address</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.email_address}
                  onChange={(e) => setFormData({...formData, email_address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Year of Musabaqa</label>
                <input
                  type="number"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.year_of_musabaqa}
                  onChange={(e) => setFormData({
                    ...formData, 
                    year_of_musabaqa: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </div>
          </section>

          {/* Location Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-black">Location Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-black">State</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">LGA</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.lga}
                  onChange={(e) => setFormData({...formData, lga: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Ward</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.ward}
                  onChange={(e) => setFormData({...formData, ward: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Home Address</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                value={formData.home_address}
                onChange={(e) => setFormData({...formData, home_address: e.target.value})}
              />
            </div>
          </section>

          {/* Bank Details */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-black">Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-black">Bank Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bank_details.bank_name}
                  onChange={(e) => setFormData({
                    ...formData,
                    bank_details: {...formData.bank_details, bank_name: e.target.value}
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Account Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bank_details.account_name}
                  onChange={(e) => setFormData({
                    ...formData,
                    bank_details: {...formData.bank_details, account_name: e.target.value}
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Account Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bank_details.account_number}
                  onChange={(e) => setFormData({
                    ...formData,
                    bank_details: {...formData.bank_details, account_number: e.target.value}
                  })}
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? 'bg-blue-400' : 'bg-blue-600'
            } text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
