/// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/data.json").then((importedData) => {
  // console.log(importedData);
  var data = importedData;

  // Sort the data array using the years value
  data.sort(function(a, b) {
    return parseFloat(b.deaths) - parseFloat(a.deaths);
  });

  // Slice the first 1000 objects for plotting
  data = data.slice(0, 1000);

  // Reverse the array due to Plotly's defaults
  data = data.reverse();

  // Trace1 for the NYC Data
  var trace1 = {
    x: data.map(row => row.deaths),
    y: data.map(row => row.leading_cause),
    text: data.map(row => row.leading_cause),
    name: "NYCOD",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: " ",
    margin: {
      l: 550,
      r: 10,
      t: 50,
      b: 50
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot_1", chartData, layout);




});










