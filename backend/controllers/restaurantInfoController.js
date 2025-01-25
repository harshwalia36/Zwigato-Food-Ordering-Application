import { StatusCodes } from 'http-status-codes';
import RestaurantRepository from '../repo/restaurantRepository.js';
import Restaurant from '../models/Restaurant.js';

const restaurantRepository = new RestaurantRepository(Restaurant);

export const getSingleRestaurantInfo = async (req, res) => {
    const { id } = req.params;
    const restaurant = await restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Restaurant not found' });
    }
    return res.status(StatusCodes.OK).json({ restaurant });
};

export const getAllRestaurantsInfo = async (req, res) => {
    const restaurants = await restaurantRepository.getAllRestaurants();
    if (!restaurants) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Restaurants not found' });
    }
    return res.status(StatusCodes.OK).json({ restaurants });
};