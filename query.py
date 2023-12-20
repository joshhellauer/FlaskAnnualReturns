import pandas as pd
from sqlalchemy import create_engine, text

DATABASE_URL = "sqlite:///markets.db"

engine = create_engine(DATABASE_URL, echo=True)

query = text("""SELECT m.id as market_id, m.index_name as market_name, m.year as market_year, m.return_value as market_return
                   FROM markets m
                   """)

with engine.connect() as conn:
    result = conn.execute(query)
    df = pd.DataFrame(result.fetchall(), columns = result.keys())

print(df)
