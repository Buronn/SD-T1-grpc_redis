const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./search.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
//console.log(grpc.loadPackageDefinition(packageDefinition))
const ItemService = grpc.loadPackageDefinition(packageDefinition).ItemService;
const client = new ItemService("server:50051", grpc.credentials.createInsecure());

module.exports = client;