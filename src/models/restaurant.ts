import mongoose from "mongoose";
const menuItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
})
const restaurantSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    restaurantName: {type: String, require: true},
    city: {type: String, require: true},
    country: {type: String, require: true},
    deliveryPrice: {type: Number, require: true},
    estimateDeliveryTime: {type: Number, require: true},
    cuisines: [{type: String, require: true}],
    menuItems: [menuItemSchema],
    imageUrl: {type: String, required: true},
    lastUpdated: {type: Date, required: true}

});

const Restaurant = mongoose.model("Restaurant",restaurantSchema);
export default Restaurant;