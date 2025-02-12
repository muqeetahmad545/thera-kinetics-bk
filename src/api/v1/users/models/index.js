import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: true,
    },   
     email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    role:{
        type: String,
        enum: ['doctor', 'user'],
        default: 'user'
    },
    profileImage: {
        type: String,
        required: false,
    },
    about:{
        type: String,
        required: false,
    },
    patients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],   
    doctor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    hospital:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital'
    },
    experience:{
        type: Number,
        required: false,
    },
    rating:{
        type: Number,
        required: false,
    },
    address:{
        type: String,
        required: false,
    },
    sessionDate:{
        type: Date,
        required: false,
    },
});

const User = mongoose.model('User', userSchema);

export default User;