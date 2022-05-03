const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({ url: process.env.REDIS_URL });
console.log("Waiting for redis to start...");

client.on('connect', () => {
    console.log('Redis client connected', process.env.REDIS_URL);
});

client.on("error", function (err) {
    console.log("Error! :", err);
});

client.connect()



module.exports = client;