import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICompanyCategory extends Document {
    name: string;
}

const companyCategory: Schema<ICompanyCategory> = new Schema({
    name: { type: String, required: true },
});

const CompanyCategory = mongoose.model<ICompanyCategory>('CompanyCategory', companyCategory);

export default CompanyCategory;

