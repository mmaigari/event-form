'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface Entry {
  _id: string;
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
  createdAt: string;
}

export default function EditEntry({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    try {
      const response = await fetch(`/api/entries/${resolvedParams.id}`);
      if (!response.ok) throw new Error('Failed to fetch entry');
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError('Error fetching entry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/entries/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to update entry');
      router.push('/entries');
    } catch (err) {
      setError('Error updating entry');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!formData) return <div className="p-8 text-center">Entry not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Edit Entry</h1>
          <button
            onClick={() => router.push('/entries')}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Entries
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-black">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black">First Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Middle Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.middle_name}
                  onChange={(e) => setFormData({...formData, middle_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Surname</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Date of Birth</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Gender</label>
                <div className="space-x-4">
                  {['Male', 'Female'].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-black">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Marital Status</label>
                <div className="space-x-4">
                  {['Married', 'Single', 'Widow'].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="marital_status"
                        value={option}
                        checked={formData.marital_status === option}
                        onChange={(e) => setFormData({...formData, marital_status: e.target.value})}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-black">{option}</span>
                    </label>
                  ))}
                </div>
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">LGA</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.lga}
                  onChange={(e) => setFormData({...formData, lga: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Ward</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.ward}
                  onChange={(e) => setFormData({...formData, ward: e.target.value})}
                />
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.email_address}
                  onChange={(e) => setFormData({...formData, email_address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                />
              </div>
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white"
                  value={formData.bank_details.account_number}
                  onChange={(e) => setFormData({
                    ...formData,
                    bank_details: {...formData.bank_details, account_number: e.target.value}
                  })}
                />
              </div>
            </div>
          </section>

          <div className="pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 px-4 rounded-md transition-colors`}
            >
              {isSubmitting ? 'Updating...' : 'Update Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}