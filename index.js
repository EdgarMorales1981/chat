const path = require('path');
const express = require('express');
const app = express();

//configuraciones // settings
app.set('port', process.env.PORT || 3000);


//archivos estaticos // static files
app.use(express.static(path.join(__dirname, 'public')));



//iniciar el servidor //start the server 
const server = app.listen(app.get('port'), () => {
console.log('Servidor en el puerto', app.get('port'));


});


// Websockets

const SocketIO = require('socket.io');

const io = SocketIO(server);


io.on('connection',(socket) => {

console.log('nueva conexion',socket.id);

socket.on('chat:message',(data)=> {

io.sockets.emit('chat:message', data);



});

socket.on('chat:typing',(data) => {

socket.broadcast.emit('chat:typing',data);

})


});






