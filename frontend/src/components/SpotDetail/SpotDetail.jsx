import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetail } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './spot-detail.css';

const SpotDetail = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { spotId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);

    const spot = useSelector(state => state.spots.spotDetail);
    console.log(spot, 'THIS IS THE SPOT');

    // const spot = allSpots.find(spot => `${spot.id}` === spotId);

    useEffect(() => {
        const getSpot = async () => {
            dispatch(getSpotDetail(spotId));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getSpot();
        }
    }, [dispatch, spotId, isLoaded]);

    if (!spot) {
        return <div>No Spot Found</div>;
    }

    const previewImage = spot.SpotImages?.find(img => img.preview === true);
    const otherImages = spot.SpotImages?.filter(img => img.preview !== true);

    // console.log(spot.Owner.firstName, 'THIS IS THE SPOT OWNER');

    return (
        <div className="spot-container">
            <h2>{spot.description}</h2>
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
                        <img src="../public/location.png" className="location-logo" />
                        <span>
                            {spot.city}, {spot.state}
                        </span>
                    </div>
                    <div className="owner-info">
                        <p>Hosted by {spot.Owner?.firstName}</p>
                    </div>
                    <div className="spot-description">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="callout-box-right">
                    <h4>${spot.price} night</h4>
                    <button className="reserve-button" onClick={() => alert('Feature coming soon')}>
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpotDetail;
