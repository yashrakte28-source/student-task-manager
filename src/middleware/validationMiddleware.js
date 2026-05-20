const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 2 characters",
    });
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  next();
};

const validateTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Task title must be at least 2 characters",
    });
  }

  // Sanitize — remove dangerous characters
  if (req.body.title) req.body.title = req.body.title.trim();
  if (req.body.description) req.body.description = req.body.description.trim();
  if (req.body.subject) req.body.subject = req.body.subject.trim();

  next();
};

module.exports = { validateRegister, validateLogin, validateTask };