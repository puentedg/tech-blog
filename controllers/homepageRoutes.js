const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: User,
      order: [["updatedAt", "DESC"]],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    const query = req.query.opt;
console.log(query);
    res.render("dashboard", {
      posts,
      query,
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/dashboard/create-post", withAuth, (req, res) => {
  try {
    res.render("create-post", {
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/edit-post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
    });
    const post = postData.get({ plain: true });
    res.render("edit-post", {
      ...post,
      currentId: req.session.user_id,
      currentUsername: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;