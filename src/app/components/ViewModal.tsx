'use client'

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

interface ViewModalProps {
  entry: Entry | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewModal({ entry, isOpen, onClose }: ViewModalProps) {
  if (!isOpen || !entry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Entry Details</h3>
          <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
            Close
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <section className="border-b pb-4">
            <h4 className="font-bold text-lg mb-3 text-gray-900">Personal Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-900"><span className="font-semibold">Full Name:</span> {`${entry.first_name} ${entry.middle_name} ${entry.surname}`}</p>
              <p className="text-gray-900"><span className="font-semibold">Gender:</span> {entry.gender}</p>
              <p className="text-gray-900"><span className="font-semibold">Marital Status:</span> {entry.marital_status}</p>
              <p className="text-gray-900"><span className="font-semibold">Date of Birth:</span> {new Date(entry.date_of_birth).toLocaleDateString()}</p>
            </div>
          </section>

          {/* Contact & Location */}
          <section className="border-b pb-4">
            <h4 className="font-bold text-lg mb-3 text-gray-900">Contact & Location</h4>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-900"><span className="font-semibold">Email:</span> {entry.email_address}</p>
              <p className="text-gray-900"><span className="font-semibold">Phone:</span> {entry.phone_number}</p>
              <p className="text-gray-900"><span className="font-semibold">State:</span> {entry.state}</p>
              <p className="text-gray-900"><span className="font-semibold">LGA:</span> {entry.lga}</p>
              <p className="text-gray-900"><span className="font-semibold">Ward:</span> {entry.ward}</p>
            </div>
          </section>

          {/* Bank Details */}
          <section>
            <h4 className="font-bold text-lg mb-3 text-gray-900">Bank Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-900"><span className="font-semibold">Bank Name:</span> {entry.bank_details.bank_name}</p>
              <p className="text-gray-900"><span className="font-semibold">Account Name:</span> {entry.bank_details.account_name}</p>
              <p className="text-gray-900"><span className="font-semibold">Account Number:</span> {entry.bank_details.account_number}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}