import { useState, useEffect } from "react";
import { useAuth } from "./App";
import ArtworkCard from "./ArtworkCard";
import Modal from "./Modal";
import { useTheme } from "./ThemeContext";
import FavoritesPage from "./FavoritesPage";
import { useFavorites } from "./FavoritesContext";
import Confetti from "react-confetti"; // npm install react-confetti
const initialArtworks = [
  { id: 1, title: "Starry Night", artist: "Vincent van Gogh", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/600px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", desc: "One of the most recognized pieces of art in the world, painted in 1889." },
  { id: 2, title: "The Persistence of Memory", artist: "Salvador Dalí", img: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg", desc: "A surreal painting known for its melting clocks, created in 1931." },
  { id: 3, title: "The Scream", artist: "Edvard Munch", img: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg", desc: "An iconic piece symbolizing modern anxiety, painted in 1893." },
  { id: 4, title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg", desc: "Often called the 'Mona Lisa of the North', painted in 1665." },
  { id: 5, title: "Mona Lisa", artist: "Leonardo da Vinci", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg", desc: "Perhaps the most famous portrait in the world, painted in the 16th century." },
    { id: 7, title: "The Last Supper", artist: "Leonardo da Vinci", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg", desc: "Depicts Jesus and his disciples at the moment Jesus announces betrayal." },
  { id: 8, title: "Guernica", artist: "Pablo Picasso", img: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg", desc: "A powerful anti-war painting created in 1937." }
];


export default function Gallery() {
  const { setLoggedIn } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  const [artworks, setArtworks] = useState(initialArtworks);
  const [selectedArt, setSelectedArt] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [spotlightId, setSpotlightId] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newArtwork, setNewArtwork] = useState({ title: "", artist: "", desc: "", img: "" });
  const itemsPerPage = 4;

  // Random spotlight on page load
  useEffect(() => {
    const random = artworks[Math.floor(Math.random() * artworks.length)];
    setSpotlightId(random.id);
  }, []);

  // Spotlight rotation every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = artworks.filter(a => a.id !== spotlightId);
      const random = remaining[Math.floor(Math.random() * remaining.length)];
      setSpotlightId(random.id);
    }, 5000);
    return () => clearInterval(interval);
  }, [spotlightId, artworks]);

  // Search filter
  const filteredArtworks = artworks.filter(
    art => art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentArtworks = filteredArtworks.slice(indexOfFirst, indexOfLast);

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  // Artist Upload
  const handleUpload = () => {
    if (!newArtwork.title || !newArtwork.artist || !newArtwork.img) return alert("Please fill all fields!");
    setArtworks([...artworks, { id: artworks.length + 1, ...newArtwork }]);
    setNewArtwork({ title: "", artist: "", desc: "", img: "" });
    setShowUploadForm(false);
  };

  if (showFavorites) return <FavoritesPage goBack={()=>setShowFavorites(false)} />;

  return (
    <div className={`gallery-container ${theme}`}>
      {/* Controls */}
      <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"10px", alignItems:"center" }}>
        <h1 className="gallery-title">🎨 Virtual Art Exhibition</h1>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <input type="text" placeholder="Search by title or artist..." value={searchQuery} onChange={e=>{setSearchQuery(e.target.value); setCurrentPage(1);}} style={{padding:"8px 12px", borderRadius:"8px", border:"none", outline:"none", minWidth:"200px"}} />
          <button onClick={toggleTheme} className="theme-btn">{theme==="dark"?"🌞 Light Mode":"🌙 Dark Mode"}</button>
          <button onClick={()=>setShowFavorites(true)} className="theme-btn">⭐ Favorites ({favorites.length})</button>
          <button onClick={()=>{setLoggedIn(false); localStorage.removeItem("loggedIn");}} style={{padding:"8px 15px", borderRadius:"8px", border:"none", background:"linear-gradient(90deg, #ff4ecd, #7b2ff7)", color:"white", cursor:"pointer"}}>Logout</button>
          <button onClick={()=>setShowUploadForm(!showUploadForm)} className="theme-btn">🎨 Upload Artwork</button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="upload-form">
          <input type="text" placeholder="Title" value={newArtwork.title} onChange={e=>setNewArtwork({...newArtwork,title:e.target.value})}/>
          <input type="text" placeholder="Artist Name" value={newArtwork.artist} onChange={e=>setNewArtwork({...newArtwork,artist:e.target.value})}/>
          <input type="text" placeholder="Image URL" value={newArtwork.img} onChange={e=>setNewArtwork({...newArtwork,img:e.target.value})}/>
          <textarea placeholder="Description" value={newArtwork.desc} onChange={e=>setNewArtwork({...newArtwork,desc:e.target.value})}></textarea>
          <button onClick={handleUpload} className="theme-btn">Upload</button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {currentArtworks.length>0 ? currentArtworks.map((art)=>(
          <ArtworkCard key={art.id} art={art} onClick={()=>setSelectedArt(art)} spotlight={art.id===spotlightId} onFavorite={()=>setConfetti(true)} />
        )) : <p style={{textAlign:"center", marginTop:"2rem"}}>No artworks found.</p>}
      </div>

      {/* Confetti */}
      {confetti && <Confetti recycle={false} numberOfPieces={100} />}

      {/* Pagination */}
      <div style={{display:"flex", justifyContent:"center", marginTop:"20px", gap:"10px"}}>
        <button onClick={handlePrev} disabled={currentPage===1} className="theme-btn">⬅ Previous</button>
        <span style={{alignSelf:"center"}}>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage===totalPages} className="theme-btn">Next ➡</button>
      </div>

      {/* Modal */}
      {selectedArt && <Modal art={selectedArt} onClose={()=>setSelectedArt(null)} artworks={filteredArtworks} />}
    </div>
  );
}
