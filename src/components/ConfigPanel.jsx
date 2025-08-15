import React from "react";

import "../styles/config-panel.css";

export default function ConfigPanel({
  setTheme,
  setIsConfigPanelOpen,
  setMode,
  theme,
  operatingMode,
  openOrderPhotos,
}) {
  return (
    <div className="config-con">
      <div className="config-panel">
        <h2>Configuration Panel</h2>
        <div>
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            defaultValue={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="theme-a">Theme A</option>
            <option value="theme-b">Theme B</option>
            <option value="theme-c">Theme C</option>
            <option value="theme-d">Theme D</option>
            <option value="theme-e">Theme E</option>
            <option value="theme-f">Theme F</option>
          </select>
        </div>
        <div>
          <label htmlFor="mode">Mode:</label>
          <select
            id="mode"
            defaultValue={operatingMode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="random">Random</option>
            <option value="auto">auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <div>
          <label htmlFor="order-photos">Order Photos:</label>
          <button onClick={openOrderPhotos}>Open Order Photos</button>
        </div>
        <button onClick={() => setIsConfigPanelOpen(false)}>
          Close Config Panel
        </button>
      </div>
    </div>
  );
}
