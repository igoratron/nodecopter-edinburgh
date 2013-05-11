var arDrone =  require("ar-drone"),
	client = arDrone.createClient();

function displayNavData(data) {
	console.log("BAT: " + data.demo.batteryPercentage);
	console.log("ALT: " + data.demo.altitudeMeters);

}

client.animateLeds('blank', 5, 20);