import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpotPage.css';

const CreateSpotPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrls, setImageUrls] = useState(['', '', '', '']);
    const [errors, setErrors] = useState({});

    const autoFill = () => {
        setName('Serenity Woods');
        setCountry('United States');
        setAddress('New Hartford, Connecticut');
        setState('Connecticut');
        setCity('New Hartford');
        setLat('37.76343');
        setLng('-122.47567');
        setDescription(
            'Stunning, exceptionally private log cabin located in the center of 62 acres of wooded land. The half mile driveway leads to our cabin that is loaded with amenities, and everything we could think of for peace and quiet, laughter, and making memories. The owner stays here regularly and hosts dinners, classes, masterminds, and more.  A new hot tub is being installed in May!',
        );
        setPrice(150);
        setPreviewImage('https://travelly-images.s3.us-east-2.amazonaws.com/spot4-01.png');
        setImageUrls([
            'https://travelly-images.s3.us-east-2.amazonaws.com/spot4-02.png',
            'https://travelly-images.s3.us-east-2.amazonaws.com/spot4-03.png',
            'https://travelly-images.s3.us-east-2.amazonaws.com/spot4-04.png',
            'https://travelly-images.s3.us-east-2.amazonaws.com/spot4-05.png',
        ]);
    };

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

        const spotData = {
            ownerId: sessionUser.id,
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
            imageUrls,
        };

        // console.log(spotData, 'THIS IS THE NEW SPOT DATA');

        const newSpot = await dispatch(createSpot(spotData));

        if (newSpot) {
            navigate(`/spots/${newSpot.id}`);
        } else {
            setErrors({ submit: 'Failed to create spot. Please try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-spot-container">
            <h2>Create a new Spot</h2>
            <div className="spot-form">
                <section className="location-section">
                    <div className="autofill-button" onClick={autoFill}>
                        AutoFill
                    </div>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guest will only get your exact address once they booked a reservation</p>
                    <label>
                        <div className="label-row">
                            <span>Country </span>{' '}
                            {errors.country && (
                                <span className="error-message">{errors.country}</span>
                            )}
                        </div>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                    </label>
                    <label>
                        <div className="label-row">
                            <span>Street Address </span>
                            {errors.address && (
                                <span className="error-message">{errors.address}</span>
                            )}
                        </div>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                    </label>
                    <div className="city-state-label">
                        <label>
                            <div className="label-row">
                                <span>City </span>
                                {errors.city && (
                                    <span className="error-message">{errors.city}</span>
                                )}
                            </div>
                            <input
                                className="input-box-city"
                                type="text"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </label>
                        <label>
                            <div className="label-row">
                                <span>State </span>
                                {errors.state && (
                                    <span className="error-message">{errors.state}</span>
                                )}
                            </div>
                            <input
                                className="input-box-state"
                                type="text"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                placeholder="STATE"
                            />
                        </label>
                    </div>
                    <div className="lat-lng">
                        <label>
                            <span className="label-row">Latitude {''}</span>
                            <input
                                className="input-box-lat"
                                type="text"
                                value={lat}
                                onChange={e => setLat(e.target.value)}
                                placeholder="Latitude"
                            />
                        </label>
                        <label>
                            <span className="label-row">Longitude {''}</span>
                            <input
                                className="input-box-lng"
                                type="text"
                                value={lng}
                                onChange={e => setLng(e.target.value)}
                                placeholder="Longitude"
                            />
                        </label>
                    </div>
                </section>

                <section className="description-section">
                    <h3>Describe your place to guests</h3>
                    <p>
                        Mention the best features of your space, any special amenities like fast
                        wifi or parking, and what you love about the neighborhood
                    </p>
                    <textarea
                        size={10}
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                    />
                    {errors.description && (
                        <span className="error-message">{errors.description}</span>
                    )}
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
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </section>

                <section className="price-section">
                    <h3>Set a base price for your spot</h3>
                    <p>
                        Competitive pricing can help your listing stand out and rank higher in
                        search results
                    </p>
                    <div className="price-input">
                        <span>$ </span>
                        <span>
                            <input
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Price per night (USD)"
                            />
                        </span>
                    </div>
                    {errors.price && <span className="error-message">{errors.price}</span>}
                </section>

                <section className="iamge-section">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    <input
                        type="text"
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL"
                    />
                    {errors.previewImage && (
                        <span className="error-message">{errors.previewImage}</span>
                    )}
                    {[0, 1, 2, 3].map(index => (
                        <input
                            key={index}
                            type="text"
                            value={imageUrls[index]}
                            onChange={e => {
                                const newImageUrls = [...imageUrls];
                                newImageUrls[index] = e.target.value;
                                setImageUrls(newImageUrls);
                            }}
                            placeholder="Image URL"
                        />
                    ))}
                </section>
                <button type="submit" className="create-spot-button">
                    Create Spot
                </button>
            </div>
        </form>
    );
};

export default CreateSpotPage;
