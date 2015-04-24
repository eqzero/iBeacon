console.log('Noble running!!.......');

var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(socket){
  socket.on('event', function(data){
  	console.log('event...');
  });
  socket.on('disconnect', function(){
  	console.log('disconnect...');
  });
});

server.listen(3000);