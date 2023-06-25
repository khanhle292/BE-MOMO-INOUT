const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(3001, () => {
  console.log("Backend server is running on http://localhost:3001");
});
