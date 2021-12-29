import express from 'express';

import Exam from '../models/Exam';
import Question from '../models/Question';

const router = express.Router();

export const getAllExams = async (req, res) => {
  let count = await Exam.countDocuments();
  Exam.find({})
    .populate({ path: 'questions', model: 'Question' })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data, total: count });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const getExam = (req, res) => {
  Exam.findOne({ _id: req.params.id })
    .populate({ path: 'questions', model: 'Question' })
    .populate({ path: 'created_by', model: 'User' })
    .then((exam) => {
      res.status(200).json({ exam });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateExam = (req, res) => {
  Exam.findByIdAndUpdate(req.body._id, { ...req.body }, { new: true, useFindAndModify: false })
    .then((exam) => {
      Exam.findOne({ _id: exam._id })
        .populate({ path: 'questions', model: 'Question' })
        .populate({ path: 'created_by', model: 'User' })
        .then((e) => {
          res.status(200).json({ exam: e });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const createExam = async (req, res) => {
  try {
    const { level2Numbers, level3Numbers, total } = req.body;

    await Question.aggregate(
      [
        {
          $facet: {
            easy: [
              {
                $match: {
                  level: 1,
                },
              },
              {
                $sample: {
                  size: total - level2Numbers - level3Numbers,
                },
              },
            ],
            medium: [
              {
                $match: {
                  level: 2,
                },
              },
              {
                $sample: {
                  size: level2Numbers,
                },
              },
            ],
            hard: [
              {
                $match: {
                  level: 3,
                },
              },
              {
                $sample: {
                  size: level3Numbers,
                },
              },
            ],
          },
        },
        {
          $project: {
            data: {
              $concatArrays: ['$easy', '$medium', '$hard'],
            },
          },
        },
      ],
      (error, docs) => {
        if (error) {
          res.status(400).json(error);
          return;
        }
        const questions = docs[0].data.map((e) => e._id);

        const newExam = {
          code: Math.floor(Math.random() * 999),
          time: req.body.time,
          title: req.body.title,
          description: req.body.description,
          questions: questions,
          created_by: req.body.created_by,
        };

        const exam = new Exam(newExam);

        exam
          .save()
          .then((exam) => {
            Exam.findOne({ _id: exam._id })
              .populate({ path: 'questions', model: 'Question' })
              .populate({ path: 'created_by', model: 'User', select: 'name' })
              .then((e) => {
                res.status(200).json(e);
              });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const deleteExam = (req, res) => {
  Exam.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export default router;
