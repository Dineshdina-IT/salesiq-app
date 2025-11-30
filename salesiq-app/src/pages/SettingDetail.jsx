import React from "react";
import { useParams } from "react-router-dom";

const SettingDetail = () => {
  const { page } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "10px" }}>
        {page.replace(/-/g, " ").toUpperCase()}
      </h1>
      <p>This is the {page.replace(/-/g, " ")} settings page.</p>
    </div>
  );
};

export default SettingDetail;
