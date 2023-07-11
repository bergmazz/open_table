import React, { useState, useEffect } from "react";
import { useModal } from '../../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addReviews } from "../../../store/review";
import { getRestaurants } from "../../../store/restaurant";
import './newReview.css';

export default function CreateReviewModal({restaurant}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    const { restaurantId } = useParams();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [reviewImage, setReviewImage] = useState('');
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

        if (comment.length < 10) valErrors.push("Review must be more than 10 characters");
        if (rating < 1) valErrors.push("Rating must be 1-5 stars");

        setErrors(valErrors);
    }, [comment, rating]);

    const reset = () => {
        setRating(1);
        setComment('');
        setReviewImage('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length > 0) {
          return;
        }
          const newReview = {
            comment,
            rating,
            reviewImage

          }
          await dispatch(addReviews(restaurant?.id, newReview))
          closeModal();
    }


    return (
      <div className="createReview">
        <form onSubmit={handleSubmit} className='createReviewForm'>
          <h1 className="enterReview">How was your visit?</h1>
          <ul className="errors-list">
            {hasSubmitted && errors.map((error, idx) => (
              <li key={`error${idx}`} className='errors'>{error}</li>
            ))}
          </ul>
          <textarea
            className="review-textarea"
            placeholder="Leave your review here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="rating-container">
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
                    <i className={index <= (hover || rating) ? 'fa-solid star-review' : 'fa-regular star-review'}></i>
                  </button>
              );
            })}
          <p className="stars-text"><b>Rating</b></p>
          </div>
          <div className="reviewImage">
            <input
              type="text"
              placeholder="Image URL"
              value={reviewImage}
              onChange={(e) => setReviewImage(e.target.value)}
            />
          </div>
          <button
            className={emptyField ? 'submit-review-button-disabled' : 'submit-review-button'}
            disabled={!comment || !rating}
            type='submit'>Submit Your Review</button>
      </form>
  </div>
);

    
};

