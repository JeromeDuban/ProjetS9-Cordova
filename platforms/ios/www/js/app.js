// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

  var scanTimer = null;
  var betweenScanTimer = null;

  document.addEventListener('deviceready', function () {
    console.log("OK good to go");

    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByHexString('#ffffff');
    StatusBar.styleDefault();

    bluetoothle.initialize(initializeSuccess, initializeError);
    
    document.addEventListener('toggle', function (e) {
      if ($(".toggle").hasClass("active")) {
        console.log("Starting scan for beacons.");
        startScan();
      } else {
        bluetoothle.stopScan(stopScanSuccess, stopScanError);
        clearScanTimeout();
        $(".beacon-entry").remove();
      }
    });
  }, false);

  function startScan() {
    var paramsObj = {"serviceUuids":[]};
    bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);
    console.log("15s ellapsed, start another scan.");
    betweenScanTimer = setTimeout(startScan, 15000);

  }
  function initializeSuccess(obj)
  {
    if (obj.status == "enabled")
    {
      console.log("Bluetooth initialized successfully, starting scan for beacons.");
    }
    else
    {
      console.log("Unexpected initialize status: " + obj.status);
    }
  }

  function initializeError(obj)
  {
    console.log("Initialize error: " + obj.error + " - " + obj.message);
  }

  function startScanSuccess(obj)
  {
    if (obj.status == "scanResult")
    {
      console.log("Stopping scan..");
      console.log("Beacon found : "+obj.address+" "+obj.name+" "+obj.rssi);

      $(".table-view").append("<li class=\"table-view-cell beacon-entry\">Beacon "+obj.name+" : "+obj.address+" <br />RSSi : "+obj.rssi+"</li>");
      // window.localStorage.setItem(addressKey, obj.address);
      // connectDevice(obj.address);
    }
    else if (obj.status == "scanStarted")
    {
      console.log("Scan was started successfully, stopping in 10");
      scanTimer = setTimeout(scanTimeout, 2000);
    }
    else
    {
      console.log("Unexpected start scan status: " + obj.status);
    }
  }

  function startScanError(obj)
  {
    console.log("Start scan error: " + obj.error + " - " + obj.message);
  }

  function scanTimeout()
  {
    console.log("Scanning time out, stopping");
    bluetoothle.stopScan(stopScanSuccess, stopScanError);
  }

  function clearScanTimeout()
  { 
      console.log("Clearing scanning timeout");
    if (scanTimer != null)
    {
      clearTimeout(scanTimer);
    }
  }

  function stopScanSuccess(obj)
  {
    if (obj.status == "scanStopped")
    {
      console.log("Scan was stopped successfully");
    }
    else
    {
      console.log("Unexpected stop scan status: " + obj.status);
    }
  }

  function stopScanError(obj)
  {
    console.log("Stop scan error: " + obj.error + " - " + obj.message);
  }





}());