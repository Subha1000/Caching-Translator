import mongoose from "mongoose";

const translationSchema = mongoose.Schema(
    {
        phraseToTranslate: {
            type: String,
            requred: true,
        },
        translatedPhrase: {
            type: String,
            requred: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Translation = mongoose.model('Cat', translationSchema);
