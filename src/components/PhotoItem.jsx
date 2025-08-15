import React from "react";

const PhotoItem = React.memo(({ photo, theme, animationClass ,rotation,stackIndex}) => {
    return (
        <div className={`photo photo-wrapper ${animationClass}`}
    
        >
            <div
                style={{
            transform: `rotate(${rotation}deg)`,
            zIndex: stackIndex
                 }}
            >
                <img src={photo.fileUrl} alt={photo.caption} />
                <div className="caption">
                    {theme === "theme-c" ? 
                        photo?.caption?.split(' ').map((word, index) => (
                            <span
                                key={`${index}-${word}`}
                                style={{ animationDelay: `${(index + 1) * 300}ms` }}
                            >
                                {word}  &nbsp;
                            </span>
                        )) : 
                        photo?.caption
                    }
                </div>
            </div>
        </div>
    );
});

export default PhotoItem;