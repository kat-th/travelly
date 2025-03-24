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
    const [imageUrls, setImageUrls] = useState(['', '']);
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     return () => {
    //         // Reset all state variables to empty strings
    //         setCountry('');
    //         setAddress('');
    //         setCity('');
    //         setState('');
    //         setDescription('');
    //         setLat('');
    //         setLng('');
    //         setName('');
    //         setPrice('');
    //         setPreviewImage('');
    //         setImageUrls(['', '', '', '', '']);
    //         setErrors({});
    //     };
    // }, []);

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
                    <h3>Where's your place located?</h3>
                    <p>Guest will only get your exact address once they booked a reservation</p>
                    <label>
                        Country {''}
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                        {errors.country && <p>{errors.country}</p>}
                    </label>
                    <label>
                        Street Address {''}
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        {errors.address && <p>{errors.address}</p>}
                    </label>
                    <label>
                        City {''}
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="City"
                        />
                        {errors.city && <p>{errors.city}</p>}
                    </label>
                    <label>
                        State {''}
                        <input
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder="STATE"
                        />
                        {errors.state && <p>{errors.state}</p>}
                    </label>
                    <label>
                        Latitude {''}
                        <input
                            type="text"
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            placeholder="Latitude"
                        />
                    </label>
                    <label>
                        Longitude {''}
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
                        Competitive pricing can help your listing stand out and rank higher in
                        search results
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
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL"
                    />
                    {errors.previewImage && <p>{errors.previewImage}</p>}
                    {[1, 2].map(index => (
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
