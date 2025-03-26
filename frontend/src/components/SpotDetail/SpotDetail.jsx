import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetail } from '../../store/spots';
import { deleteReviewThunk, getSpotReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import ReviewFormModal from './ReviewFormModal';
import './SpotDetail.css';
import { DeleteReviewModal } from './DeleteReviewModal';

const SpotDetail = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    // get data from the state
    const { spotId } = useParams();
    const isLoggedIn = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotDetail);
    const spotReviews = useSelector(state => state.reviews.allReviews);

    const loggedInUserId = isLoggedIn?.id;
    const isOwner = loggedInUserId === spot.Owner?.id;
    const hasUserReviewed = spotReviews.some(review => review.userId === loggedInUserId);
    const showReviewButton = isLoggedIn && !isOwner && !hasUserReviewed;

    const sortedReviews = [...spotReviews].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    const noReivews = sortedReviews.length === 0;
    const reviewRatingCalc = reviews => {
        if (reviews.length === 0) return 0;
        const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
        return (totalStars / reviews.length).toFixed(1);
    };
    const reviewCount = spotReviews.length;
    const averageRating = reviewRatingCalc(spotReviews);

    const formatDate = timestamp => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    const handleDeleteClick = reviewId => {
        setShowDeleteModal(true);
        setReviewToDelete(reviewId);
    };

    const handleConfirmDelete = async () => {
        // console.log(reviewToDelete, 'Confirming delete review for ID:');
        await dispatch(deleteReviewThunk(reviewToDelete));
        setShowDeleteModal(false);
        setReviewToDelete(null);
        setIsLoaded(!isLoaded);
    };

    useEffect(() => {
        const getSpot = async () => {
            // console.log(isLoaded, 'THIS IS ISLOADED FOR GET SPOTS');
            dispatch(getSpotDetail(spotId));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getSpot();
        }
    }, [dispatch, spotId, isLoaded]);

    useEffect(() => {
        const getReview = async () => {
            // console.log(isLoaded, 'THIS IS ISLOADED FOR GET REVIEWS');
            dispatch(getSpotReviews(spotId));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getReview();
        }
    }, [dispatch, spotReviews, isLoaded, spotId]);

    if (!spot) {
        return <div>No Spot Found</div>;
    }

    const previewImage = spot.SpotImages?.find(img => img.preview === true);
    const otherImages = spot.SpotImages?.filter(img => img.preview !== true);

    // console.log(spot.Owner.firstName, 'THIS IS THE SPOT OWNER');

    return (
        <div className="spot-container">
            <h2>{spot.name}</h2>
            <div className="spot-images">
                {previewImage ? (
                    <div className="image-grid">
                        <img src={previewImage.url} alt="Main picture" className="preview-image" />
                        <div className="other-images">
                            {otherImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.url}
                                    alt={`Spot image ${index + 1}`}
                                    className="other-image"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No Images Available</p>
                )}
            </div>
            <div className="spot-info-container">
                <div className="spot-info-left">
                    <div className="location-info">
                        <img src="/location.png" className="location-logo" />
                        <span>
                            {spot.city}, {spot.state}
                        </span>
                    </div>
                    <div className="owner-info">
                        <p>Hosted by {spot.Owner?.firstName}</p>
                    </div>
                    <div className="spot-description">
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className="callout-box-right">
                    <div className="callout-info">
                        <span className="callout-info-left">${spot.price} night</span>
                        <span className="callout-info-right">
                            <FaStar />
                            {spot.avgStarRating} ‧ {spot.numReviews} reviews
                        </span>
                    </div>
                    <button className="reserve-button" onClick={() => alert('Feature coming soon')}>
                        Reserve
                    </button>
                </div>
            </div>

            <div className="review-container">
                <h3 className="review-container-header">
                    <FaStar /> {reviewCount ? Number(averageRating).toFixed(1) : 'New'} ‧{' '}
                    {console.log(typeof averageRating, averageRating, 'AVERAGE RATING TYPEOF')}
                    {reviewCount} reviews
                </h3>
                <div>
                    {showReviewButton && (
                        <button onClick={() => setShowModal(true)}>Post Your Review</button>
                    )}

                    {showModal && (
                        <ReviewFormModal spotId={spotId} onClose={() => setShowModal(false)} />
                    )}
                </div>
                {noReivews ? (
                    isLoggedIn && !isOwner && <p>Be the first to post a review</p>
                ) : (
                    <div className="review-card">
                        {sortedReviews.map((review, index) => (
                            <div key={`${index}-${review.id}`} className="review-content">
                                <div className="review-header">
                                    <div className="review-user">{review.User.firstName}</div>
                                    <div className="review-date">
                                        {formatDate(review.createdAt)}
                                    </div>
                                </div>
                                <div className="review-text">{review.review}</div>
                                {isLoggedIn && loggedInUserId === review.User.id && (
                                    <button
                                        onClick={() => handleDeleteClick(review.id)}
                                        className="delete-review-button"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                        {showDeleteModal && (
                            <DeleteReviewModal
                                onCancel={() => setShowDeleteModal(false)}
                                onConfirm={handleConfirmDelete}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpotDetail;
