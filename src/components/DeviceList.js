import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DeviceList.css"; 
import { BsUsbSymbol } from "react-icons/bs";
import { MdOutlineBattery5Bar, MdSearch, MdOutlineTune } from "react-icons/md";
import { PiCellSignalHighFill } from "react-icons/pi";

const DeviceCard = ({ device }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/devices/${device.id}`);
  };

  return (
    <div className="device-card" onClick={handleCardClick}>
      <div className="device-header">
        <h5>{device.Name}</h5>
        <div className="icons">
          <BsUsbSymbol className="icon" />
          <MdOutlineBattery5Bar className="icon" />
          <PiCellSignalHighFill className="icon" />
        </div>
      </div>
      <div className="status-container">
        <span className={`badge ${device.Status === "Online" ? "badge-online" : "badge-offline"}`}>
          {device.Status}
        </span>
        <span className={`badge ${device.Deployment === "Deployed" ? "badge-deployed" : "badge-not-deployed"}`}>
          {device.Deployment}
        </span>
      </div>
      <div className="device-info">
        <p><strong>Store:</strong> {device.Store}</p>
        <p><strong>FMCG:</strong> {device.FMCG}</p>
        <p><strong>User:</strong> {device.User}</p>
      </div>
    </div>
  );
};

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch('/DeviceData.json')
      .then(response => response.json())
      .then(data => setDevices(data))
      .catch(error => console.error('Error fetching devices:', error));
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="device-page">
        <div className="container-fluid mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-white">Devices</h3>
            <div className="search-bar-container">
              <div className="search-bar">
                <input type="text" placeholder="Search" className="search-input" />
                <MdSearch className="search-icon" />
                <MdOutlineTune className="filter-icon" />
              </div>
            </div>
          </div>
          <div className="row">
            {devices.map((device, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <DeviceCard device={device} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DevicePage;
