import express from 'express';

import Class from '../models/Class';
import ClassStudent from '../models/ClassStudent';

const router = express.Router();

export const getClasses = async (req, res) => {
  const { page, id } = req.query;
  let query = {};
  if (id) {
    query = { ...query, students: id };
  }
  let count = await Class.countDocuments(query);
  Class.find(query)
    .populate({ path: 'teacher', model: 'User' })
    .populate({
      path: 'exam',
      model: 'Exam',
      populate: {
        path: 'questions',
        model: 'Question',
      },
    })
    .populate({ path: 'students', model: 'User' })
    .populate({ path: 'assignments', model: 'Assignment' })
    .limit(10)
    .skip((page ? page - 1 : 0) * 10)
    .then((classData) => {
      res.status(200).json({ data: classData, total: count });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getClass = async (req, res) => {
  const { page } = req.query;
  const { id } = req.params;
  let count = await Class.countDocuments();
  const student = await ClassStudent.find({ _id: id });

  Class.find({ _id: id })
    .populate({ path: 'teacher', model: 'User' })
    .populate({ path: 'exam', model: 'Exam' })
    .populate({ path: 'students', model: 'User' })
    .limit(10)
    .skip((page ? page - 1 : 0) * 10)
    .then((classRes) => res.status(200).json({ data: { ...classRes, student }, total: count }))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export const updateClass = (req, res) => {
  Class.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      teacher: req.body.teacher,
      exam: req.body.exam,
      students: req.body.students,
      assignments: req.body.assignments,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: false },
  )
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export const createClass = (req, res) => {
  const classModel = new Class(req.body);
  classModel
    .save()
    .then((classRes) => {
      Class.findOne({ _id: classRes._id })
        .populate({ path: 'students', model: 'User', select: 'name' })
        .populate({ path: 'teacher', model: 'User', select: 'name' })
        .populate({ path: 'exam', model: 'Exam' })
        .then((foundedRes) => {
          res.status(200).json({ success: true, data: foundedRes });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export const deleteClass = (req, res) => {
  Class.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export default router;
