import React, { useState, useEffect } from 'react';

const StockForm = ({ stock, tradeCodes, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: '',
    trade_code: '',
    high: '',
    low: '',
    open: '',
    close: '',
    volume: ''
  });

  // Initialize form with existing data if editing
  useEffect(() => {
    if (stock) {
      setFormData({
        id: stock.id,
        date: stock.date || '',
        trade_code: stock.trade_code || '',
        high: stock.high || '',
        low: stock.low || '',
        open: stock.open || '',
        close: stock.close || '',
        volume: stock.volume || ''
      });
    }
  }, [stock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="form-container">
      <h2>{stock ? 'Edit Stock' : 'Add New Stock'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="trade_code">Trade Code</label>
            {tradeCodes.length > 0 ? (
              <select
                id="trade_code"
                name="trade_code"
                value={formData.trade_code}
                onChange={handleChange}
                required
              >
                <option value="">Select Code</option>
                {tradeCodes.map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="trade_code"
                name="trade_code"
                value={formData.trade_code}
                onChange={handleChange}
                placeholder="Enter trade code"
                required
              />
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="high">High</label>
            <input
              type="number"
              step="0.01"
              id="high"
              name="high"
              value={formData.high}
              onChange={handleChange}
              placeholder="High price"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="low">Low</label>
            <input
              type="number"
              step="0.01"
              id="low"
              name="low"
              value={formData.low}
              onChange={handleChange}
              placeholder="Low price"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="open">Open</label>
            <input
              type="number"
              step="0.01"
              id="open"
              name="open"
              value={formData.open}
              onChange={handleChange}
              placeholder="Opening price"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="close">Close</label>
            <input
              type="number"
              step="0.01"
              id="close"
              name="close"
              value={formData.close}
              onChange={handleChange}
              placeholder="Closing price"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="volume">Volume</label>
            <input
              type="number"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              placeholder="Trading volume"
              required
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;