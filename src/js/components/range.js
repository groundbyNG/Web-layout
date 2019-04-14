//= ../../../node_modules/nouislider/distribute/nouislider.js

var slider = document.getElementById("slider");

noUiSlider.create(slider, {
  start: [2000, 2010],
  range: {
    min: [1990],
    max: [2019]
  }
});
var value = document.getElementById("slider-value");
var output = document.getElementById("slider-output");

slider.noUiSlider.on("update", function(values) {
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.floor(values[i]);
  }
  var range = values.join(" - ");
  value.innerHTML = range;
  output.value = range;
});
