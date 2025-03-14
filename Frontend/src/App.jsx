import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import EditableTable from './components/EditableTable';
import StockForm from './components/StockForm';
import './App.css';
import Watermark from './components/Watermark'; 

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tradeCodes, setTradeCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/stocks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setStocks(data);
      
      const codes = [...new Set(data.map(item => item.trade_code))];
      setTradeCodes(codes);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setSelectedStock(null);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/stocks/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete record');
        }
        
        fetchStocks(); // Refresh data after deletion
      } catch (err) {
        console.error("Error deleting record:", err);
        setError(err.message);
      }
    }
  };

  const handleSave = async (stockData) => {
    try {
      let response;
      
      if (stockData.id) {
        response = await fetch(`http://localhost:5000/api/stocks/${stockData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockData),
        });
      } else {
        response = await fetch('http://localhost:5000/api/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockData),
        });
      }
      
      if (!response.ok) {
        throw new Error('Failed to save record');
      }
      
      setSelectedStock(null);
      setIsAdding(false);
      fetchStocks(); // Refresh data after saving
    } catch (err) {
      console.error("Error saving record:", err);
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setSelectedStock(null);
    setIsAdding(false);
  };

  const filteredStocks = selectedCode 
    ? stocks.filter(stock => stock.trade_code === selectedCode)
    : stocks;

  const chartData = {
    labels: filteredStocks.slice(0, 50).map(stock => stock.date),
    datasets: [
      {
        label: 'Closing Price',
        data: filteredStocks.slice(0, 50).map(stock => stock.close),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Watermark />
      <header>
        <h1>📈 Stock Market Dashboard</h1>
        <div className="actions">
          <select 
            value={selectedCode} 
            onChange={(e) => setSelectedCode(e.target.value)}
            className="filter-select"
          >
            <option value="">All Stocks</option>
            {tradeCodes.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          <button className="add-button" onClick={handleAdd}>Add New Stock</button>
        </div>
      </header>

      {(selectedStock || isAdding) && (
        <StockForm 
          stock={selectedStock} 
          tradeCodes={tradeCodes}
          onSave={handleSave} 
          onCancel={handleCancel}
        />
      )}

      {filteredStocks.length > 0 && (
        <div className="chart-container">
          <h2>Stock Price Trend {selectedCode && `- ${selectedCode}`}</h2>
          <Line data={chartData} />
        </div>
      )}

      <EditableTable 
        stocks={filteredStocks} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to Janata WiFi</h1>
        <p>Your trusted internet service provider.</p>
      </div>
    </div>
  );
}

export default App;