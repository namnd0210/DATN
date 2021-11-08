import express from 'express';

import Exam from '../models/Exam';

const router = express.Router();

export const getAllExams = (req, res) => {
  let query = {};
  Exam.find(query)
    .populate({ path: 'questions', model: 'Question' })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data });
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

export const createExam = (req, res) => {
  const exam = new Exam(req.body);

  exam
    .save()
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
