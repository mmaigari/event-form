'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ViewModal from '../components/ViewModal';

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

interface Statistics {
  totalEntries: number;
  maleCount: number;
  femaleCount: number;
}

export default function EntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    totalEntries: 0,
    maleCount: 0,
    femaleCount: 0
  });
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      const data = await response.json();
      setEntries(data.entries);
      setStatistics(data.statistics);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`/api/entries/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEntries(entries.filter(entry => entry._id !== id));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleViewEntry = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsViewModalOpen(true);
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Registration Entries</h1>
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add New Entry
          </Link>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Entries</h3>
            <p className="text-2xl font-bold">{statistics.totalEntries}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Male</h3>
            <p className="text-2xl font-bold">{statistics.maleCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Female</h3>
            <p className="text-2xl font-bold">{statistics.femaleCount}</p>
          </div>
        </div>

        {/* Entries Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry, index) => (
                <tr key={entry._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {`${entry.first_name} ${entry.middle_name} ${entry.surname}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.email_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => handleViewEntry(entry)}
                      className="text-blue-600 hover:text-blue-900 font-semibold"
                    >
                      View
                    </button>
                    <Link
                      href={`/entries/edit/${entry._id}`}
                      className="text-green-600 hover:text-green-900 font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="text-red-600 hover:text-red-900 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        <ViewModal
          entry={selectedEntry}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedEntry(null);
          }}
        />
      </div>
    </div>
  );
}