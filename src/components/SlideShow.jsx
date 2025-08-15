import React, { useState, useEffect, useCallback } from "react";
import PhotoItem from "./PhotoItem";

export default function Slideshow({ photos, mode, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [photoStack, setPhotoStack] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const changePhoto = useCallback(
    (newIndex) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      setTimeout(
        () => {
          setCurrentIndex(newIndex);
          setIsTransitioning(false);
        },
        theme === "theme-d" ? 0 : 800
      );
    },
    [isTransitioning]
  );

  const nextPhoto = useCallback(() => {
    const newIndex = (currentIndex + 1) % photos.length;
    changePhoto(newIndex);
  }, [currentIndex, photos.length, changePhoto]);

  const prevPhoto = useCallback(() => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    changePhoto(newIndex);
  }, [currentIndex, photos.length, changePhoto]);

  useEffect(() => {
    if (!mode || mode === "manual") return;

    const interval = setInterval(() => {
      if (mode === "auto") {
        nextPhoto();
      } else if (mode === "random") {
        const randomIndex = Math.floor(Math.random() * photos.length);
        changePhoto(randomIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [mode, nextPhoto, changePhoto, photos.length]);

  useEffect(() => {
    if (photoStack.length >= photos.length)
      setPhotoStack((prev) => [...prev.slice(1)]);
    setPhotoStack((prev) => {
      const currentPhoto = photos[currentIndex];
      const rotation = Math.floor(Math.random() * 11) - 5;
      const stackIndex = prev.length;
      return [...prev, { ...currentPhoto, rotation, stackIndex }];
    });
  }, [currentIndex, photos]);

  const currentPhoto = photos[currentIndex];

  const slideshowRef = React.useRef(null);

  const handleFullscreen = () => {
    const el = slideshowRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", () =>
      setIsFullscreen(!!document.fullscreenElement)
    );
    function handleKeyForManual(e) {
      if (mode === "manual") {
        if (e.key === "ArrowLeft") {
          prevPhoto();
        } else if (e.key === "ArrowRight") {
          nextPhoto();
        }
      }
    }

    document.addEventListener("keydown", handleKeyForManual);
    return () => {
      document.removeEventListener("fullscreenchange", () =>
        setIsFullscreen(!!document.fullscreenElement)
      );
      document.removeEventListener("keydown", handleKeyForManual);
    };
  }, []);

  if (!photos || photos.length === 0) {
    return <div>No photos available</div>;
  }

  return (
    <div>
      <div
        ref={slideshowRef}
        className={`slideshow ${theme} ${isFullscreen ? "fullscreen" : ""}`}
      >
        {(theme === "theme-c" ||
          theme === "theme-b" ||
          theme === "theme-a" ||
          theme === "theme-f") && (
          <PhotoItem
            key={currentPhoto.fileUrl}
            photo={currentPhoto}
            theme={theme}
            animationClass={isTransitioning ? "exit" : "enter"}
          />
        )}
        {theme === "theme-d" &&
          photoStack.map((photo, index) => (
            <PhotoItem
              key={photo.fileUrl}
              photo={photo}
              theme={theme}
              rotation={photo.rotation}
              stackIndex={photo.stackIndex}
              animationClass={
                index === currentIndex
                  ? isTransitioning
                    ? "exit"
                    : "enter"
                  : ""
              }
            />
          ))}

        {theme === "theme-e" && (
          <>
            <div className="current-photo">
              <div
                className={`first-half ${isTransitioning ? "exit" : "enter"}`}
                style={{
                  backgroundImage: `url(${currentPhoto.fileUrl})`,
                }}
              ></div>
              <div
                className={`second-half ${isTransitioning ? "exit" : "enter"}`}
                style={{
                  backgroundImage: `url(${currentPhoto.fileUrl})`,
                }}
              ></div>
              <div className={`over-lap ${isTransitioning ? "exit" : "enter"}`}>
                <img src={currentPhoto.fileUrl} alt="" />
              </div>
            </div>
          </>
        )}
      </div>
      {mode === "manual" && (
        <>
          <button
            onClick={prevPhoto}
            disabled={isTransitioning}
            className="manual-handle prev"
          >
            {" "}
            &larr; prev
          </button>
          <button
            onClick={nextPhoto}
            disabled={isTransitioning}
            className="manual-handle next"
          >
            next &rarr;
          </button>
        </>
      )}
      <button
        onClick={handleFullscreen}
        style={{ marginLeft: 8 }}
        className="fullscreen-button"
      >
        Fullscreen ⛶
      </button>
      <div>
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}
