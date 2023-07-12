import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviews } from "../../../store/review";
import './deleteReview.css';

export default function DeleteReviewForm(review) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    review = review.review
    
}