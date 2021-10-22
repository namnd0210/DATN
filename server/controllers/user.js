import User from "../models/User";

export const register = async (req, res) => {
  try {
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res.status(400).json({ err: "Username already exists !!" });
      } else {
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json({ success: true, user }))
              .catch((err) => res.status(400).json({ success: false, err }));
          });
        });
      }
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
