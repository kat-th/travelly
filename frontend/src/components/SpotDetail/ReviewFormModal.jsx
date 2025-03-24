import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './reviewModal.css';

const ReviewFormModal = ({ spotId, onClose }) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            review,
            stars,
        };

        const createReview = await dispatch(createReviewThunk(spotId, newReview));
        setIsLoaded(!isLoaded);
        // console.log(createReview);
        onClose();
    };

    const resetForm = () => {
        setReview('');
        setStars(0);
        setErrors([]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>How was your stay?</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={review}
                        placeholder="Leave your review here..."
                        onChange={e => setReview(e.target.value)}
                        rows={10}
                    />
                    <div className="stars-input">
                        {[1, 2, 3, 4, 5].map(star => {
                            const isFilled = star <= (hoveredStar || stars);
                            return (
                                <span
                                    key={star}
                                    onClick={() => setStars(star)}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {isFilled ? (
                                        <FaStar color="gold" size={24} />
                                    ) : (
                                        <FaRegStar color="lightgray" size={24} />
                                    )}
                                </span>
                            );
                        })}
                        <span className="stars-label">Stars</span>
                    </div>
                    <button
                        type="submit"
                        disabled={review.length < 10 || stars === 0}
                        className="submit-button"
                    >
                        Submit Your Review
                    </button>
                </form>
                <button
                    className="close-button"
                    onClick={() => {
                        resetForm();
                        onClose();
                    }}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ReviewFormModal;
