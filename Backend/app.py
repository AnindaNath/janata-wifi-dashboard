from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DB_PATH = 'stock_market.db'

def init_db():
    """Initialize the database with our stock data"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create stocks table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS stocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        trade_code TEXT NOT NULL,
        high REAL NOT NULL,
        low REAL NOT NULL,
        open REAL NOT NULL,
        close REAL NOT NULL,
        volume INTEGER NOT NULL
    )
    ''')
    
    # Check if we need to import data
    cursor.execute("SELECT COUNT(*) FROM stocks")
    count = cursor.fetchone()[0]
    
    if count == 0:
        print("Importing data from JSON file...")
        # Load data from JSON file
        try:
            with open('stock_market_data.json', 'r') as f:
                data = json.load(f)
                
            # Insert data into the database
            for item in data:
                cursor.execute('''
                INSERT INTO stocks (date, trade_code, high, low, open, close, volume)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    item['date'],
                    item['trade_code'],
                    item['high'],
                    item['low'],
                    item['open'],
                    item['close'],
                    item['volume']
                ))
            print(f"Imported {len(data)} records")
        except Exception as e:
            print(f"Error importing data: {str(e)}")
    
    conn.commit()
    conn.close()

def dict_factory(cursor, row):
    """Convert database row objects to dictionaries"""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

# FIXED ROUTES - only use the path part
@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = dict_factory
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM stocks ORDER BY date DESC LIMIT 1000")
    stocks = cursor.fetchall()
    
    conn.close()
    return jsonify(stocks)

@app.route('/api/stocks/<int:id>', methods=['GET'])
def get_stock(id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = dict_factory
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM stocks WHERE id = ?", (id,))
    stock = cursor.fetchone()
    
    conn.close()
    
    if stock:
        return jsonify(stock)
    return jsonify({"error": "Stock not found"}), 404

@app.route('/api/stocks', methods=['POST'])
def create_stock():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
        
    stock_data = request.json
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        INSERT INTO stocks (date, trade_code, high, low, open, close, volume)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            stock_data['date'],
            stock_data['trade_code'],
            stock_data['high'],
            stock_data['low'],
            stock_data['open'],
            stock_data['close'],
            stock_data['volume']
        ))
        
        conn.commit()
        new_id = cursor.lastrowid
        
        conn.close()
        
        return jsonify({"id": new_id, "message": "Stock created successfully"}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 400

@app.route('/api/stocks/<int:id>', methods=['PUT'])
def update_stock(id):
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
        
    stock_data = request.json
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        UPDATE stocks
        SET date = ?, trade_code = ?, high = ?, low = ?, open = ?, close = ?, volume = ?
        WHERE id = ?
        ''', (
            stock_data['date'],
            stock_data['trade_code'],
            stock_data['high'],
            stock_data['low'],
            stock_data['open'],
            stock_data['close'],
            stock_data['volume'],
            id
        ))
        
        conn.commit()
        
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({"error": "Stock not found"}), 404
            
        conn.close()
        
        return jsonify({"message": "Stock updated successfully"})
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 400

@app.route('/api/stocks/<int:id>', methods=['DELETE'])
def delete_stock(id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM stocks WHERE id = ?", (id,))
    conn.commit()
    
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Stock not found"}), 404
        
    conn.close()
    
    return jsonify({"message": "Stock deleted successfully"})

if __name__ == '__main__':
    init_db()
    # Run the application
    app.run(debug=True, port=5000)
    