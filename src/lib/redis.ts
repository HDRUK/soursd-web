import { Redis } from "ioredis";

const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_CLIENT,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

export default redis;
