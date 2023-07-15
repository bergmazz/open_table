
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReviews } from "../../../store/review";
import { getRestaurants } from "../../../store/restaurant";
import { useParams, Redirect, useHistory} from "react-router-dom";
import { useModal } from "../../../context/Modal";
import './newReview.css';

export default function CreateReviewModal({ reservation }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const history = useHistory();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [review_image, setReviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hover, setHover] = useState(0);
  const starArr = ["", "", "", "", ""];
  

  useEffect(() => {
    const valErrors = [];

    if (comment.length < 10 || rating < 1) {
      setEmptyField(true);
    } else setEmptyField(false)

    if (comment.length < 10) {
      valErrors.comment = 'Review must be more than 10 characters.';
    }
    if (rating < 1) {
      valErrors.rating = "Rating must be between 1-5 stars.";
    }
    if (review_image) {
      if (!(review_image.endsWith(".png") || review_image.endsWith(".jpg") || review_image.endsWith(".jpeg"))) {
        valErrors.review_image = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }
    setErrors(valErrors);
  }, [comment, rating, review_image]);


  if (!currentUser) return <Redirect to='/login' />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (currentUser) {
      const data =  await dispatch(addReviews(
        reservation.restaurantId, rating, comment, review_image
      ));
    } else {
        return <Redirect to='/signup' />; 
    }

    closeModal();
    history.push(`/restaurants/${reservation.restaurantId}/`)

    
  }

  return (
    <div className="add-review">
      <form onSubmit={handleSubmit} className='createReview-form'>
      <h1 className="review-header">How was your visit?</h1>
      <ul className="errors-list">
        {hasSubmitted && errors.map((error, idx) => (
          <l1 key={`error${idx}`} className='errors'>{error}</l1>
        ))}
      </ul>
      <textarea
        className="review-comment"
        placeholder="Leave your review here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <textarea
        className="review-image"
        placeholder="Image URL"
        value={review_image}
        onChange={(e) => setReviewImage(e.target.value)}
      />
      <div className="rating-container">
      <p className="rating-text"><b>Rating</b></p>
        {starArr.map((starEl, index) => {
          index++;
          return (
            <button
            className="star-button"
            key={`index${index}`}
            onClick={(e) => {
              e.preventDefault();
              setRating(index)
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            >
            <i className={index <= (hover || rating) ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
            </button>
          );
        })}
      </div>
      <button
      className={emptyField ? 'submit-review-button-disabled' : 'submit-review-button'}
      disabled={emptyField}
      type='submit'>Submit Your Review</button>
      </form>
    </div>
   );
};


