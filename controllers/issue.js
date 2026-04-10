const Issue = require("../models/Issue");

exports.createIssue = async (req, res) => {
  try {
    const issue = new Issue({
      ...req.body,
      createdBy: req.user.user.id, // 🔥 FIXED
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.getIssues = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    const issues = await Issue.find({
      createdBy: req.user.user?.id || req.user.id,
    });

    console.log("FILTERED ISSUES COUNT:", issues.length);

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};