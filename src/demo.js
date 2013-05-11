var arDrone =  require("ar-drone"),
	client = arDrone.createClient();

client.takeoff();

client
	.after(5000, function() {
		this.clockwise(0.5);
	})
	.after(3000, function() {
		this.stop();
		this.land();
	});