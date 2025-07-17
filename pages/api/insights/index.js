import { GoogleGenerativeAI } from "@google/generative-ai";
import {connectDB} from "../../../lib/mongodb";
import Transaction from "../../../models/Transaction";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Ensure MongoDB connection
    const client = await connectDB();
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Fetch transactions
    const transactions = await Transaction.find({}).sort({ date: -1 });

    if (transactions.length === 0) {
      return res
        .status(200)
        .json({ insight: "No transaction data available to generate insights." });
    }

    // Format transaction details with validation
    const transactionDetails = transactions
      .filter(t => t.date && t.description && t.amount && t.category)
      .map(
        (t) =>
          `- ${new Date(t.date).toLocaleDateString()}: ${t.description} - ₹${
            t.amount
          } (${t.category})`
      )
      .join("\n");

    if (!transactionDetails) {
      return res
        .status(200)
        .json({ insight: "No valid transaction data available to generate insights." });
    }

    // Initialize Gemini model with correct model name
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Updated to use available model
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    // Add safety settings
    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    const prompt = `
      Based on the following transactions, provide some insights into my spending habits.
      Give me a summary of my spending, identify areas where I might be overspending,
      and suggest some potential ways to save money.

      Transactions:
      ${transactionDetails}
    `;

    // Debugging: Log API Key status
    console.log("API Key:", process.env.GEMINI_API_KEY ? "Set" : "Not set");

    // Generate content with proper error handling
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        safetySettings: safetySettings,
      });
      
      if (!result || !result.response) {
        throw new Error("No response from Gemini API");
      }
      
      const response = result.response;
      const insight = response.text();
      
      if (!insight) {
        throw new Error("Empty response from Gemini API");
      }

      res.status(200).json({ insight });
    } catch (geminiError) {
      console.error("Gemini API Error:", geminiError);
      
      // Check if it's a specific API error
      if (geminiError.message.includes("API key")) {
        return res.status(401).json({ 
          message: "Invalid API key",
          details: "Please check your GEMINI_API_KEY environment variable"
        });
      }
      
      if (geminiError.message.includes("quota")) {
        return res.status(429).json({ 
          message: "API quota exceeded",
          details: "Please try again later"
        });
      }
      
      // Generic API error
      return res.status(500).json({ 
        message: "Error generating insights from Gemini API",
        details: geminiError.message
      });
    }
  } catch (error) {
    console.error("General Error:", error);
    res.status(500).json({ 
      message: "Internal server error",
      details: error.message
    });
  }
}