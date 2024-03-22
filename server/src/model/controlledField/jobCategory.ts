
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IJobCategory extends Document {
    name: string;
}

const iobCategory: Schema<IJobCategory> = new Schema({
    name: { type: String, required: true },
});

const JobCategory = mongoose.model<IJobCategory>('JobCategory', iobCategory);

export default JobCategory;

