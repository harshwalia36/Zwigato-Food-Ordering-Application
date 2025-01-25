import Restaurant from '../models/Restaurant.js';

export default class RestaurantRepository {

    constructor(restaurant) {
        this.restaurant = restaurant
    }

    async createRestaurant(data) {
        try {
            const restaurant = new Restaurant(data);
            await restaurant.save();
            return restaurant;
        } catch (error) {
            throw new Error('Error creating restaurant: ' + error.message);
        }
    }

    async getRestaurantById(id) {
        try {
            const restaurant = await Restaurant.findById(id);
            if (!restaurant) {
                throw new Error('Restaurant not found');
            }
            return restaurant;
        } catch (error) {
            throw new Error('Error fetching restaurant: ' + error.message);
        }
    }

    async getAllRestaurants() {
        try {
            const restaurants = await Restaurant.find();
            return restaurants;
        } catch (error) {
            throw new Error('Error fetching restaurants: ' + error.message);
        }
    }

    async updateRestaurant(id, data) {
        try {
            const restaurant = await Restaurant.findByIdAndUpdate(id, data, { new: true });
            if (!restaurant) {
                throw new Error('Restaurant not found');
            }
            return restaurant;
        } catch (error) {
            throw new Error('Error updating restaurant: ' + error.message);
        }
    }

    async deleteRestaurant(id) {
        try {
            const restaurant = await Restaurant.findByIdAndDelete(id);
            if (!restaurant) {
                throw new Error('Restaurant not found');
            }
            return restaurant;
        } catch (error) {
            throw new Error('Error deleting restaurant: ' + error.message);
        }
    }
}