const mongoose = require("mongoose");

const { generateHash } = require("../utils/hashProvider");

const UserScherma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

UserScherma.pre("save", async function (next) {
  const user = this;

  user.password = await generateHash(user.password);

  return next();
});

UserScherma.pre("findOneAndUpdate", async function (next) {
  const doc = this;

  const userUpdated = doc.getUpdate();

  if (userUpdated.password) {
    userUpdated.password = await generateHash(userUpdated.password);
  }

  return next();
});

module.exports = mongoose.model("users", UserScherma);
