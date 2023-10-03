import mongoose, { Document, Schema } from 'mongoose';

interface IContentSchema extends Document {
    content: {
        [key: string]: any; // Object with dynamic keys and values of any type
    };
    createdAt: Date;
}

const contentSchema = new Schema<IContentSchema>({
    content: {
        type: Schema.Types.Mixed, // Store the content as an object with dynamic keys and values
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ContentSchema = mongoose.model<IContentSchema>('EditorContent', contentSchema);



export default ContentSchema;
