// src/pages/BrandsInstallation.jsx
import React from "react";

const BrandsInstallation = () => (
  <div className="siq-page">
    <div className="siq-page-header">
      <h1>GCT COIMBATORE</h1>
    </div>

    <div className="siq-page-body siq-page-split">
      <div className="siq-card">
        <h3>Install the below code on your website to start using SalesIQ.</h3>
        <p>
          Copy and paste the code right before the closing <code>&lt;/body&gt;</code> tag of
          your website's HTML source code.
        </p>
        <pre className="siq-code-block">
{`<script>window.$zoho=window.$zoho || {};window.$zoho.salesiq={...}</script>`}
        </pre>
      </div>

      <div className="siq-card siq-brands-help">
        <h2>Need help?</h2>
        <p>Here are installation tutorials for various platforms.</p>
        <div className="siq-icon-row">
          <span>WordPress</span>
          <span>Magento</span>
          <span>Shopify</span>
          <span>…</span>
        </div>
      </div>
    </div>
  </div>
);

export default BrandsInstallation;
