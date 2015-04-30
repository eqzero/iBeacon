var noble = require('noble');
noble.on('stateChange', function(state) {
	if (state === 'poweredOn' ) {
		noble.startScanning([], false);
	} else {
		noble.stopScanning();
	}
});
 
noble.on('discover', function(peripheral) {
	peripheral.connect(function(error) {});
 
	peripheral.on('connect',function(){}); 
 
	peripheral.on('rssiUpdate',function(rssi){
		console.log({"uuid": peripheral.uuid, "rssi": peripheral.rssi });
	});
 
	setInterval(function(){
  		peripheral.updateRssi();
	}, 100);
});