import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    //const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
    //await mongoose.connect(mongoUri);
    const mongoAtlas = "mongodb+srv://jaforiqbal5593_db_user:epgvkP0AVzIKkRNj@cluster0.czgerf5.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(mongoAtlas);
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};