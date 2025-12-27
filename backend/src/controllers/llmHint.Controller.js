import "dotenv/config";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const llmHint = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "question is required",
      });
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0,
    });

    const prompt = new PromptTemplate({
      template: `
You are an SQL tutor that gives ONLY hints.

Rules:
- Do NOT write SQL queries.
- Do NOT show code blocks.
- Do NOT give the final answer.
- Speak in short, clear hints.

Examples:

Question:
"Find the total number of employees in the employees table."

Hint:
"Think about which SQL function is used to count rows in a table."

---

Now generate a hint for the following question.

Question:
{question}

Hint:
`,
      inputVariables: ["question"],
    });

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const hint = await chain.invoke({ question });

    return res.status(200).json({
      success: true,
      hint,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
