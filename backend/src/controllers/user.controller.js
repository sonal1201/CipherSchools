import tryCatch from "../middleware/tryCatach.middleware.js";
import { User } from "../models/user.model.js";

// -- simple login User
export const loginUser = tryCatch(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "username is required.",
    });
  }

  const user = await User.findOneAndUpdate(
    { username },
    { username },
    {
      upsert: true,
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      username: user.username,
    },
  });
});

export const healthApi = tryCatch(async (req, res) => {
  return res.json({
    success: false,
    message: "Server is running",
  });
});
