import { useFavorites } from "./FavoritesContext";
import { useEffect, useState } from "react";

export default function ArtworkCard({ art, onClick, spotlight }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === art.id);

  // 3D tilt effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // max tilt 20deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className={`art-card ${spotlight ? "spotlight" : ""}`}
      style={{
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.2s",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={art.img} alt={art.title} loading="lazy" onClick={onClick} />

      <div className="art-info">
        <h2>{art.title}</h2>
        <p>by {art.artist}</p>
        <span
          className={`heart ${isFavorite ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(art);
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </div>
    </div>
  );
}
