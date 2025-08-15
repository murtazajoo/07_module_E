import React from "react";
import "../styles/order-photos.css";
export default function OrderPhotos({ photos, setPhotos, close }) {
  return (
    <div className="order-photos-con">
      <div className="order-photos">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.fileUrl} alt={photo.caption} />
          </div>
        ))}
        <button className="close-btn" onClick={() => close()}>
          Close
        </button>
      </div>
    </div>
  );
}
