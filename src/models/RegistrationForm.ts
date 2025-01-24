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
registrationFormSchema.pre('save', async function(this: IRegistrationForm, next) {
  const doc = this;
  try {
    // Check for existing entry with same details
    const existingPerson = await mongoose.model('RegistrationForm').findOne({
      first_name: doc.first_name,
      middle_name: doc.middle_name,
      surname: doc.surname,
      date_of_birth: doc.date_of_birth
    });

    if (existingPerson && existingPerson._id.toString() !== doc._id?.toString()) {
      throw new Error('A person with these details already exists');
    }

    // Check for duplicate email
    const existingEmail = await mongoose.model('RegistrationForm').findOne({
      email_address: doc.email_address,
      _id: { $ne: doc._id }
    });

    if (existingEmail) {
      throw new Error('Email address already registered');
    }

    // Check for duplicate phone
    const existingPhone = await mongoose.model('RegistrationForm').findOne({
      phone_number: doc.phone_number,
      _id: { $ne: doc._id }
    });

    if (existingPhone) {
      throw new Error('Phone number already registered');
    }

    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error('An unknown error occurred'));
  }
});

const RegistrationForm = mongoose.models.RegistrationForm || mongoose.model<IRegistrationForm>('RegistrationForm', registrationFormSchema);

export default RegistrationForm;