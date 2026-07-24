export const validateLeadSubmission = (req, res, next) => {
  const { name, email, budgetRange, message } = req.body;

  if (!name || !email || !budgetRange || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  next();
};
