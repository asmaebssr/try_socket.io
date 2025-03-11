import express from 'express';
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log('Message recieved: ', message);
        io.emit('message', message)
    })

    socket.on('disconnected', () => {
        console.log('Client disconnected');
    })
})


const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))