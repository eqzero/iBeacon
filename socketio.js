console.log('Socket io running....');

var io = require('socket.io')();
io.on('connection', function(socket){
	console.log('connection');	
});
io.listen(3000);