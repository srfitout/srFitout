import mongoose from "mongoose";
import { getServerConfig } from "./config.server";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const config = getServerConfig();
  console.log("Connecting to MongoDB...");
  return mongoose.connect(config.mongodbUri);
}

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Reuse the model if already compiled (prevents re-definition errors in HMR)
export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
