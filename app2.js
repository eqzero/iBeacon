var noble = require('noble');
var rssi_ibeacon = '';

noble.on('stateChange', function(state) {
	if (state === 'poweredOn' ) {
		noble.startScanning([], false);
	} else {
		noble.stopScanning();
	}
});
 
noble.on('discover', function(peripheral) {
	peripheral.connect(function(error) {});
 
	peripheral.on('connect',function(){
		console.log('connect');
	}); 
 
	peripheral.on('rssiUpdate',function(rssi){
		if(rssi_ibeacon != peripheral.rssi){
			rssi_ibeacon = peripheral.rssi;
			console.log({"uuid": peripheral.uuid, "rssi": peripheral.rssi });
		}
	});
 
	setInterval(function(){
  		peripheral.updateRssi();
	}, 100);
});