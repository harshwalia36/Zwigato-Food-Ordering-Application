import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import { onboardingRestaurant } from '../controllers/restaurantController.js';
import { getSingleRestaurantInfo, getAllRestaurantsInfo } from '../controllers/restaurantController.js';
const upload = multer({ storage: memoryStorage() }); // Specify the upload directory


const router = Router();

router.get('/', getAllRestaurantsInfo);

router.get('/{restaurantId}', getSingleRestaurantInfo);

router.post('/partner-with-us/new/onboarding', upload.array('images'), onboardingRestaurant);


export default router;