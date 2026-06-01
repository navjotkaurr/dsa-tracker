import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

import { UserModel } from './models/userModel.js';
import { TopicModel } from './models/TopicModel.js';
import users from './data/users.js';
import topics from './data/topics.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await UserModel.deleteMany();
    await TopicModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleTopics = topics.map(topic => ({
      ...topic,
      user: adminUser
    }));

    await TopicModel.insertMany(sampleTopics);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModel.deleteMany();
    await TopicModel.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
