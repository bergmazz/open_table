// import React, { useState, useEffect } from "react";
// import { useModal } from '../../../context/Modal';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router';
// import { addReviews } from "../../../store/review";
// import { getRestaurants } from "../../../store/restaurant";
// import './newReview.css';

// export default function CreateReviewModal() {
//     const dispatch = useDispatch();
//     const currentUser = useSelector((state) => state.session.user);
//     const restaurant = useSelector((state) => state.restaurantDetails);
//     const { closeModal } = useModal();
//     const { restaurant_id } = useParams();
//     const [rating, setRating] = useState('');
//     const [comment, setComment] = useState('');
//     const [reviewImage, setReviewImage] = useState('');
//     const [errors, setErrors] = useState([]);
//     const [emptyField, setEmptyField] = useState(true);
//     const [hasSubmitted, setHasSubmitted] = useState(false);
//     const [hover, setHover] = useState(0);
//     const starArr = ["", "", "", "", ""];

//     useEffect(() => {
//         const valErrors = [];

//         if (comment.length < 10 || rating < 1) {
//             setEmptyField(true);
//         } else setEmptyField(false)

//         if (comment.length < 10) valErrors.push("Review must be more than 10 characters");
//         if (rating < 1) valErrors.push("Rating must be 1-5 stars");

//         setErrors(valErrors);
//     }, [comment, rating]);

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       if (currentUser) {
//         const data = await dispatch(addReviews(
//           restaurant.restaurant_id, rating, comment, reviewImage
//         ));
//         if (data.errors) {
//           setErrors(data)
//         }
//       }
//     }



//     return (
//       <div className="createReview">
//         <form onSubmit={handleSubmit} className='createReviewForm'>
//           <h1 className="enterReview">How was your visit?</h1>
//           <ul className="errors-list">
//             {hasSubmitted && errors.map((error, idx) => (
//               <li key={`error${idx}`} className='errors'>{error}</li>
//             ))}
//           </ul>
//           <textarea
//             className="review-textarea"
//             placeholder="Leave your review here"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <div className="rating-container">
//             {starArr.map((starEl, index) => {
//               index++;
//               return (
//                 <button
//                   className="star-button"
//                   key={`index${index}`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setRating(index)
//                   }}
//                   onMouseEnter={() => setHover(index)}
//                   onMouseLeave={() => setHover(rating)}
//                   >
//                     <i className={index <= (hover || rating) ? 'fa-solid star-review' : 'fa-regular star-review'}></i>
//                   </button>
//               );
//             })}
//           <p className="stars-text"><b>Rating</b></p>
//           </div>
//           <div className="reviewImage">
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={reviewImage}
//               onChange={(e) => setReviewImage(e.target.value)}
//             />
//           </div>
//           <button
//             className={emptyField ? 'submit-review-button-disabled' : 'submit-review-button'}
//             disabled={!comment || !rating}
//             type='submit'>Submit Your Review</button>
//       </form>
//   </div>
// );

    
// };

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReviews } from "../../../store/review";
import { getRestaurants } from "../../../store/restaurant";
import { useParams } from "react-router-dom";

const CreateReview = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      rating,
      comment,
      review_image: reviewImage,
    };

    const data = await dispatch(
      addReviews(restaurantId, newReview.rating, newReview.comment, newReview.review_image)
    );

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setRating(1);
      setComment("");
      setReviewImage("");
      setErrors([]);
      dispatch(getRestaurants());
    }
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1 star</option>
            <option value={2}>2 stars</option>
            <option value={3}>3 stars</option>
            <option value={4}>4 stars</option>
            <option value={5}>5 stars</option>
          </select>
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <label>Review Image:</label>
          <input
            type="text"
            value={reviewImage}
            onChange={(e) => setReviewImage(e.target.value)}
          />
        </div>
        <button type="submit">Submit Review</button>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default CreateReview;
