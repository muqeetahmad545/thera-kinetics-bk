import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true,
    },
    modelImage: {
        type: String,
        required: false,
    },  
    });

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;