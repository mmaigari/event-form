import mongoose, { Schema } from 'mongoose';

const registrationFormSchema = new Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  surname: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  marital_status: { type: String, required: true, enum: ['Married', 'Single', 'Widow'] },
  date_of_birth: { type: Date, required: false },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  ward: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  year_of_musabaqa: { type: Number, required: true },
  home_address: { type: String, required: true },
  bank_details: {
    bank_name: { type: String, required: true },
    account_name: { type: String, required: true },
    account_number: { type: String, required: true }
  }
}, {
  timestamps: true
});

const RegistrationForm = mongoose.models.RegistrationForm || mongoose.model('RegistrationForm', registrationFormSchema);

export default RegistrationForm;