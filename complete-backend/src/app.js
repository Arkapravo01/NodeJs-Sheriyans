const express = require("express");

const app = express();
app.use(express.json());

const notes = [];

// POST /notes
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Note created successfully",
  });
});

// GET /notes
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes fetched successfully",
    notes: notes,
  });
});

// PATCH /notes/:index
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const description = req.body.description;

  ((notes[index].description = description),
    res.status(200).json({
      message: "Note updated successfully",
    }));
});

// DELETE /notes/:index
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  //   notes.splice(index, 1);
  delete notes[index];
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

module.exports = app;
