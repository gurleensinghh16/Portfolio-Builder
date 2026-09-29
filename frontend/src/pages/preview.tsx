import { useEffect, useState } from "react";

import ModernTemplate from "../templates/modern/ModernTemplate";
import DeveloperTemplate from "../templates/developer/DeveloperTemplate";
import MinimalTemplate from "../templates/minimal/MinimalTemplate";
import { downloadPortfolio } from "../utils/downloadPortfolio";

import type { PortfolioData } from "../types/portfolio";

function Preview() {
  const [portfolioData, setPortfolioData] =
    useState<PortfolioData | null>(null);

  const [selectedTemplate, setSelectedTemplate] =
    useState("modern");

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData");
    const savedTemplate = localStorage.getItem("selectedTemplate");

    if (savedData) {
      setPortfolioData(JSON.parse(savedData));
    }

    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  // If no portfolio data is found
  if (!portfolioData) {
    return (
      <div className="preview-loading">
        <h1>No portfolio data found</h1>
        <p>Please complete the portfolio form first.</p>
      </div>
    );
  }

  return (
  <>
    <div className="preview-actions">
      <button onClick={downloadPortfolio}>
        Download Source Code
      </button>
    </div>

    <div className="portfolio-preview-page">

      {selectedTemplate === "modern" && (
        <ModernTemplate data={portfolioData} />
      )}

      {selectedTemplate === "developer" && (
        <DeveloperTemplate data={portfolioData} />
      )}

      {selectedTemplate === "minimal" && (
        <MinimalTemplate data={portfolioData} />
      )}

    </div>
  </>
);

export default Preview;