import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DeviceDetails.css"; 
import { PiCellSignalHighFill } from "react-icons/pi";
import { GoCalendar } from "react-icons/go"; 
import { MdOutlineTune } from "react-icons/md"; 
import TrafficChart from "./TrafficChart"; 
import { MdOutlineFileDownload } from "react-icons/md"; 
import UptimeMonitor from "./UptimeMonitor"; 

const DeviceStatus = ({ device }) => {
  if (!device) {
    return <p>Loading device data...</p>;
  }

  return (
    <div className="device-status-container">
      <div className="breadcrumb">
        <Link to="/devices">Devices</Link> &gt; <span>{device.Name}</span>
      </div>

      {/* Device Info */}
      <div className="device-info">
        <div className="info-group">
          <div className="info-label">Name</div>
          <div className="info-value">{device.Name}</div>
        </div>
        <div className="info-group">
          <div className="info-label">Status</div>
          <div className="info-value">
            <span className={`status ${device.Status?.toLowerCase()}`}>{device.Status}</span>
            <span className={`status ${device.Deployment?.toLowerCase()}`}>{device.Deployment}</span>
          </div>
        </div>
        <div className="info-group">
          <div className="info-label">USB</div>
          <div className="info-value"><span className={`usb status ${device.USB?.toLowerCase()}`}>{device.USB}</span></div>
        </div>
        <div className="info-group">
          <div className="info-label">Store</div>
          <div className="info-value">{device.Store}</div>
        </div>
        <div className="info-group">
          <div className="info-label">FMCG</div>
          <div className="info-value">{device.FMCG}</div>
        </div>
        <div className="info-group">
          <div className="info-label">User</div>
          <div className="info-value">{device.User}</div>
        </div>
        <div className="info-group">
          <div className="info-label">Location</div>
          <div className="info-value">{device.Location}</div>
        </div>
      </div>
      <div className="device-info">
        <div className="info-group">
          <div className="info-label">Battery Temperature</div>
          <div className="info-value">{device.Battery_Temperature}</div>
        </div>
        <div className="info-group">
          <div className="info-label">Battery</div>
          <div className="info-value">{device.Battery}</div>
        </div>
        <div className="info-group">
          <div className="info-label">Network</div>
          <div className="info-value">
            {device.Network}
            <span style={{ fontSize: 14, paddingLeft: 5, position: 'relative', top: '-3px', color: '#FFFFFFBF' }}>
              {device.range}
            </span>
            <PiCellSignalHighFill style={{ fontSize: '20px' }} />
          </div>
        </div>
      </div>

        {/* Tabs */}
      <div className="tabs">
        <span className="tab active">Analytics</span>
        <span className="tab">Configuration</span>
        <span className="tab">System Information</span>
        <span className="tab">Edit Device</span>
      </div>

        {/* Date & Filter */}
      <div className="date-filter-container">
        <DateDisplay />
        <FilterDisplay />
      </div>

        {/* Traffic Metrics */}
      <div className="row device-details-equal-height-cards">
        <div className="col-lg-9 col-md-12 col-sm-12">
          <div className="device-details-card-traffics-metrics">
            <div className="d-flex justify-content-between align-items-center m-2">
              <p className="mt-2" style={{ fontSize: 20, fontWeight: 400 }}>Traffic Metrics</p>
              <MdOutlineFileDownload size={24} style={{ cursor: "pointer" }} />
            </div>
            <TrafficChart />
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="col-lg-3 col-md-12 col-sm-12">
          <div className="device-details-card-engagement-metrics p-4">
            <p className="title mt-3">Engagement Metrics</p>
            <div className="data1">
              <p className="mb-1 mt-4">Engagement Rate</p>
              <div className="d-flex justify-content-between metric-text">
                <span className="text-green mb-2">50%</span>
                <span className="text-green mb-2">50</span>
              </div>
              <div className="progress mb-2">
                <div className="progress-bar" style={{ width: "50%", backgroundColor: "#00A44B" }}></div>
              </div>
            </div>
            <div className="data0">
              <p className="mt-3 mb-1">Pre-Engagement Rate</p>
              <div className="d-flex justify-content-between metric-text">
                <span className="text-red mb-2">50%</span>
                <span className="text-red mb-2">50</span>
              </div>
              <div className="progress mb-2">
                <div className="progress-bar" style={{ width: "50%", backgroundColor: "#DD2D24" }}></div>
              </div>
            </div>
            <div className="d-flex justify-content-between metric-text mt-3">
              <p className="text-blue">Total Footfalls</p>
              <span className="text-blue">100</span>
            </div>
          </div>
        </div>
      </div>

        {/* Uptime Monitor */}
      <div className="row mt-2">
        <div className="col-12">
          <UptimeMonitor /> 
        </div>
      </div>
    </div>
  );
};

const DateDisplay = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/, /g, ', ');

  return (
    <div className="date-display">
      <GoCalendar className="calendar-icon" />
      <span className="date-text">{formattedDate}</span>
    </div>
  );
};

const FilterDisplay = () => {
  return (
    <div className="filter-display">
      <MdOutlineTune className="filter-icon" />
      <span className="filter-text">Filters</span>
    </div>
  );
};

const DeviceDetails = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch(`/DeviceData.json`)
      .then(response => response.json())
      .then(data => {
        const foundDevice = data.find(d => d.id === id);
        setDevice(foundDevice);
      })
      .catch(error => console.error("Error fetching devices:", error));
  }, [id]);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="device-details-page">
        <div className="container-fluid mt-4">
          <DeviceStatus device={device} />
        </div>
      </div>
    </>
  );
};

export default DeviceDetails;