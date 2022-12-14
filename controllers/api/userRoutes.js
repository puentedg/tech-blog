const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/username", async (req, res) => {
  try {
    await User.update(
      {
        username: req.body.username,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );

    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    const user = userData.get({ plain: true });

    req.session.save(() => {
      req.session.user_name = user.username;
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/password", async (req, res) => {
  try {
    await User.update(
      {
        password: req.body.password,
      },
      {
        where: {
          id: req.session.user_id,
        },
        individualHooks: true,
      }
    );
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    const user = userData.get({ plain: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.username;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;