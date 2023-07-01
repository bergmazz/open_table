import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addReviews } from "../../../store/review";
import { getRestaurants } from "../../../store/restaurant";
import './newReview.css';

const CreateReview = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const { restaurantId } = useParams();
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [reviewImage, setReviewImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [emptyField, setEmptyField] = useState('true');

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
        setErrors([]);
        const data = await dispatch(
            addReviews(currentUser.id, restaurantId, rating, comment, reviewImage)
        );
        if (data) {
            setErrors([]);
        }
        dispatch(getRestaurants());
        reset();
    };

    return (
        <div className="createReview">
            <form onSubmit={handleSubmit} className='createReviewForm'>
                <p className="enterReview">How was your visit?</p>
                <div className="errors">
                    {errors &&
                      errors.map((error, i) => {
                        return <p key={i}>{error}</p>
                      })}
                </div>
                <div className="rating">
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value={5}
                      onClick={(e) => setRating(Number(e.target.value))}
                    />
                    <label htmlFor="star5" title="text">
                        5 stars
                    </label>
                    <input
                      type="radio"
                      id="star4"
                      name="rating"
                      value={4}
                      onClick={(e) => setRating(Number(e.target.value))}
                    />
                    <label htmlFor="star4" title="text">
                        4 stars
                    </label>
                    <input
                      type="radio"
                      id="star3"
                      name="rating"
                      value={3}
                      onClick={(e) => setRating(Number(e.target.value))}
                    />
                    <label htmlFor="star3" title="text">
                        3 stars
                    </label>
                    <input
                      type="radio"
                      id="star2"
                      name="rating"
                      value={2}
                      onClick={(e) => setRating(Number(e.target.value))}
                    />
                    <label htmlFor="star2" title="text">
                        2 stars
                    </label>
                    <input
                      type="radio"
                      id="star1"
                      name="rating"
                      value={1}
                      onClick={(e) => setRating(Number(e.target.value))}
                    />
                    <label htmlFor="star1" title="text">
                        1 star
                    </label>
                </div>
                <div className="comment">
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      placeholder='Describe your dining experience...'
                      name="comment"
                      className="commentInput"
                    />
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
                  disabled={Boolean(emptyField)}
                  type='submit'>Submit Your Review</button>
            </form>
        </div>
    );
};

export default CreateReview;