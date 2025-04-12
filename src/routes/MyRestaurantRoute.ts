import { handleValidationErrors } from './../middleware/validation';
import  express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

//const MyRestaurantController from "../controllers/MyUserController.ts";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

router.post(
  "/",
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  MyRestaurantController.createMyRestaurant
);

 export default router;