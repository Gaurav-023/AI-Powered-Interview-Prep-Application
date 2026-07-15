const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
) =>
  `Generate exactly ${numberOfQuestions} technical interview questions with answers.
Role: ${role} | Experience: ${experience} years | Topics: ${topicsToFocus}

Rules:
- Answers must be beginner-friendly and concise under 60-100 words.
- Include a minimal code block only if essential.
- Return ONLY a valid JSON array, no extra text:
[{"question": "...", "answer": "..."}]`;

const conceptExplainPrompt = (question) =>
  `Explain this interview concept to a beginner developer in under 150 words.
Question: "${question}"

Rules:
- Include a minimal code block only if essential.
- Return ONLY valid JSON, no extra text:
{"title": "...", "explanation": "..."}`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
