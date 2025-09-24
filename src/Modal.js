import { useState } from "react";

export default function Modal({ art, onClose }) {
  const [comments, setComments] = useState([]); // store comments for this session
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddComment = () => {
    if (!newComment) return;
    setComments([...comments, { text: newComment, rating }]);
    setNewComment("");
    setRating(0);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>✖</span>
        <img src={art.img} alt={art.title} />
        <h2>{art.title}</h2>
        <p><i>by {art.artist}</i></p>
        <p>{art.desc}</p>

        {/* Rating Stars */}
        <div style={{ marginTop: "1rem" }}>
          <p><b>Rate this artwork:</b></p>
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              style={{ cursor:"pointer", fontSize:"1.5rem", color: star <= rating ? "#FFD700" : "#ccc" }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment Input */}
        <div style={{ marginTop:"1rem" }}>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e)=>setNewComment(e.target.value)}
            style={{ width:"100%", padding:"8px", borderRadius:"8px", border:"1px solid #ccc" }}
          />
          <button
            onClick={handleAddComment}
            style={{ marginTop:"5px", padding:"8px 12px", border:"none", borderRadius:"8px", background:"linear-gradient(90deg,#ff4ecd,#7b2ff7)", color:"white", cursor:"pointer" }}
          >
            Add Comment
          </button>
        </div>

        {/* Display Comments */}
        <div style={{ marginTop:"1rem" }}>
          <h3>Comments & Ratings:</h3>
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((c,i)=>(
            <div key={i} style={{ padding:"5px 0", borderBottom:"1px solid #444" }}>
              <div>
                {[1,2,3,4,5].map((star)=>(
                  <span key={star} style={{ color: star <= c.rating ? "#FFD700" : "#ccc" }}>★</span>
                ))}
              </div>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
