import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { PORTFOLIO_DATA, CLAUDE_SYSTEM_PROMPT } from '@/lib/data';

// Initialize the Google Generative AI — key loaded per-request to support hot env reloads

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback message if API key is not present
      return NextResponse.json({
        response: "⚠️ It looks like my AI mind is turned off right now because the GEMINI_API_KEY is missing in your .env.local file! Once it's added, I can answer this dynamically. Until then, here's Himanshu's email: " + PORTFOLIO_DATA.personal.email
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use gemini-2.5-flash for fast chat responses
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
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
    
    // Extract a more helpful error message if it's from Google Generative AI
    let errorMessage = "Error processing your request. Please try again.";
    if (error.message) {
        if (error.message.includes("429") || error.message.includes("Too Many Requests") || error.status === 429) {
             errorMessage = "API Rate Limit Exceeded or API Key Quota Exhausted. If you are on Vercel, please make sure you added the GEMINI_API_KEY environment variable. If you are using a free API key, you may need to wait or use a different key.";
        } else if (error.message.includes("404") || error.message.includes("Not Found")) {
             errorMessage = `Model not found or API Key not authorized for this model. Error: ${error.message}`;
        } else {
             errorMessage = error.message;
        }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
