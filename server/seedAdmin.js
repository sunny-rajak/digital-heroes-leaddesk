import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
  await connectDB();
  try {
    await Admin.deleteMany(); // Clear existing admins
    const admin = new Admin({
      username: "admin",
      password: "password123", // This will be automatically hashed
    });
    await admin.save();
    console.log("Admin user seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
