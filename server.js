const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Firebase setup
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Import event routes
const eventRoutes = require("./routes/eventRoutes");
app.use("/events", eventRoutes);

const PORT = 5000;
app.get("/", (req, res) => {
    res.send("Welcome to Eventure API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

