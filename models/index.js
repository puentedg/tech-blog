const User = require("./User");
const Comment = require("./Comment");
const Category = require("./Category");


User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Category, Comment };
