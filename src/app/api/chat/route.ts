import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { PORTFOLIO_DATA, CLAUDE_SYSTEM_PROMPT } from '@/lib/data';

// Initialize the Google Generative AI
// Notice that the API key should be provided via process.env.GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDoI8oHnzMBn6qwyNg2i5ZgRWHs5Lz0kEk";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!apiKey) {
      // Fallback message if API key is not present
      return NextResponse.json({
        response: "⚠️ It looks like my AI mind is turned off right now because the GEMINI_API_KEY is missing in your .env.local file! Once it's added, I can answer this dynamically. Until then, here's Himanshu's email: " + PORTFOLIO_DATA.personal.email
      });
    }

    // Use gemini-2.5-flash for fast chat responses
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ]
    });

    // Combine system prompt with the user's message
    const prompt = `System Instructions: ${CLAUDE_SYSTEM_PROMPT}\n\nUser Question: ${message}\n\nPlease provide a helpful, engaging, and concise response below based **only** on the System Instructions constraint:`;

    let responseText = "";
    
    // Add retry logic to handle intermittent 503 overloads or safety flags
    for (let attempts = 0; attempts < 3; attempts++) {
      try {
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        break; // Break loop if successful
      } catch (err: any) {
        if (attempts === 2) throw err; // If last attempt fails, throw the error
        await new Promise(resolve => setTimeout(resolve, 1500)); // wait 1.5s
      }
    }

    return NextResponse.json({ response: responseText });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error processing your request. Please try again." },
      { status: 500 }
    );
  }
}
