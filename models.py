from sqlalchemy import Column, String, Integer, Float, ForeignKey, create_engine, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class MarketData(Base):
    __tablename__ = "markets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    index_name = Column(String)
    year = Column(Integer)
    return_value = Column(Float)

DATABASE_URL = "sqlite:///markets.db"
engine = create_engine(DATABASE_URL, echo=True)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
