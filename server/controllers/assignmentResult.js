import AssignmentResult from '../models/AssignmentResult';

export const getResultByUserId = async (req, res) => {
  let count = await AssignmentResult.countDocuments();
  const id = req.params.id;
  AssignmentResult.find({ _id: id })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createResult = (req, res) => {
  const assignment = new AssignmentResult(req.body);
  assignment
    .save()
    .then((assignment) => {
      AssignmentResult.findOne({ _id: assignment._id })
        .populate({ path: 'assignment', model: 'Assignment' })
        .populate({ path: 'class', model: 'Class' })
        .populate({ path: 'created_by', model: 'User' })
        .then((c) => {
          res.status(200).json({ data: c });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};