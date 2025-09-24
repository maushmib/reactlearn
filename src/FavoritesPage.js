import ArtworkCard from "./ArtworkCard";
import { useFavorites } from "./FavoritesContext";

export default function FavoritesPage({ goBack }) {
  const { favorites } = useFavorites();

  return (
    <div className="gallery-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="gallery-title">⭐ Your Favorites</h1>
        <button onClick={goBack} className="theme-btn">
          🔙 Back
        </button>
      </div>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center" }}>No favorite artworks yet.</p>
      ) : (
        <div className="gallery-grid">
          {favorites.map((art) => (
            <ArtworkCard key={art.id} art={art} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
