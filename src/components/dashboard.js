import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import Header from "./header";
import TrafficChart from "./TrafficChart";
import { Chart, registerables } from "chart.js";
import { MdOutlineFileDownload } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

Chart.register(...registerables);

const topPerformingRobAds = [
  { device_id: "DEV0001", store: "TEST-STORE", city: "TEST-CITY", poc: "TEST-POC" },
  { device_id: "DEV0002", store: "TEST-STORE", city: "TEST-CITY", poc: "TEST-POC" },
  { device_id: "DEV0003", store: "TEST-STORE", city: "TEST-CITY", poc: "TEST-POC" },
  { device_id: "DEV0009", store: "TEST-STORE", city: "TEST-CITY", poc: "TEST-POC" },
  { device_id: "DEV0010", store: "TEST-STORE", city: "TEST-CITY", poc: "TEST-POC" },
];

const offlineRobAds = [
  {
    device_id: "DEV0004",
    last_seen: "26/02/2025 at 12:26:09 PM",
    time_elapsed: "5 Days 23 Hours 57 Minutes Ago",
    store: "TEST-STORE",
    city: "TEST-CITY",
    poc: "TEST-POC",
  },
  {
    device_id: "DEV0005",
    last_seen: "26/02/2025 at 12:26:09 PM",
    time_elapsed: "5 Days 23 Hours 57 Minutes Ago",
    store: "TEST-STORE",
    city: "TEST-CITY",
    poc: "TEST-POC",
  },
  {
    device_id: "DEV0006",
    last_seen: "26/02/2025 at 12:26:09 PM",
    time_elapsed: "5 Days 23 Hours 57 Minutes Ago",
    store: "TEST-STORE",
    city: "TEST-CITY",
    poc: "TEST-POC",
  },
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pieChartRef = useRef(null);
  const pieCanvasRef = useRef(null);
  const trafficMetricsRef = useRef(null);
  const robadsAvailabilityRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!pieCanvasRef.current) return;
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }

    const pieCtx = pieCanvasRef.current.getContext("2d");
    pieChartRef.current = new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels: ["Online", "Offline"],
        datasets: [{ backgroundColor: ["#00A44B", "#DD2D24"], data: [8, 1], borderWidth: 0 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        cutout: "60%",
      },
    });

    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const setEqualHeight = () => {
      if (trafficMetricsRef.current && robadsAvailabilityRef.current) {
        const trafficMetricsHeight = trafficMetricsRef.current.offsetHeight;
        const robadsAvailabilityHeight = robadsAvailabilityRef.current.offsetHeight;
        const maxHeight = Math.max(trafficMetricsHeight, robadsAvailabilityHeight);

        trafficMetricsRef.current.style.height = `${maxHeight}px`;
        robadsAvailabilityRef.current.style.height = `${maxHeight}px`;
      }
    };

    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);

    return () => {
      window.removeEventListener("resize", setEqualHeight);
    };
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        <div className="container-fluid mt-4">
          <h3 className="mb-4">Dashboard</h3>
          <div className="row">

            {/* Traffic Metrics */}
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="card card-traffics-metrics" ref={trafficMetricsRef}>
                <div className="d-flex justify-content-between align-items-center m-2">
                  <p className="mt-2" style={{ fontSize: 20, fontWeight: 400 }}>Traffic Metrics</p>
                  <MdOutlineFileDownload size={24} style={{ cursor: "pointer" }} />
                </div>
                <TrafficChart />
              </div>
            </div>

            {/* RobAd Availability */}
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="card card-robads-availability" ref={robadsAvailabilityRef}>
                <div className="d-flex justify-content-between align-items-center m-2">
                  <p className="mt-2" style={{ fontSize: 20, fontWeight: 400 }}>RobAd Availability</p>
                  <MdOutlineFileDownload size={24} style={{ cursor: "pointer" }} />
                </div>
                <canvas ref={pieCanvasRef} className="piecanvas"></canvas>

                <div className="custom-legend">
                  <span className="legend-item">
                    <span className="legend-square online"></span> Online
                  </span>
                  <span className="legend-item">
                    <span className="legend-square offline"></span> Offline
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="row mt-2">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card card-engagement-metrics" style={{ padding: 30 }}>
                <p className="title">Engagement Metrics</p>

                <div className="data1">
                  <p className="mb-1 mt-2">Data 1</p>
                  <div className="d-flex justify-content-between metric-text">
                    <span className="text-green mb-2">50%</span>
                    <span className="text-green mb-2">50</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "50%", backgroundColor:" #00A44B" }}></div>
                  </div>
                </div>

                <div className="data0">
                  <p className="mt-3 mb-1">Data 0</p>
                  <div className="d-flex justify-content-between metric-text">
                    <span className="text-red mb-2">50%</span>
                    <span className="text-red mb-2">50</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "50%", backgroundColor:" #DD2D24"}}></div>
                  </div>
                </div>

                <div className="d-flex justify-content-between metric-text">
                  <p className="text-blue">Data 2</p>
                  <span className="text-blue">100</span>
                </div>
              </div>
            </div>

            {/* Top Performing RobAds */}
            <div className="col-lg-3 col-md-6 col-sm-12 top-performing-robads-container">
              <div className="card top-performing-robads">
                <p className="title">Top Performing RobAds</p>
                <div className="scrollable-content">
                  {topPerformingRobAds.map((device) => (
                    <div key={device.device_id} className="device-card">
                      <p className="device-id">{device.device_id}</p>
                      <p className="device-info">Store: {device.store}</p>
                      <p className="device-info">City: {device.city}</p>
                      <p className="device-info">POC: {device.poc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Offline RobAds */}
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card card-offline-robads">
                <p className="title">Offline RobAds</p>
                <div className="scrollable-content">
                  {offlineRobAds.map((device) => (
                    <div key={device.device_id} className="offline-device">
                      <p className="device-id">{device.device_id}</p>
                      <p className="device-info">Last Seen: {device.last_seen}</p>
                      <p className="device-info">{device.time_elapsed}</p>
                      <p className="device-info">Store: {device.store}</p>
                      <p className="device-info">City: {device.city}</p>
                      <p className="device-info">POC: {device.poc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
