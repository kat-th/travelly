import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './spots.css';

const AllSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const allSpots = useSelector(state => state.spots.allSpots);
    // const spotsList =
    //     useSelector(state => state.spots.allSpots.map(id => state.spots.byId[id])) || [];
    // console.log(allSpots, 'THIS IS THE SPOT LIST');
    // const spotsState = useSelector(state => state.spots);
    // console.log('Redux spots state:', spotsState);

    useEffect(() => {
        const getSpots = async () => {
            dispatch(getAllSpots());
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getSpots();
        }
    }, [dispatch, allSpots, isLoaded]);

    const goToSpotDetail = (e, spot) => {
        e.preventDefault();
        navigate(`/spots/${spot.id}`);
    };

    return (
        <div className="spots-list p-6 font-sans">
            {allSpots.length === 0 ? (
                <p>No spots available</p>
            ) : (
                <div className="spots-container">
                    {allSpots.map((spot, index) => (
                        <div
                            key={index}
                            className="property-container"
                            onClick={e => goToSpotDetail(e, spot)}
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
                                    <div className="city-state">
                                        {spot.city}, {spot.state}
                                    </div>
                                    <div className="star-rating">
                                        <span>
                                            <FaStar />
                                        </span>
                                        <span>
                                            {spot.avgRating
                                                ? parseFloat(spot.avgRating).toFixed(1)
                                                : 'New'}{' '}
                                        </span>
                                    </div>
                                </div>
                                <p className="price">
                                    <strong>${spot.price}</strong> <span>night</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllSpots;
