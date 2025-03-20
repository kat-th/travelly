import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './spots.css';

const ManageSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [spots, setSpots] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getSpots = async () => {
            dispatch(getAllSpots());
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getSpots();
        }
    }, [dispatch, isLoaded]);

    //Get the current user Id
    const loggedInUser = useSelector(state => state.session.user.id);
    const allSpots = useSelector(state => state.spots.allSpots);

    if (!loggedInUser) {
        return <p>Please log in to see your spots</p>;
    }

    const userSpots = Object.values(allSpots).filter(spot => spot.ownerId === loggedInUser);

    const goToSpotDetail = (e, spot) => {
        e.preventDefault();
        navigate(`/spots/${spot.id}`);
    };

    const goToUpdateForm = (e, spot) => {
        e.preventDefault();
        navigate(`/spots/${spot.id}/edit`);
    };

    return (
        <div>
            {userSpots.length === 0 ? (
                <p>No spots available</p>
            ) : (
                <div className="spots-container">
                    {userSpots.map((spot, index) => (
                        <div
                            key={index}
                            className="property-container"
                            // onClick={e => goToSpotDetail(e, spot)}
                            title={spot.name}
                        >
                            <div className="image-container">
                                {spot.previewImage ? (
                                    <>
                                        <img
                                            src={spot.previewImage}
                                            alt={spot.name}
                                            className="property-img"
                                        />
                                        <div className="tooltip">{spot.name}</div>
                                    </>
                                ) : (
                                    <div>
                                        <span>No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="property-details">
                                <div className="property-top-row">
                                    <span className="city-state">
                                        {spot.city}, {spot.state}
                                    </span>
                                    <span className="star-rating">
                                        {spot.avgRating
                                            ? parseFloat(spot.avgRating).toFixed(1)
                                            : 'New'}{' '}
                                        <FaStar />
                                    </span>
                                </div>
                                <p className="price">
                                    <strong>${spot.price}</strong> <span>night</span>
                                </p>
                            </div>
                            <div className="buttons">
                                <button
                                    className="update-button"
                                    onClick={e => goToUpdateForm(e, spot)}
                                >
                                    Update
                                </button>
                                <button className="delete-button">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageSpot;
