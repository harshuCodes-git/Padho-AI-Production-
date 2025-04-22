"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

//   const prompt = `Write a professional summary based on the provided description input.

// **Input Description:**  
// ${data.jobDescription}

// **Metadata:**  
// - Source Type: ${
//     data.companyName
//   }         // e.g., jobPosting, productSpec, companyProfile  
// - Title: ${
//     data.jobTitle
//   }                   
// - Company Name: ${data.companyName}    
   

// - Keywords: ${data.keywords?.join(
//     ", "
//   )}  // Array of important terms or skills from the description  

// **Summary Requirements:**  
// 1. Use a professional, informative tone  
// 2. Summarize the full content of the description clearly and concisely  
// 3. Ensure all key details and intent are preserved  
// 4. Highlight relevant features, responsibilities, goals, or requirements  
// 5. Format the output in paragraph or bullet form depending on content type  
// 6. Limit the length to under 200 words  
// 7. Do not omit any important information from the original description  

// Return only the summary in plain text. No additional headings or formatting.
// `;

const prompt = `Generate concise, well-structured study notes for the subject ${data.jobTitle}, covering the topic ${data.jobDescription}.

The notes should include:

A brief introduction

Key definitions and concepts

Important formulas or code snippets (if applicable)

Diagrams or bullet points for clarity

Real-world examples or use-cases (if relevant)

The tone should be beginner-friendly and easy to revise.`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating summary:", error.message);
    throw new Error("Failed to generate summary");
  }
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}
