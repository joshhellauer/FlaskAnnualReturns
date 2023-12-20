import os
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker
from models import Base, MarketData  # Assuming your models are in a file named 'models.py'

# Create an SQLite database file
DATABASE_URL = "sqlite:///markets.db"
engine = create_engine(DATABASE_URL, echo=True)

# Create tables in the database
Base.metadata.create_all(bind=engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Get the current directory
current_directory = os.getcwd()

# List all files in the current directory
all_files = os.listdir(current_directory)

# Filter files with a ".csv" extension
csv_files = [file for file in all_files if file.endswith(".csv")]

# Iterate through each CSV file
for csv_file in csv_files:
    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file)

    # Get the index name from the CSV file name (assuming the file name is in the format "index_name.csv")
    index_name = csv_file.split('_')[0]
    print(index_name)
    # Iterate through each row of the DataFrame and insert data into the database
    for _, row in df.iterrows():
        market_data = MarketData(index_name=index_name, year=row['Year'], return_value=row['Return'])
        session.add(market_data)

# Commit the changes
session.commit()
