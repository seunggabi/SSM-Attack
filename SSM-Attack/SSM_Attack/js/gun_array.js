function gunColorTracking(tracker) {
  // GUI Controllers

  function createCustomColor(value) {
    var components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    var customColorR = parseInt(components[1], 16);
    var customColorG = parseInt(components[2], 16);
    var customColorB = parseInt(components[3], 16);

    var colorTotal = customColorR + customColorG + customColorB;
  
      var rRatio = customColorR / colorTotal;
      var gRatio = customColorG / colorTotal;

      tracking.ColorTracker.registerColor(value, function(r, g, b) {
        var colorTotal2 = r + g + b;

        if (colorTotal2 === 0) {
          if (colorTotal < 10) {
            return true;
          }
          return false;
        }

        var rRatio2 = r / colorTotal2,
          gRatio2 = g / colorTotal2,
          deltaColorTotal = colorTotal / colorTotal2,
          deltaR = rRatio / rRatio2,
          deltaG = gRatio / gRatio2;

        return deltaColorTotal > 0.9 && deltaColorTotal < 1.1 &&
          deltaR > 0.9 && deltaR < 1.1 &&
          deltaG > 0.9 && deltaG < 1.1;
      });
  }

  function updateColors() {
    var colors =  ['#ffff00'];

	for(var i in colors)
	 {
		console.log(colors[i]);
		createCustomColor(colors[i]);
	 }
    tracker.setColors(colors);
  }
  updateColors();
}
