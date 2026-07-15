const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

// @desc Generate interview question and answer using Gemini
// @route POST /api/ai/generate-question
// @access Private
const generateInterviewQuestions = async (req,res) => {

    try{

        const { role, experience, topicsToFocus, numberOfQuestions} = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields"});
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response = await ai.models.generateContent({
            model: "gemini-3-flash",
            contents: prompt,
        })

        let rawText = response.text;

        //Cleaning the Text by Removing Json from entire response
        const cleanedText = rawText.replace(/^```json\s*/, "") // remove starting ```json
        .replace(/```$/,"") //remove ending ```
        .trim();

        //Now Safe to parse
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);


    }
    catch(error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        })
    }
}

// @desc Generate explains a interview question
// @route POST /api/ai/generate-explaination
// @access Private
const generateConceptExplaination = async (req, res) => {
    try{

    }
    catch(error) {

    }


};

module.exports = { generateConceptExplaination, generateInterviewQuestions }
;