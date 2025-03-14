import React from 'react';

const EditableTable = ({ stocks, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <h2>Stock Data</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Trade Code</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map(stock => (
                <tr key={stock.id || `${stock.date}-${stock.trade_code}`}>
                  <td>{stock.date}</td>
                  <td>{stock.trade_code}</td>
                  <td>{stock.open}</td>
                  <td>{stock.high}</td>
                  <td>{stock.low}</td>
                  <td>{stock.close}</td>
                  <td>{stock.volume}</td>
                  <td className="actions">
                    <button 
                      className="edit-button" 
                      onClick={() => onEdit(stock)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => onDelete(stock.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No stocks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;