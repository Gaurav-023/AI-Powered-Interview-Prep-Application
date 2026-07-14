const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc Add additional question to an existing session
// @route POST /api/question/add
// @access Private
exports.addQuestionToSession = async (req, res) => {

    try{
        const { sessionId, questions } = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid input data"});
        }

        const session = await Session.findById(sessionId);

        if(!session) {
            return res.status(404).json({ message: "Session not found "});
        }

        //Create a new question
        const CreateQuestions = await Question.insertMany(
            questions.map((q) => ({
             session: sessionId,
             question: q.question,
             answer: q.answer,
            })
        ) );

        //Update session to include new question IDs
        session.questions.push(...CreateQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json(CreateQuestions);

    }
    catch(error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// @desc Pin or unpin a question
// @route POST /api/question/:id/pin
// @access Private
exports.togglePinQuestion = async (req,res) => {

}

// @desc Update a note for a question
// @route POST /api/question/:id/note
// @access Private
exports.updateQuestionNote = async (req, res) => {}
