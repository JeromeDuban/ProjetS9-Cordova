cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/com.randdusing.bluetoothle/www/bluetoothle.js",
        "id": "com.randdusing.bluetoothle.BluetoothLe",
        "clobbers": [
            "window.bluetoothle"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.console": "0.2.11",
    "org.apache.cordova.statusbar": "0.1.8",
    "com.randdusing.bluetoothle": "1.0.6"
}
// BOTTOM OF METADATA
});