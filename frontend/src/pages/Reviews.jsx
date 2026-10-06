import { useEffect, useState } from "react";
import { getAllReviews } from "../services/reviewService";
import "./Reviews.css";
import { useSelector } from "react-redux";
import {
  
  deleteReview
} from "../services/reviewService";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data.reviews);
      } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
  try {
    await deleteReview(reviewId);

    setReviews((prev) =>
      prev.filter((review) => review._id !== reviewId)
    );

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Die Bewertung konnte nicht gelöscht werden."
    );
  }
};


  return (
    <section className="reviews-page">
      <div className="reviews-page-header">
        <p className="section-label">KUNDENSTIMMEN</p>

        <h1>
          Alle <span>Bewertungen</span>
        </h1>

        <p>
          Lesen Sie die Erfahrungen unserer Kundinnen und Kunden.
        </p>
      </div>

      <div className="reviews-page-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review._id}>

            <h4 className="review-user">
              {review.user?.name || "Kundin"}
            </h4>

            <p className="review-service">
              {review.service?.title || "Allgemeine Bewertung"}
            </p>

            <p className="review-comment">
              „{review.comment}“
            </p>

            <div className="review-stars">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            {user &&
                (
                    user._id === review.user?._id ||
                    user.id === review.user?._id ||
                    user.role === "admin"
                ) && (
                    <button
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(review._id)}
                    >
                    Löschen
                    </button>
                )}

          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;