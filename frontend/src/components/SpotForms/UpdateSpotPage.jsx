import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpotDetail, updateSpot } from '../../store/spots';

const UpdateSpotPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const spot = useSelector(state => state.spots.spotDetail);

    const previewImageObj = spot.SpotImages?.find(img => img.preview === true);
    const previewImageUrl = previewImageObj ? previewImageObj.url : '';
    // const otherImages = spot.SpotImages?.filter(img => img.preview !== true).map(img => img.url);

    const [country, setCountry] = useState(spot?.country || '');
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [lat, setLat] = useState(spot?.lat || '');
    const [lng, setLng] = useState(spot?.lng || '');
    const [name, setName] = useState(spot?.name || '');
    const [description, setDescription] = useState(spot?.description || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [previewImage, setPreviewImage] = useState(previewImageUrl || '');
    // const [imageUrls, setImageUrls] = useState(otherImages || ['', '']);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getSpot = async () => {
            dispatch(getSpotDetail(spotId));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getSpot();
        }
    }, [isLoaded, dispatch, spotId]);

    useEffect(() => {
        if (spot) {
            setCountry(spot.country);
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setLat(spot.lat);
            setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
            setPreviewImage(previewImageUrl);
            // setImageUrls(spot.imageUrls);
        }
    }, [spot, previewImageUrl]);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        const validationErrors = {};
        if (!country) validationErrors.country = 'Country is required';
        if (!address) validationErrors.address = 'Address is required';
        if (!city) validationErrors.city = 'City is required';
        if (!state) validationErrors.state = 'State is required';
        if (!name) validationErrors.name = 'Spot name is required';
        if (description.length < 30)
            validationErrors.description = 'Description needs 30 or more characters';
        if (!price) validationErrors.price = 'Price per night is required';
        if (!previewImage) validationErrors.previewImage = 'Preview image URL is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
        };

        // console.log(updatedSpot, 'THIS IS THE DATA TO BE DISPATCHED');

        const update = await dispatch(updateSpot(spotId, updatedSpot));

        // console.log(update, 'THIS IS UPDATED DATA');

        if (update) {
            navigate(`/spots/${spotId}`);
        } else {
            setErrors({ submit: 'Failed to update spot. Please try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-spot-form">
            <h1>Update your Spot</h1>

            <section className="location-section">
                <h2>Where's your place located?</h2>
                <p>Guest will only get your exact address once they booked a reservation</p>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                    {errors.country && <p>{errors.country}</p>}
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                    {errors.address && <p>{errors.address}</p>}
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                    />
                    {errors.city && <p>{errors.city}</p>}
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="STATE"
                    />
                    {errors.state && <p>{errors.state}</p>}
                </label>
                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        placeholder="Latitude"
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        placeholder="Longitude"
                    />
                </label>
            </section>

            <section className="description-section">
                <h3>Describe your place to guests</h3>
                <p>
                    Mention the best features of your space, any special amenities like fast wifi or
                    parking, and what you love about the neighborhood
                </p>
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Please write at least 30 characters"
                />
                {errors.description && <p>{errors.description}</p>}
            </section>

            <section className="title-section">
                <h3>Create a title for your spot</h3>
                <p>
                    Catch guest attention with a spot title that highlight what makes your place
                    special
                </p>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name of your spot"
                />
                {errors.name && <p>{errors.name}</p>}
            </section>

            <section className="price-section">
                <h3>Set a base price for your spot</h3>
                <p>
                    Competitive pricing can help your listing stand out and rank higher in search
                    results
                </p>
                ${' '}
                <input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Price per night (USD)"
                />
                {errors.price && <p>{errors.price}</p>}
            </section>

            <section className="iamge-section">
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <input
                    type="text"
                    value={previewImageUrl}
                    onChange={e => setPreviewImage(e.target.value)}
                    placeholder="Preview Image URL"
                />
                {errors.previewImageUrl && <p>{errors.previewImageUrl}</p>}
                {/* {imageUrls.map((imageUrl, index) => (
                    <input
                        key={index}
                        type="text"
                        value={imageUrl}
                        onChange={e => {
                            const newImageUrls = [...imageUrls];
                            newImageUrls[index] = e.target.value;
                            setImageUrls(newImageUrls);
                        }}
                        placeholder="Image URL"
                    />
                ))} */}
            </section>
            <button type="submit" className="create-spot-button">
                Update Spot
            </button>
        </form>
    );
};

export default UpdateSpotPage;
