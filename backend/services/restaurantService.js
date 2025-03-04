import restaurantRepository from '../repo/restaurantRepository.js';
import Restaurant from '../models/Restaurant.js';
import { StatusCodes } from 'http-status-codes';
import { fetchMenuFromImage } from '../utils/fetchMenuGemini.js';
import { uploadImageToS3 } from '../utils/s3_upload.js';
import RestaurantRepository from '../repo/restaurantRepository.js';

const convertStringTimeToDateTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return new Date().setUTCHours(hour, minute);
}
export const onboardingRestaurantService = async (restaurant_data, images) => {
    let restaurant = new Restaurant({
        name: restaurant_data.name,
        email: restaurant_data.email,
        phoneNumber: restaurant_data.phoneNumber,
        address: {
            street: restaurant_data.address.street,
            city: restaurant_data.address.city,
            state: restaurant_data.address.state,
            zip: restaurant_data.address.zip,
            location: {
                coordinates: [
                    restaurant_data.address.location.coordinates[0],
                    restaurant_data.address.location.coordinates[1]
                ]
            }
        },
        overview: {
            restaurant_type: restaurant_data.overview.restaurant_type,
            approx_cost_2_person: restaurant_data.overview.approx_cost_2_person,
        },
        restaurant_delivery_time: {
            open: convertStringTimeToDateTime(restaurant_data.restaurant_delivery_time.open),
            close: convertStringTimeToDateTime(restaurant_data.restaurant_delivery_time.close),
            open_days: restaurant_data.restaurant_delivery_time.open_days,
        },
        restaurant_profile_img: restaurant_data.restaurant_profile_img,
        gallery: {
            photos: restaurant_data.gallery_photos
        }
    });

    let mergerdMenuItemsJSON = [];
    // Iterate over the images  and upload them to S3
    for (const image of images) {
        let uploadedImagePath;
        try {
            uploadedImagePath = await uploadImageToS3(image, process.env.S3_BUCKET_NAME);
        } catch (error) {
            console.error('Error uploading image to S3:', error);
            throw new Error('Error uploading image to S3', error);
        }

        const MenuItems = await fetchMenuFromImage(uploadedImagePath, image.mimetype);
        if (!MenuItems) {
            throw new Error('Error fetching menu items');
        }
        /*
        output format: ```json[{...}]```
        remove first 8 and last 3 characters to get the array of object string
        */
        const MenuItemsJSON = JSON.parse(MenuItems.slice(8, MenuItems.length - 3));
        mergerdMenuItemsJSON = [...mergerdMenuItemsJSON, ...MenuItemsJSON];
    }

    try {
        restaurant.restaurant_menu = mergerdMenuItemsJSON;
    }
    catch (error) {
        console.error('Error parsing menu items:', error);
        throw new Error('Error parsing menu items', error);
    }

    // Save the restaurant to the database
    try {
        const existingRestaurant = await RestaurantRepository.getRestaurantByNameAndPhoneNumber(restaurant.name, restaurant.phoneNumber);

        if (existingRestaurant) {
            return { success: false, message: 'Restaurant already exists' }; // Return a structured response
        }

        const savedRestaurant = await restaurant.save();
        return { success: true, restaurant: savedRestaurant }; // Return success and saved restaurant

    } catch (error) {
        console.error('Error saving restaurant:', error);
        return { success: false, message: 'Error saving restaurant', error: error.message }; // Include error message
    }
};

export const getSingleRestaurantInfoService = async (id) => {
    const restaurant = await restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
        throw new Error('Restaurant not found with id: ' + id);
    }
    return restaurant;
};

export const getAllRestaurantsInfoService = async () => {
    const restaurants = await restaurantRepository.getAllRestaurants();
    if (!restaurants) {
        console.log('No restaurants found');
    }
    return restaurants;
};
