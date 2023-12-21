# Overview
This is a simple, ugly looking flask app that allows you to look at historical returns for the S&P500, DowJones, and NASDAQ. Specifically, it allows you to specify different time periods (ie 2 years, 4 years, 7 years etc) and look what the compounded return would have been, had you invested on the first of that year. 

# Requirements

  --Python 3.12

# Getting started

  --Clone into the repository
  --Navigate into the project folder. Initialize a python vitrual environment, and activate it.
  --Install required packages using ```pip install -r requirements.txt```

# Usage
  --Run the main app using ```python main_app.py```
  --Navigate to the URL specified in the command output, eg ```http://127.0.0.1:5000```

  --To start, select one of the three indices.
    --This will take you to a page containing a table of that index's historical returns, and a graph displaying the same info.
    --Input as many different time periods as you would like. The default graph is a period of 1 year. So an input of 2 will produce a graph that shows what the 2 year return would have been if you invested on the first of each year. 
    --Download individaul graphs using the button under the respecting graph. Or, download all graphs using the Download All graph data button on the right side of the screen.

    

  
