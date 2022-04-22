const express = require("express");
const bodyParser = require("body-parser");
const pkgDir = require('pkg-dir');
const path = require('path');
const root_path = pkgDir.sync(__dirname);
const result = require("dotenv").config();
const app = express();
global.__basedir = __dirname;

const grpc = require("./grpc_client");
const redis = require("redis");


const client = redis.createClient({ url: process.env.REDIS_URL });
console.log("Waiting for redis to start...");
client.on('connect', () => {
    console.log('Redis client connected', process.env.REDIS_URL);
});
client.connect();

app.get("/inventory/search", async (req, res) => {
    console.log("Searching for: " + req.query.q);
    const q = req.query.q;
    keys = await client.keys(`*${q}*`);
    
    if (keys.length == 0) {
        console.log("\tNot found in cache");
        grpc.GetInventory({name:q}, (err, response) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (response["items"].length == 0) {
                    console.log("\t\tNot found in inventory");
                    res.send("No results found");
                }
                else{
                    items = [];
                    for (let i = 0; i < response["items"].length; i++) {
                        items.push(response["items"][i]);
                    }
                    client.set(q, JSON.stringify(items));
                    res.send(response);
                }
            }
        }
        )
    }
    else{
        console.log("\tFound in cache");
        for (let i = 0; i < keys.length; i++) {
            response = await client.get(keys[i]);
            res.send({"items":JSON.parse(response)});
        }
    }
});


app.get("/reset", async (req, res) => {
    const q = req.params.q;
    await client.flushAll();
    res.send("Cache flushed");

});

app.get("/keys", async (req, res) => {

    keys = await client.keys('*');
    res.send(keys);
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`)
});


