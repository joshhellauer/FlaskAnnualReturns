document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("display-canvas");
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
});

function calculateRollingAverages(period = 10) {}
