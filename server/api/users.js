const router = require("express").Router();
// eslint-disable-next-line no-unused-vars
const passport = require("passport");
const { Route } = require("react-router");
const {
  models: { User },
} = require("../db");
const requireToken = require("./authmiddleware");

module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: ["Mentees", "Mentors"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//GET MENTOR MATCHES
router.get("/mentors/:intakeScore", async (req, res, next) => {
  try {
    const mentors = await User.findAll({
      where: {
        intakeScore: parseInt(req.params.intakeScore),
        isMentor: true,
      },
    });
    res.json(mentors);
  } catch (err) {
    next(err);
  }
});

//get Mentor by Id

router.get("/mentor/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const mentor = await User.findByPk(id);
    res.json(mentor);
  } catch (err) {
    next(err);
  }
});

// DELETE SINGLE USER
router.get("/:id", async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.json(userToDelete);
  } catch (err) {
    next(err);
  }
});

// ADD NEW USER
router.post("/", async (req, res, next) => {
  try {
    res.json(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/", requireToken, async (req, res, next) => {
  try {
    console.log("hitting route");
    const userId = req.user.id;
    const userToUpdate = await User.findByPk(userId, {
      include: ["Mentees", "Mentors"],
    });
    if (req.body.Mentors) {
      await userToUpdate.setMentors(req.body.Mentors[0].id);
      userToUpdate.save();
      res.json(userToUpdate);
    } else {
      const newUser = await userToUpdate.update(req.body);

      res.json(newUser);
    }
  } catch (error) {
    next(error);
  }
});
