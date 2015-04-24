console.log('Noble running!!.......');

var noble = require('noble');
 
//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://localhost/scanner');
 
// replace with your hardware address
// var addressToTrack = '7c669d9b2dda'; 
var addressToTrack = '08:00:27:60:70:62'; 
 
socket.on('connect', function(){  
  console.log('connected to server');
});
 
noble.on('discover', function(peripheral){
  if(peripheral.uuid == addressToTrack){
    socket.emit('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});    
  }
});
 
noble.startScanning([], true) //allows dubplicates while scanning

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
var scanner = io.of('/scanner'); 
 
scanner.on('connection', function(socket) {
 
    console.log('Scanner Connected');
    
    socket.on('message', function(msg) {
        //recived message from scanner
        //do some processing here
    });
 
    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
});
 
http.listen(3000, function() {
    console.log('listening on *:3000');
});