import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import { onboardingRestaurant } from '../controllers/onboardingRestaurantController.js';
import { getSingleRestaurantInfo, getAllRestaurantsInfo } from '../controllers/restaurantInfoController.js';
const upload = multer({ storage: memoryStorage() }); // Specify the upload directory


const router = Router();

router.get('/', getAllRestaurantsInfo);

router.get('/{restaurantId}', getSingleRestaurantInfo);

router.post('/partner-with-us/new/onboarding', upload.single('image'), onboardingRestaurant);


export default router;