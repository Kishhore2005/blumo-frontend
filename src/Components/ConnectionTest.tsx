import React, { useState } from "react";
import { testBackendConnection, testCampaignEndpoint } from "../Services/ConnectionTest";

const ConnectionTest: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<string>("");
  const [campaignStatus, setCampaignStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setBackendStatus("Testing...");
    setCampaignStatus("Testing...");

    try {
      // Test backend health
      const backendResult = await testBackendConnection();
      setBackendStatus(backendResult.success ? "✅ Connected" : "❌ Failed");

      // Test campaign endpoint
      const campaignResult = await testCampaignEndpoint();
      setCampaignStatus(campaignResult.success ? "✅ Working" : "❌ Failed");

    } catch (error) {
      setBackendStatus("❌ Error");
      setCampaignStatus("❌ Error");
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    margin: "20px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "20px",
    textAlign: "center",
  };

  const statusItemStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "8px",
    background: "#f7fafc",
    border: "1px solid #e2e8f0",
  };

  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Backend Connection Test</h2>
      
      <div style={statusItemStyle}>
        <span>Backend Health Check:</span>
        <span>{backendStatus}</span>
      </div>
      
      <div style={statusItemStyle}>
        <span>Campaign API:</span>
        <span>{campaignStatus}</span>
      </div>

      <button
        style={buttonStyle}
        onClick={testConnection}
        disabled={isLoading}
      >
        {isLoading ? "Testing..." : "Test Connection"}
      </button>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#718096" }}>
        <strong>Expected URLs:</strong><br/>
        • Backend: http://localhost:3000<br/>
        • Health: http://localhost:3000/health<br/>
        • API: http://localhost:3000/api
      </div>
    </div>
  );
};

export default ConnectionTest; 