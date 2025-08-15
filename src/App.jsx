import { useEffect, useState } from "react";
import "./App.css";
import Slideshow from "./components/SlideShow";
import "./styles/theme-c.css";
import "./styles/theme-b.css";
import "./styles/theme-e.css";
import "./styles/theme-d.css";
import "./styles/theme-f.css";

import ConfigPanel from "./components/ConfigPanel";
import settingIcon from "./assets/setting-icon.png";
import CommandBar from "./components/Commandbar";
import OrderPhotos from "./components/orderPhotos";

function App() {
  const sample = [
    {
      id: "basilique-notre-dame-de-fourviere-lyon-20250815.jpg",
      fileUrl: "/Sample-Photos/basilique-notre-dame-de-fourviere-lyon.jpg",
      caption: "BASILIQUE NOTRE DAME DE FOURVIERE LYON ",
    },
    {
      id: "beautiful-view-in-lyon-20250815.jpg",
      fileUrl: "/Sample-Photos/beautiful-view-in-lyon.jpg",
      caption: "BEAUTIFUL VIEW IN LYON ",
    },
    {
      id: "place-bellecour-lyon-20250815.jpg",
      fileUrl: "/Sample-Photos/place-bellecour-lyon.jpg",
      caption: "PLACE BELLECOUR LYON ",
    },
    {
      id: "tour-metalique-lyon-20250815.jpg",
      fileUrl: "/Sample-Photos/tour-metalique-lyon.jpg",
      caption: "TOUR METALIQUE LYON ",
    },
  ];
  const [photos, setPhotos] = useState([]);
  const [operatingMode, setOperatingMode] = useState("random");
  const [theme, setTheme] = useState("theme-b");
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [isCommandBarOpen, setCommandBarOpen] = useState(false);
  const [isOrderPhotosOpen, setIsOrderPhotosOpen] = useState(false);
  const [showSample, setShowSample] = useState(true);
  const commands = [
    {
      label: "Change to manual control mode",
      action: () => setOperatingMode("manual"),
    },
    {
      label: "Change to auto-playing mode",
      action: () => setOperatingMode("auto"),
    },
    {
      label: "Change to random playing mode",
      action: () => setOperatingMode("random"),
    },
    {
      label: "switch theme a",
      action: () => setTheme("theme-a"),
    },
    {
      label: "switch theme b",
      action: () => setTheme("theme-b"),
    },
    {
      label: "switch theme c",
      action: () => setTheme("theme-c"),
    },
    {
      label: "switch theme d",
      action: () => setTheme("theme-d"),
    },
    {
      label: "switch theme f",
      action: () => setTheme("theme-f"),
    },
  ];

  function loadPhotos(files) {
    const validPhotos = files.filter((file) => file.type.startsWith("image/"));
    const photoObjects = validPhotos.map((file) => ({
      id: file.name,
      fileUrl: URL.createObjectURL(file),
      caption: file.name.split(".")[0].replace("-", " "),
    }));
    setPhotos(() => [...photoObjects]);
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    loadPhotos(files);
  }

  function handleInput(event) {
    const files = Array.from(event.target.files);
    loadPhotos(files);
    event.target.value = "";
  }

  useEffect(() => {
    if (showSample) {
      setPhotos(sample);
    } else {
      setPhotos([]);
    }
  }, [showSample]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (!isCommandBarOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
          e.preventDefault();
          setCommandBarOpen(true);
        }
      } else {
        if (e.key === "Escape") {
          e.preventDefault();
          setCommandBarOpen(false);
        }
      }
    });
  }, []);

  return (
    <>
      <div className="flex-btw">
        <button
          className="config-panel-btn"
          onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)}
        >
          Config{" "}
          <img
            src={settingIcon}
            alt="Settings"
            style={{ width: 16, height: 16 }}
          />
        </button>

        <div
          id="drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          drop here or{" "}
          <input
            type="file"
            name="file"
            id="file-input"
            multiple
            onChange={handleInput}
            accept="image/*"
          />
        </div>
      </div>

      <Slideshow photos={photos} mode={operatingMode} theme={theme} />

      {isConfigPanelOpen && (
        <ConfigPanel
          setTheme={(v) => setTheme(v)}
          setMode={(v) => setOperatingMode(v)}
          setIsConfigPanelOpen={setIsConfigPanelOpen}
          theme={theme}
          operatingMode={operatingMode}
          openOrderPhotos={() => setIsOrderPhotosOpen(true)}
        />
      )}

      {isCommandBarOpen && (
        <CommandBar setCommandBarOpen={setCommandBarOpen} commands={commands} />
      )}

      {isOrderPhotosOpen && (
        <OrderPhotos
          photos={photos}
          setPhotos={setPhotos}
          close={() => setIsOrderPhotosOpen(false)}
        />
      )}
      <p>
        Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open command bar
      </p>
      <p>current theme: {theme}</p>
      <p>current mode: {operatingMode}</p>
      <p>
        <input
          type="checkbox"
          checked={showSample}
          onChange={(e) => setShowSample(e.target.checked)}
        />
        Show Sample Photos
      </p>
    </>
  );
}

export default App;
