import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './spots.css';

const SpotReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const spotReviews = useSelector(state => state.spots.allReviews);
    console.log(spotReviews, 'THIS IS THE SPOT REVIEW');

    useEffect(() => {
        const getReviews = async () => {
            dispatch(getSpotReviews());
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getReviews();
        }
    }, [dispatch, allSpots, isLoaded]);

    return <h1>This is review section</h1>;
};

export default SpotReviews;
