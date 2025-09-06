require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;  
const initSocketServer = require('./src/socket/socket.server');
const httpServer = require('http').createServer(app);

initSocketServer(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});