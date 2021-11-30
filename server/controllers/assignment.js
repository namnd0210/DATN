import Assignment from '../models/Assignment';
import AssignmentResult from './../models/AssignmentResult';

export const getAllAssignments = async (req, res) => {
  let count = await Assignment.countDocuments();
  const { page } = req.query;
  Assignment.find({})
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getAllAssignmentsByTeacherId = async (req, res) => {
  let count = await Assignment.countDocuments();
  const id = req.params.id;
  // check role before return

  Assignment.find({ created_by: id })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getAllAssignmentsById = async (req, res) => {
  let count = await Assignment.countDocuments();
  const id = req.params.id;
  Assignment.find({ _id: id })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createAssignment = (req, res) => {
  const assignment = new Assignment(req.body);
  assignment
    .save()
    .then((assignment) => {
      Assignment.findOne({ _id: assignment._id })
        .populate({ path: 'comments', model: 'Comment' })
        .populate({ path: 'created_by', model: 'User' })
        .then((c) => {
          res.status(200).json({ data: c });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateAssignment = (req, res) => {
  Assignment.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      images: req.body.images ?? [],
      description: req.body.description,
      due_date: req.body.due_date,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: true },
  )
    .populate({ path: 'updated_by', model: 'User' })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const deleteAssignment = (req, res) => {
  Assignment.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
