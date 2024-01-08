import * as redis from "redis";

let redisClient: any; // redis.RedisClientType;

(async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (error: any) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

export default redisClient;
