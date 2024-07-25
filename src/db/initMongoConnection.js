import mongoose from 'mongoose';
import { env } from '../utils/env.js'; //

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pass = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pass}@${url}/${db}?retryWrites=true&w=majority&appName=Smail`,
    );

    console.log('Mongo connection successfully established!'); // Сообщение о успешном подключении
  } catch (e) {
    console.error('Error while setting up mongo connection:', e); // Сообщение об ошибке
    throw e;
  }
};
