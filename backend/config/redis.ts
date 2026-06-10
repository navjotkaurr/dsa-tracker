import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis error: ', err));
redisClient.on('connect', () => console.log('Redis connected'));

console.log('REDIS_URL:', process.env.REDIS_URL);

redisClient.connect();
export default redisClient;