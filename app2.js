var noble = require('noble');
var rssi_ibeacon = '';

noble.on('stateChange', function(state) {
	console.log("state = "+state);
	if (state === 'poweredOn' ) {
		noble.startScanning([], false);
		console.log('state1');
	} else {
		noble.stopScanning();
		console.log('state2');
	}
});
 
noble.on('discover', function(peripheral) {
	peripheral.connect(function(error) {});
 
	peripheral.on('connect',function(){
		console.log('connect');
	}); 
 
	peripheral.on('rssiUpdate',function(rssi){
		console.log({"uuid": peripheral.uuid, "rssi": peripheral.rssi });
	});
 
	setInterval(function(){
  		// peripheral.updateRssi();
  		console.log('sss');
	}, 100);
});