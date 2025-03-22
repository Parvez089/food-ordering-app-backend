import  express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
//const MyRestaurantController from "../controllers/MyUserController.ts";
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
})

router.post("/", upload.single("imageFile"),
 MyRestaurantController.createMyRestaurant)

 export default router;