const express = require("express");
const bodyParser = require("body-parser");
const pkgDir = require('pkg-dir');
const path = require('path');
const root_path = pkgDir.sync(__dirname);
const result = require("dotenv").config();
const app = express();
global.__basedir = __dirname;

const grpc = require("./grpc_client");

const client = require("./middleware/redis_cli");

const callGRPC = (q) => {
    return new Promise((resolve, reject) => {
        grpc.GetInventory({name:q}, (err, data) => {
            
            if(!data) return reject(Error('No hay datos través de GRPC.'))
            const {items} = data;
            if (err) return reject(err);
            else if(!Array.isArray(items)) {
                console.log("\t\tFormat Error"); return reject(Error('Format Error'));
            }
            else if (items.length == 0) {
                console.log("\t\tNot found in inventory"); return reject(Error('No results found'));
            }
            else client.set(q, JSON.stringify(items)); return resolve(items);
        })
    })
}
app.get("/inventory/search", async (req, res) => {
    
    try {
        console.log("Searching for: " + req.query.q);
        const q = req.query.q;
        keys = await client.keys(`*${q}*`);
        
        var seguir = (keys && keys.length == 0)
        console.log(seguir?"\tNot found in cache":"\tFound in cache")
        return res.json(seguir?await callGRPC(q):{
            "items": JSON.parse( await Promise.all( keys.map(async item => await client.get(item)) ) )
        })
    } catch (error) {
        return res.send(error.message)
    }

    
});
client.connect();


app.get("/reset", async (req, res) => {
    const q = req.params.q;
    try {
        await client.flushAll();
        res.send("Cache flushed");
    } catch (error) {
        return res.send(error.message)
    }

});

app.get("/keys", async (req, res) => {

    try {
        keys = await client.keys('*');
        res.send(keys);
    } catch (error) {
        return res.send(error.message)
    }
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`)
});


