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

//PieChart

// Create an array of each country's numbers object.values is a method and is important
var year_2014 = Object.values(data1.year_2014);
var year_2013 = Object.values(data1.year_2013);
var year_2012 = Object.values(data1.year_2012);

// Create an array of music provider labels
var labels = Object.keys(data1.year_2014);

// Display the default plot
function init() {
  var data1 = [{
    values: year_2014,
    labels: labels,
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data1, layout);
}

// On change to the DOM, call getData()
//select everything with id selDatasernand when you detect someone messing around (on change) run getData


d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable(if I select US the dataset will correspond to US values)
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data1 = [];

  if (dataset == 'year_2014') {
      data1 = year_2014;
  }
  else if (dataset == 'year_2013') {
      data1 = year_2013;
  }
  else if (dataset == 'year_2012') {
      data1 = year_2012;
  }
  // Call function to update the chart
  updatePlotly(data1);
}

// Update the restyled plot's values has to be an array  []of objects otherwise is gonna crash
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();









