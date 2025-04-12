import { Request,Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary"
import mongoose from "mongoose";
import { log } from "console";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      res.status(404).json({ message: "restaurant not found" });
      return;
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // Check if user already has a restaurant
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res.status(409).json({ message: "User restaurant already exists" });
      return;
    }

    // Ensure file exists
    if (!req.file) {
      res.status(400).json({ message: "No image file provided" });
      return;
    }

    // Convert file buffer to Base64
    const base64Image = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    // Create new restaurant
    const restaurant = new Restaurant({
      ...req.body,
      imageUrl: uploadResponse.url,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getMyRestaurant,
  createMyRestaurant,
};