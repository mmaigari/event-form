import mongoose, { Schema, Document } from 'mongoose';

interface IRegistrationForm extends Document {
  first_name: string;
  middle_name: string;
  surname: string;
  gender: 'Male' | 'Female';
  marital_status: 'Married' | 'Single' | 'Widow';
  date_of_birth: Date;
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

const registrationFormSchema = new Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  surname: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  marital_status: { type: String, required: true, enum: ['Married', 'Single', 'Widow'] },
  date_of_birth: { type: Date, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  ward: { type: String, required: true },
  email_address: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  phone_number: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  year_of_musabaqa: { 
    type: Number, 
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
    index: true
  },
  home_address: { type: String, required: true },
  bank_details: {
    bank_name: { type: String, required: true },
    account_name: { type: String, required: true },
    account_number: { 
      type: String, 
      required: true,
      unique: true,
      index: true 
    }
  }
}, {
  timestamps: true
});

// Compound unique index
registrationFormSchema.index({ 
  first_name: 1, 
  middle_name: 1, 
  surname: 1, 
  date_of_birth: 1 
}, { 
  unique: true,
  name: 'unique_person_index' 
});

// Pre-save middleware to check duplicates
registrationFormSchema.pre('save', async function(next) {
  try {
    const existingPerson = await mongoose.model('RegistrationForm').findOne({
      first_name: this.first_name,
      middle_name: this.middle_name,
      surname: this.surname,
      date_of_birth: this.date_of_birth,
      _id: { $ne: this._id }
    });

    if (existingPerson) {
      throw new Error('Person already registered');
    }
    next();
  } catch (err: unknown) {
    next(err as mongoose.CallbackError);
  }
});

const RegistrationForm = mongoose.models.RegistrationForm || mongoose.model<IRegistrationForm>('RegistrationForm', registrationFormSchema);

export default RegistrationForm;