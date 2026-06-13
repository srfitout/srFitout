import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB, Contact } from "../db.server";
import { getServerConfig } from "../config.server";

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      phone: z.string().min(1, "Phone is required"),
      email: z.string().email("Invalid email address"),
      type: z.string().optional(),
      message: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    await connectDB();
    const contact = new Contact(data);
    await contact.save();
    return { success: true };
  });

export const verifyAdmin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const config = getServerConfig();
    const isValid =
      data.email === config.adminEmail && data.password === config.adminPassword;
    return { success: isValid };
  });

export const getContactSubmissions = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const config = getServerConfig();
    const isValid =
      data.email === config.adminEmail && data.password === config.adminPassword;

    if (!isValid) {
      throw new Error("Unauthorized access to admin submissions.");
    }

    await connectDB();
    const rawSubmissions = await Contact.find().sort({ createdAt: -1 }).lean();
    
    // Map objects to ensure they contain only serializable strings/primitives
    const submissions = rawSubmissions.map((doc: any) => ({
      _id: doc._id.toString(),
      name: doc.name,
      phone: doc.phone,
      email: doc.email,
      type: doc.type || "",
      message: doc.message || "",
      createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
    }));

    return { success: true, data: submissions } as any;
  });
