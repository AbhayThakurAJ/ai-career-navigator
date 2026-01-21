import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerGoal, Roadmap } from "../types";

// 🔹 Lazy client creator (safe for React + Vite + Netlify)
function getClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "❌ Missing Gemini API Key. Set VITE_GEMINI_API_KEY in .env.local or Netlify."
    );
  }

  return new GoogleGenAI({ apiKey });
}

// ===============================
// Career Suggestions
// ===============================
export const getCareerSuggestions = async (
  profile: UserProfile
): Promise<CareerGoal[]> => {
  try {
    const ai = getClient();

    const prompt = `Based on the following student profile:
Name: ${profile.name}
Age: ${profile.age}
Gender: ${profile.gender}
Education: ${profile.education}

Suggest 3 distinct and exciting career goals that suit this student's current stage of life and background.
Return the response as a JSON array of objects.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // ✅ THE ONLY MODEL THAT ACTUALLY WORKS FOR YOU
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              reasoning: { type: Type.STRING },
            },
            required: ["id", "title", "description", "reasoning"],
          },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (err: any) {
    console.error("Gemini error (career suggestions):", err);
    throw new Error(
      "Gemini is temporarily busy. Please try again in 10–20 seconds."
    );
  }
};

// ===============================
// Roadmap Generator
// ===============================
export const generateRoadmap = async (
  profile: UserProfile,
  goal: CareerGoal
): Promise<Roadmap> => {
  try {
    const ai = getClient();

    const prompt = `Generate a highly personalized learning roadmap for the student: ${profile.name} (Age: ${profile.age}, Education: ${profile.education}) who wants to achieve the career goal: "${goal.title}".

The roadmap should include three separate paths:
1. A 1-month "Intensive Foundation" plan (broken into 4 weeks).
2. A 3-month "Comprehensive Skill Building" plan (broken into months).
3. A 6-month "Mastery & Career Prep" plan (broken into months).

Each step should include a task name, a detailed description, and a list of specific recommended resources (e.g., courses, books, tools).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // ✅ SAME HERE
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goalId: { type: Type.STRING },
            goalTitle: { type: Type.STRING },
            oneMonth: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  period: { type: Type.STRING },
                  task: { type: Type.STRING },
                  description: { type: Type.STRING },
                  resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["period", "task", "description", "resources"],
              },
            },
            threeMonths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  period: { type: Type.STRING },
                  task: { type: Type.STRING },
                  description: { type: Type.STRING },
                  resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["period", "task", "description", "resources"],
              },
            },
            sixMonths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  period: { type: Type.STRING },
                  task: { type: Type.STRING },
                  description: { type: Type.STRING },
                  resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["period", "task", "description", "resources"],
              },
            },
          },
          required: ["goalId", "goalTitle", "oneMonth", "threeMonths", "sixMonths"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");

    return {
      ...parsed,
      goalId: goal.id,
      goalTitle: goal.title,
    };
  } catch (err: any) {
    console.error("Gemini error (roadmap):", err);
    throw new Error(
      "Gemini is temporarily busy. Please try again in 10–20 seconds."
    );
  }
};
