import { onboardingRestaurantService, getSingleRestaurantInfoService, getAllRestaurantsInfoService } from '../services/restaurantService.js';
import { StatusCodes } from 'http-status-codes';

export const onboardingRestaurant = async (req, res) => {
    if (!req.files) {
        return res.status(400).send('No file uploaded.');
    }

    let restaurant_data;
    try {
        restaurant_data = JSON.parse(req.body.data);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return res.status(400).send("Error parsing onboarding JSON Form Data");
    }

    const onboardedRestaurant = await onboardingRestaurantService(restaurant_data, req.files);
    return res.status(200).json(onboardedRestaurant);
};

export const getSingleRestaurantInfo = async (req, res) => {
    const { id } = req.params;
    const restaurant = await getSingleRestaurantInfoService(id);
    return res.status(StatusCodes.OK).json({ restaurant });
};

export const getAllRestaurantsInfo = async (req, res) => {
    const restaurants = await getAllRestaurantsInfoService();
    return res.status(StatusCodes.OK).json({ restaurants });
};

