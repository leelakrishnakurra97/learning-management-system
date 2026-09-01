import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const isApiKeyValid = apiKey && apiKey !== 'your-gemini-api-key-here' && apiKey.trim() !== '';
const genAI = isApiKeyValid ? new GoogleGenerativeAI(apiKey) : null;
const tutorModels = Array.from(
  new Set([process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'].filter(Boolean))
);

const buildFallbackAnswer = (question: string, reason: string) => `I'm your **AI Tutor Bot**, but the live AI service is temporarily unavailable.

**Reason:** ${reason}

Please try again in a minute. In the meantime, here's how I would approach your question:

1. Identify the exact concept or formula involved.
2. Write down the known values or facts from the problem.
3. Solve one step at a time, checking each step before moving forward.

*Current Question:* "${question}"`;

const getSmartMockResponse = (question: string): string => {
  const q = question.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("tutor") || q.includes("who are you")) {
    return `Hello! I'm your **AI Personal Tutor** 🎓.

I can help you understand complex topics and solve homework step-by-step.

Tell me what you are studying today:
- **Mathematics** (e.g., *matrices, complex numbers, sets*)
- **Physics** (e.g., *Newton's laws of motion, gravitation*)
- **Chemistry** (e.g., *atoms, chemical bonding, periodic table*)
- **Biology** (e.g., *the cell structure, tissues*)`;
  }

  if (q.includes("matrix") || q.includes("matrices") || q.includes("determinant") || q.includes("inverse") || q.includes("cramer")) {
    return `### 🧮 Solving Matrices & Determinants Step-by-Step

A matrix is a grid of numbers. Here is a review of **Inverse Matrices**:

1. **Check Determinant ($|A|$)**:
   An inverse matrix $A^{-1}$ exists if and only if the determinant is non-zero:
   $$|A| \\neq 0$$
   If $|A| = 0$, the matrix is **singular** and has no inverse.

2. **Find the Adjoint matrix ($\\text{adj}(A)$)**:
   The transpose of the cofactor matrix:
   $$\\text{adj}(A) = C^T$$

3. **Apply the Inverse Formula**:
   $$A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$$

   Would you like to try a numerical example? Just ask me!`;
  }

  if (q.includes("complex") || q.includes("imaginary") || q.includes("euler") || q.includes("moivre")) {
    return `### 🔢 Master Complex Numbers

A complex number has the form $z = a + ib$, where:
- $a$ is the **Real Part**
- $b$ is the **Imaginary Part**
- $i$ is defined by $i^2 = -1$

**Key Representations:**
- **Rectangular form**: $z = x + iy$
- **Polar form**: $z = r(\\cos \\theta + i \\sin \\theta)$, where $r = \\sqrt{x^2+y^2}$ and $\\theta = \\tan^{-1}(y/x)$
- **Euler form**: $z = r e^{i\\theta}$

*Tutor Tip:* De Moivre's Theorem states that $(\\cos \\theta + i \\sin \\theta)^n = \\cos(n\\theta) + i \\sin(n\\theta)$. Let me know if you want to see an application!`;
  }

  if (q.includes("motion") || q.includes("newton") || q.includes("force") || q.includes("gravity") || q.includes("gravitation")) {
    return `### 🚀 Physics Concept: Newton's Laws & Force

Here is a quick summary of **Force and Laws of Motion**:

1. **Newton's First Law (Inertia)**:
   An object will remain at rest or keep moving at a constant velocity unless acted upon by a net external force.
2. **Newton's Second Law ($F = ma$)**:
   The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass:
   $$\\text{Force} = \\text{Mass} \\times \\text{Acceleration}$$
3. **Newton's Third Law (Action & Reaction)**:
   For every action, there is an equal and opposite reaction.

Tell me if you would like to solve a force calculation problem!`;
  }

  if (q.includes("chem") || q.includes("atom") || q.includes("molecule") || q.includes("periodic") || q.includes("reaction")) {
    return `### 🧪 Chemistry Concept: Atoms & Chemical Bonding

Let's study the atomic structure and chemical properties:

- **Structure of the Atom**: Composed of protons and neutrons in the nucleus, and electrons in shell energy levels.
- **Octet Rule**: Atoms tend to gain, lose, or share electrons to obtain a full outer shell of 8 valence electrons.
- **Covalent vs. Ionic Bonding**:
  - *Covalent*: Electron sharing between non-metal atoms.
  - *Ionic*: Electron transfer between a metal and a non-metal, forming electrostatic attractions.

What specific chemical formula or bonding mechanism are you working on?`;
  }

  if (q.includes("bio") || q.includes("cell") || q.includes("organism") || q.includes("tissue") || q.includes("plant")) {
    return `### 🧬 Biology Concept: The Cell & Life Science

Here is a summary of the fundamental unit of life:

1. **The Cell**: The smallest unit that can live on its own and makes up all living organisms.
2. **Organelles**:
   - *Mitochondria*: Powerhouse of the cell (ATP synthesis).
   - *Nucleus*: Stores genetic material (DNA).
   - *Ribosomes*: Synthesis of proteins.
3. **Tissues**: Collection of specialized cells working together to perform specific functions.

Tell me which organelle or tissue type you'd like to dive into!`;
  }

  // General fallback that is helpful
  return `I'm your **AI Personal Tutor** 🎓!

I can explain core topics in **Math, Physics, Chemistry, and Biology**. Try asking:
- *'Explain Newton\'s laws'*
- *'What is a complex number?'*
- *'How does a cell work?'*`;
};

router.post('/tutor', requireAuth, async (req, res) => {
  const { question, history, attachment } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // If the API key is not configured, query a free public LLM provider (Pollinations AI)
  if (!genAI) {
    console.warn('GEMINI_API_KEY is not set. Querying free public AI endpoint.');
    
    let textQuestion = question;
    if (attachment && attachment.name) {
      textQuestion = `[User attached file: ${attachment.name} (type: ${attachment.type})]\n\n${question}`;
    }

    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are an encouraging, expert AI Personal Tutor for a student. Keep your explanations clear, structured, and easy to understand. Use Markdown formatting. If the student asks a math/science question, explain step-by-step. If they ask a coding question, write clean code with comments. Always maintain a helpful, teacher-like tone. Note: If the user attached a file, you cannot view its visual content, but you can acknowledge the attachment by name and explain you are running in a text-only fallback mode."
            },
            ...(Array.isArray(history)
              ? history.map((msg: any) => ({
                  role: msg.role === 'user' ? 'user' : 'assistant',
                  content: msg.text || (Array.isArray(msg.parts) ? msg.parts[0]?.text : '') || ''
                }))
              : []),
            { role: "user", content: textQuestion }
          ]
        })
      });

      if (response.ok) {
        const answer = await response.text();
        return res.json({ answer });
      }
    } catch (err) {
      console.error("Free public AI endpoint failed, falling back to local mock:", err);
    }
    
    // Local fallback if Pollinations is offline/throttled
    textQuestion = question;
    if (attachment && attachment.name) {
      textQuestion = `[User attached file: ${attachment.name} (type: ${attachment.type})]\n\n${question}`;
    }
    const fallbackAnswer = getSmartMockResponse(textQuestion);
    return res.json({ answer: fallbackAnswer });
  }

  try {
    // Format history for the Gemini API chat
    // The Gemini chat API history expects the format:
    // [{ role: 'user' | 'model', parts: [{ text: string }] }]
    const formattedHistory = Array.isArray(history) 
      ? history.map((msg: any) => {
          let msgText = '';
          if (typeof msg.text === 'string') {
            msgText = msg.text;
          } else if (msg.parts && typeof msg.parts === 'string') {
            msgText = msg.parts;
          } else if (Array.isArray(msg.parts) && msg.parts.length > 0) {
            msgText = msg.parts[0].text || '';
          }
          
          const parts: any[] = [{ text: msgText }];
          
          if (msg.attachment && msg.attachment.data && msg.attachment.type) {
            const base64Data = msg.attachment.data.split(',')[1] || msg.attachment.data;
            parts.push({
              inlineData: {
                data: base64Data,
                mimeType: msg.attachment.type
              }
            });
          }
          
          return {
            role: msg.role === 'user' ? 'user' : 'model',
            parts
          };
      })
      : [];

    let lastError: any = null;

    for (const modelName of tutorModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: 'You are an encouraging, expert AI Personal Tutor for a student. Keep your explanations clear, structured, and easy to understand. Use Markdown formatting. If the student asks a math/science question, explain step-by-step. If they ask a coding question, write clean code with comments. Always maintain a helpful, teacher-like tone.',
        });

        const chat = model.startChat({
          history: formattedHistory,
        });

        let messageContent: any = question;
        if (attachment && attachment.data && attachment.type) {
          const base64Data = attachment.data.split(',')[1] || attachment.data;
          messageContent = [
            { text: question },
            {
              inlineData: {
                data: base64Data,
                mimeType: attachment.type
              }
            }
          ];
        }

        const result = await chat.sendMessage(messageContent);
        const response = await result.response;
        const answer = response.text();

        return res.json({ answer });
      } catch (error: any) {
        lastError = error;
        console.warn(`Gemini model ${modelName} failed:`, error.message);
      }
    }

    return res.json({
      answer: buildFallbackAnswer(
        question,
        lastError?.status === 503
          ? 'Google Gemini is currently reporting high demand.'
          : 'The configured AI provider could not generate a response.'
      ),
    });
  } catch (error: any) {
    console.error('Error querying Gemini API:', error);
    return res.json({
      answer: buildFallbackAnswer(question, 'The AI tutor backend hit an unexpected error.'),
    });
  }
});

export default router;
