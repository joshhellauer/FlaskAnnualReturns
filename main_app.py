from flask import Flask, render_template, redirect, request, url_for, session
from models import MarketData, engine
from sqlalchemy.orm import sessionmaker
import json

app = Flask(__name__)
app.secret_key = "example123"


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/market_information/<market_name>', methods=['GET', 'POST'])
def market_information(market_name):
    Session = sessionmaker(bind=engine)
    session = Session()

    market_data = session.query(MarketData).filter_by(index_name=market_name).all()
    print(market_data)

    return render_template('market_information.html', market_data=market_data)


if __name__ == '__main__':
    app.run(debug=True)