import { createClient } from 'redis';
// eslint-disable-next-line no-undef
const redisClient = createClient(process.env.REDIS_PORT);

// connect to redis
const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connect to redis');
    } catch (error) {
        console.log('Connect to redis failed');
    }
};

export default connectRedis;
