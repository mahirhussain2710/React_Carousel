import { useState, useEffect, useCallback } from "react";
import "./ImageCarousel.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    caption: "Mountain Peaks",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
    caption: "Forest Path",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    caption: "Tropical Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    caption: "Desert Dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80",
    caption: "Starry Night",
  },
];

export default function ImageCarousel() {
  // Step 2 – State Management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = (newIndex, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimating(false);
    }, 400);
  };

  // Step 3 – Navigation Controls
  const nextImage = useCallback(() => {
    const next = (currentIndex + 1) % images.length;
    goTo(next, "next");
  }, [currentIndex, animating]);

  const prevImage = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    goTo(prev, "prev");
  };

  // Step 5 – Auto-Rotation with cleanup
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval); // cleanup on unmount
  }, [nextImage]);

  return (
    <div className="carousel-wrapper">
      <h1 className="carousel-title">Gallery</h1>

      <div className="carousel-stage">
        {/* Step 4 – Display current image */}
        <img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].caption}
          className={`carousel-image ${animating ? `slide-out-${direction}` : "slide-in"}`}
        />

        <div className="carousel-caption">{images[currentIndex].caption}</div>

        {/* Step 3 – Prev / Next buttons */}
        <button className="carousel-btn prev" onClick={prevImage} aria-label="Previous">
          &#8592;
        </button>
        <button className="carousel-btn next" onClick={nextImage} aria-label="Next">
          &#8594;
        </button>

        {/* Slide counter */}
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => goTo(i, i > currentIndex ? "next" : "prev")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}