import mongoose from 'mongoose';
import colors from 'colors'; 
async function connectToDatabase() {
  
  try {
    const mongoUri = process.env.MONGO_URI;  
    
    if (!mongoUri) {
      console.error('Error: MONGO_URI environment variable is not set!');
      return;
    }

    await mongoose.connect(mongoUri);

    console.log('Connecting to MongoDB Successfully'.bgCyan);
  } catch (error) {
    console.error('Error connecting to Database:', error);
  }
}

export default connectToDatabase;

