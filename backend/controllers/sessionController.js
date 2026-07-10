const Session = require("../models/Session");
const Question  = require("../models/Question");

//@desc Create a new session and linked Questions
//@route POST /api/session/create
//@access Private
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions} = req.body;
        const userId = req.user._id; //Assuming using a middleware setting for req.user

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        })

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id, //tells which session contains this question
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;    //it will return only id
            } )
        );

        session.questions = questionDocs;
        await session.save();
        
        res.status(201).json({ success: true, session})

    }
    catch(error) {
        res.status(500).json({ success: false, message: " Server Error"});
    }
};

// @desc Get all the session for the logged-in-user
// @route GET /api/session/my-sessions
// @access Private
exports.getMySessions = async(req, res) => {
     try {
        const sessions = await Session.find({ user: req.user.id })
        .sort({ createdAt: -1})
        .populate("questions");
        res.status(200).json(sessions);
    }
    catch(error) {
        res.status(500).json({ success: false, message: " Server Error"});
    }
};


// @desc Get a session by ID with populated Questions
// @route GET /api/sessions/:id
// @access Private
exports.getSessionById = async(req, res) => {
     try {
            const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: { isPinned: -1, createdAt: 1 }},
            })
            .exec();

            if(!session) {
                return res.status(404).json( { success: false, message: "Session not Found"});
            }

            
    
    res.status(200).json({ success: true, session})
        }
    catch(error) {
        res.status(500).json({ success: false, message: " Server Error"});
    }
};

// @desc Delete a session and its questions
// @route DELETE /api/session/:id
// @access Private
exports.deleteSession = async (req, res) => {
     try {

    }
    catch(error) {
        res.status(500).json({ success: false, message: " Server Error"});
    }
};

