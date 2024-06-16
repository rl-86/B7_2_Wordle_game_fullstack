import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/Wordle?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6',
      {}
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
