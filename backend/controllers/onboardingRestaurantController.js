import Restaurant from '../models/Restaurant.js';
import { StatusCodes } from 'http-status-codes';
import { fetchMenuFromImage } from '../utils/fetchMenuGemini.js';
import { uploadImageToS3 } from '../utils/s3_upload.js';

const convertStringTimeToDateTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return new Date().setUTCHours(hour, minute);
}

export const onboardingRestaurant = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    let restaurant, restaurant_data;
    try {
        restaurant_data = JSON.parse(req.body.data);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return res.status(400).send("Error parsing onboarding JSON Form Data");
    }

    restaurant = new Restaurant({
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

    const uploadedImagePath = await uploadImageToS3(req.file, process.env.S3_BUCKET_NAME);
    if (!uploadedImagePath) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Error uploading image to S3' });
    }
    console.log('uploadedImagePath:', uploadedImagePath);

    const MenuItems = await fetchMenuFromImage(uploadedImagePath, req.file.mimetype);
    if (!MenuItems) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching menu items.' });
    }
    /*
    output format: ```json[
    {
    }]```
    remove first 8 and last 3 characters to get the array of object string
    */
    const MenuItemsJSON = JSON.parse(MenuItems.slice(8, MenuItems.length - 3));
    try {
        restaurant.restaurant_menu = MenuItemsJSON;
        console.log('Restaurant:', restaurant);
    }
    catch (error) {
        console.error('Error parsing menu items:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error parsing menu items' });
    }

    // Save the restaurant to the database
    try {
        const savedRestaurant = await restaurant.save();
        return res.status(200).json(savedRestaurant);
    } catch (error) {
        console.error('Error saving restaurant:', error);
        return res.status(500).json({ message: 'Error saving restaurant to the database' , error});
     
    }
    
}; 

