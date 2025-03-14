import React, { useState, useEffect } from 'react';

// Import the Watermark component you provided
const Watermark = () => {
  const [isVisible, setIsVisible] = useState(true);
    

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div>
      <button 
        onClick={toggleVisibility} 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
        
          padding: '5px 10px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          color: 'white',

          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isVisible ? 'Hide Watermark' : 'Show Watermark'}
      </button>

      {isVisible && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '5rem',
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.1)', // Light transparent color
            
          zIndex: '-1', // Ensure it stays behind other content
          pointerEvents: 'none', // Ensure it doesn't block interaction with other elements
          userSelect: 'none', // Prevent text selection
          transform: 'rotate(-45deg)', // Optional: Diagonal effect for watermark
          overflow: 'hidden', // Ensure no overflow outside the viewport
        }}>
          Janata WiFi
        </div>
      )}
    </div>
  );
};

// Dashboard component
const JanataWiFiDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [networkData, setNetworkData] = useState([
    { 
      name: 'Janata WiFi - Hub 1', 
      status: 'Active', 
      users: 128, 
      strength: 'Excellent', 
      updated: '2 mins ago' 
    },
    { 
      name: 'Janata WiFi - Hub 2', 
      status: 'Active', 
      users: 95, 
      strength: 'Good', 
      updated: '5 mins ago' 
    },
    { 
      name: 'Janata WiFi - Hub 3', 
      status: 'Inactive', 
      users: 0, 
      strength: 'Poor', 
      updated: '1 hour ago' 

    }
    
  ]);

//   // Update data periodically for simulation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNetworkData(prev => {
//         const newData = [...prev];
//         newData[0].users = Math.floor(100 + Math.random() * 50);
//         newData[1].users = Math.floor(80 + Math.random() * 30);
//         return newData;
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

  // Calculate active networks
  const activeNetworks = networkData.filter(net => net.status === 'Active').length;
  const totalNetworks = networkData.length;

  // Filter the networks based on selection
  const filteredNetworks = networkData.filter(network => {
    if (filter === 'all') return true;
    if (filter === 'active') return network.status === 'Active';
    if (filter === 'inactive') return network.status === 'Inactive';
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Add the Watermark component */}
      <Watermark />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center pb-5 border-b border-gray-200 mb-6">
          <h1 className="text-3xl font-bold text-gray-700 ">Janata WiFi Dashboard</h1>
          
        </header>
        
        {/* Network Visualization */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Network</h2>
          <div className="relative h-48 flex justify-center items-center">
            {/* Animated WiFi circles */}
            <div className="relative flex justify-center items-center">
              {[40, 80, 120, 160].map((size, index) => (
                <div 
                  key={index}
                  className="absolute rounded-full border-2 border-blue-400"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: 0.7 - (index * 0.15),
                    animation: `pulse 3s infinite ${index * 0.5}s`
                  }}
                />
              ))}
              <div className="relative z-10 text-xl font-bold text-gray-700">
                Janata WiFi 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.1);
            opacity: 0.8;
          }
          70% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default JanataWiFiDashboard;