import React from 'react';
import './UptimeMonitor.css'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const UptimeMonitor = () => {
  const uptimeBlocks = [
    { status: 'offline', start: 0, end: 6, duration: '6H' },
    { status: 'online', start: 6, end: 10, duration: '3H 1m' },
    { status: 'offline', start: 10, end: 14, duration: '3H 55m' },
    { status: 'online', start: 14, end: 19, duration: '4h 25m' },
    { status: 'future', start: 19, end: 24 }
  ];

  const statusColors = {
    offline: "#F44336",
    online: "#4CAF50",
    future: "#616161"
  };

  const renderTooltip = (props, status, duration) => (
    <Tooltip id="button-tooltip" {...props}>
      <div className="custom-tooltip">
        <div className="status-box">
          <span className="status-dot" style={{ backgroundColor: statusColors[status] }}></span>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
        <div className="duration">{duration}</div>
      </div>
    </Tooltip>
  );

  return (
    <div className="uptime-container">
      <div className="d-flex align-items-center mb-3">
        <p className="uptime-title ml-4 mr-4">Uptime</p>
        <div className="d-flex align-items-center mb-3">
          <div className="d-flex align-items-center me-4">
            <span className="legend-box bg-success me-2"></span>
            <span>Online</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="legend-box bg-danger me-2"></span>
            <span>Offline</span>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="d-flex uptime-bar">
        {uptimeBlocks.map((block, index) => (
          block.status === 'future' ? (
            <div
              key={index}
              className="uptime-block"
              style={{ backgroundColor: statusColors[block.status], width: `${((block.end - block.start) / 24) * 100}%` }}
            ></div>
          ) : (
            <OverlayTrigger
              key={index}
              placement="bottom"
              overlay={(props) => renderTooltip(props, block.status, block.duration)}
            >
              <div
                className="uptime-block"
                style={{ backgroundColor: statusColors[block.status], width: `${((block.end - block.start) / 24) * 100}%` }}
              ></div>
            </OverlayTrigger>
          )
        ))}
      </div>

      {/* Hour tick marks */}
      <div className="d-flex w-100 position-relative mt-1 mb-4">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="flex-grow-1 text-center position-relative">
            <div className="hour-tick"></div>
            <div className="hour-number">{i}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UptimeMonitor;