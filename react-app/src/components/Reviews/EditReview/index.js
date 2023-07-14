import { func } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory} from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editReviews } from "../../../store/review";

export default function EditReviewForm({ review }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    const [rating, setRating] = useState(review?.rating);
    const [comment, setComment] = useState(review?.comment);
    const [review_image, setReviewImage] = useState(review?.reviewImage);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

    const newReview = {
        rating,
        comment,
        review_image
    };

    if (currentUser) {
        const data = await dispatch(editReviews(
            review.restaurantId, review.id, newReview
        ));
        if ( data && data.error) {
            setErrors(data.error)
        } 
    } else {
        return <Redirect to='/signup' />;
    }

    closeModal();
    history.go(0);
    
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
            <i className={index <= (hover || rating) ? 'fa-solid' : 'fa-regular'}></i>
            </button>
          );
        })}
        <p className="rating-text"><b>Rating</b></p>
      </div>
      <div className="review-image">
        <input
          type="text"
          placeholder="Image URL"
          value={review_image}
          onChange={(e) => setReviewImage(e.target.value)}
        />
      </div>
      <button
      className={emptyField ? 'submit-review-button-disabled' : 'submit-review-button'}
      disabled={emptyField}
      type='submit'>Update Review</button>
      </form>
    </div>
   );

}

