import Question from '../models/Question';

export const getAllQuestions = async (req, res) => {
  let count = await Question.countDocuments();
  const { page } = req.query;
  Question.find({})
    .populate({ path: 'category', model: 'Category' })
    .skip((page ? page - 1 : 0) * 10)
    .limit(10)
    .then((ques) => {
      res.status(200).json({
        data: ques,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createQuestion = (req, res) => {
  const question = new Question(req.body);
  question
    .save()
    .then((question) => {
      Question.findOne({ _id: question._id })
        .populate({ path: 'category', model: 'Category' })
        .then((ques) => res.status(200).json({ question: ques }));
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateQuestion = (req, res) => {
  console.log(req.params._id);
  Question.findByIdAndUpdate(
    req.body._id,
    {
      answers: req.body.answers,
      question: req.body.question,
      correctAnswer: req.body.correctAnswer,
      category: req.body.category,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: true },
  )
    .populate({ path: 'category', model: 'Category' })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const deleteQuestion = (req, res) => {
  Question.remove({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};