import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },   
     address: {
        type: String,
        required: true,
    },
    patients: {
        type: String,
        required: true
    },
    hospitalImages:{
        type: String,
        required: false,
    },
    about:{
        type: String,
        required: false,
    },
    rating:{
        type: Number,
        required: false,
    },
    
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;