var noble = require('noble');

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
  /*
  console.log('peripheral discovered (' + peripheral.uuid + ' with address <' + peripheral.address + '>:');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\tcan I interest you in any of the following advertised services:');
  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));
  */

  // console.log('rssi: '+peripheral.rssi);

  setInterval(function(){

    var rssi_new = calculateDistance(peripheral.advertisement.txPowerLevel,peripheral.rssi);

    console.log("address: "+peripheral.address,"txPowerLevel: "+peripheral.advertisement.txPowerLevel,"rssi: "+peripheral.rssi,"rssi_new: "+rssi_new);

  }, 2000);
  /*
  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    console.log('\there is my service data:');
    for (var i in serviceData) {
      console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
    }
  }
  if (peripheral.advertisement.manufacturerData) {
    console.log('\there is my manufacturer data:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log('\tmy TX power level is:');
    console.log('\t\t' + peripheral.advertisement.txPowerLevel);
  }
  */
  console.log('<-------------->');
});

function calculateDistance(txPower,rssi) {
  
  // var txPower = -59 //hard coded power value. Usually ranges between -59 to -65
  
  if (rssi == 0) {
    return -1.0; 
  }
 
  var ratio = rssi*1.0/txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  }
  else {
    var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;    
    return distance;
  }
} 