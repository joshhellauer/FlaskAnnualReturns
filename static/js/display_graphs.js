let periods = [];
periods.push(1);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("display-canvas");
  showInitialGraph();
  const submit = document.getElementById("submit-input");
  submit.addEventListener("click", addGraphWithPeriod);
});

function addGraphWithPeriod() {
  event.preventDefault();
  const period = parseInt(document.getElementById("period-length-input").value);
  periods.push(period);
  const table = document.getElementById("market-data-table");
  const periodInput = document.getElementById("period-length-input");
  periodInput.value = "";

  var data = [];
  for (var i = 1; i < table.rows.length; i++) {
    var year = table.rows[i].cells[0].innerText;
    var returnValue = 1;
    for (var j = 0; j < period; j++) {
      if (i - j < 0) break;
      returnValue *=
        1 + parseFloat(table.rows[i - j].cells[1].innerText) * 0.01;
    }
    returnValue -= 1;
    returnValue *= 100;
    data.push({ year: year, return_value: returnValue });
  }

  // Create a Plotly graph
  const containerDiv = document.getElementById("graph-container");
  var newGraphDiv = document.createElement("div");

  containerDiv.appendChild(newGraphDiv);

  var graphDiv = document.createElement("div");
  newGraphDiv.appendChild(graphDiv);
  Plotly.newPlot(
    graphDiv,
    [
      {
        x: data.map((item) => item.year),
        y: data.map((item) => item.return_value),
        type: "bar",
        marker: { color: "#3498db" },
      },
    ],
    {
      title: "Market Returns Over the Years",
      xaxis: { title: "Year of investment" },
      yaxis: { title: `Return over ${period} years` },
    }
  );
  const button = document.createElement("button");
  button.textContent = "Download as excel sheet";
  button.addEventListener("click", function () {
    downloadGraphDataAsExcel(period);
  });
  newGraphDiv.appendChild(button);
}

function showInitialGraph() {
  const table = document.getElementById("market-data-table");

  var data = [];
  for (var i = 1; i < table.rows.length; i++) {
    var year = table.rows[i].cells[0].innerText;
    var returnValue = parseFloat(table.rows[i].cells[1].innerText);
    data.push({ year: year, return_value: returnValue });
  }

  // Create a Plotly graph
  var plotlyGraph = document.getElementById("plotly-graph");
  Plotly.newPlot(
    plotlyGraph,
    [
      {
        x: data.map((item) => item.year),
        y: data.map((item) => item.return_value),
        type: "bar",
        marker: { color: "#3498db" },
      },
    ],
    {
      title: "Market Returns Over the Years",
      xaxis: { title: "Year" },
      yaxis: { title: "Return Value" },
    }
  );
}

function getGraphData(period) {
  //   const period = parseInt(document.getElementById("period-length-input").value);
  const table = document.getElementById("market-data-table");

  var data = [];
  for (var i = 1; i < table.rows.length; i++) {
    var year = table.rows[i].cells[0].innerText;
    var returnValue = 1;
    for (var j = 0; j < period; j++) {
      if (i - j < 0) break;
      returnValue *=
        1 + parseFloat(table.rows[i - j].cells[1].innerText) * 0.01;
    }
    returnValue -= 1;
    returnValue *= 100;
    data.push({ year: year, return_value: returnValue });
  }
  return data;
}

function downloadGraphDataAsExcel(period) {
  // Get the graph data
  var graphData = getGraphData(period);

  // Convert data to Excel format
  var worksheet = XLSX.utils.json_to_sheet(graphData);

  // Create a new workbook
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, `${period} year returns`);

  const market_name = document.getElementById("market-name-span").textContent;
  // Save the workbook as an Excel file
  XLSX.writeFile(wb, `${market_name}_${period}year_returns.xlsx`);
}

function getAllGraphData() {
  const table = document.getElementById("market-data-table");
  var data = [];

  for (var i = 1; i < table.rows.length; i++) {
    var returnValuesArray = [];
    for (let period of periods) {
      //   console.log(period);
      var year = table.rows[i].cells[0].innerText;

      var returnValue = 1;
      for (var j = 0; j < period; j++) {
        if (i - j < 0) break;
        returnValue *=
          1 + parseFloat(table.rows[i - j].cells[1].innerText) * 0.01;
      }
      returnValue -= 1;
      returnValue *= 100;
      //   console.log(returnValue);
      returnValuesArray.push(returnValue);
    }
    console.log(returnValuesArray);
    data.push({ year: year, returnValues: returnValuesArray });
  }
  return data;
}

function flattenData(graphData) {
  // Flatten the data structure to have a column for each period
  const flattenedData = graphData.map(({ year, returnValues }) => {
    const rowData = { year };
    returnValues.forEach((value, index) => {
      rowData[`${periods[index]} year return`] = value;
    });
    return rowData;
  });
  return flattenedData;
}

function downloadAll() {
  let graphData = getAllGraphData();

  // Flatten the data structure
  const flattenedData = flattenData(graphData);

  // Convert flattened data to Excel format
  var worksheet = XLSX.utils.json_to_sheet(flattenedData);

  // Create a new workbook
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, `Multi-year returns`);

  const marketName = document.getElementById("market-name-span").textContent;
  // Save the workbook as an Excel file
  XLSX.writeFile(wb, `${marketName}_Multi-year_returns.xlsx`);
}
