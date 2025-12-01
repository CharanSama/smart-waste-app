import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fake dumpster data for the demo (Blacksburg-ish coords)
const DUMPSTERS = [
  {
    id: 1,
    name: "Bin 1 – Library Entrance",
    type: "Trash",
    fillLevel: 82,
    position: [37.2284, -80.4234],
  },
  {
    id: 2,
    name: "Bin 2 – Dining Hall",
    type: "Recycling",
    fillLevel: 46,
    position: [37.2292, -80.4245],
  },
  {
    id: 3,
    name: "Bin 3 – Bus Stop",
    type: "Trash",
    fillLevel: 93,
    position: [37.2275, -80.4222],
  },
];

function App() {
  const [showMap, setShowMap] = useState(true); // start with map visible

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <h1 style={{ textAlign: "center", fontSize: "42px", marginBottom: "10px" }}>
        Smart Waste Management Dashboard
      </h1>

      <h2
        style={{
          textAlign: "center",
          color: "#555",
          fontSize: "20px",
          marginBottom: "30px",
        }}
      >
        Senior Design Project – CDR Demo
      </h2>

      {/* Button row */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setShowMap(!showMap)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          {showMap ? "Hide Map View" : "Show Map View"}
        </button>
      </div>

      {/* Map directly under the button */}
      {showMap && (
        <div
          style={{
            marginTop: "10px",
            maxWidth: "1200px",
            marginInline: "auto",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Map View – Dumpster Locations</h2>

          <div
            style={{
              width: "100%",
              height: "650px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              border: "3px solid #007bff",
            }}
          >
            <MapContainer
              center={[37.2284, -80.4234]} // Campus-ish center
              zoom={15}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {DUMPSTERS.map((bin) => (
                <CircleMarker
                  key={bin.id}
                  center={bin.position}
                  radius={12}
                  pathOptions={{
                    color:
                      bin.fillLevel > 80
                        ? "red"
                        : bin.fillLevel > 50
                        ? "orange"
                        : "green",
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>
                    <b>{bin.name}</b>
                    <br />
                    Type: {bin.type}
                    <br />
                    Fill level: {bin.fillLevel}%
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Cards BELOW the map */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div style={cardStyle}>
          <h3>Dumpster Type</h3>
          <p>Real-time type (Trash / Recycling) will appear here.</p>
        </div>

        <div style={cardStyle}>
          <h3>Fill Level</h3>
          <p>Real-time fill percentage will appear here.</p>
        </div>

        <div style={cardStyle}>
          <h3>Location</h3>
          <p>GPS coordinates / building names will appear here.</p>
        </div>

        <div style={cardStyle}>
          <h3>Route Optimization</h3>
          <p>
            Best route and total distance from the Python algorithm will be
            shown here.
          </p>
        </div>
      </div>
    </div>
  );
}

// Shared styling for all cards
const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default App;
