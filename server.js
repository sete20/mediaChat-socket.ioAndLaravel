'use strict';
const express = require('express');
const cors = require('cors');
const corsOptions ={
    origin:'http://127.0.0.1:8000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
// express.use(cors());
const http = require('http');
const socket = require('socket.io');
const socketServe = require('./socket');
class Server{
    constructor() {
        this.port = 5000;
        this.host = 'localhost';
        this.app = express();
        this.app.use(cors());
        this.http = http.Server(this.app);
        this.socket = socket(this.http,{
        cors: {
        origin: "http://127.0.0.1:8000",
        methods: ["GET", "POST"]
        }
        });
    }
    runServer() {
        new socketServe(this.socket).socketConnection();
            this.http.listen(this.port, this.host, () => {
            console.log(`the server has been started at http://${this.host}:${this.port}`);
        });
    }
}
const app = new Server();
app.runServer();

