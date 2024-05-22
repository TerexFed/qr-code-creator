const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://terexfed9:Gh9X26LAtrBYwKwx@cluster.czv7iii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const QrCodeSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const QrCode = mongoose.model("QrCode", QrCodeSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      "cPL7gPPldiKIYRQzGUpWgQvevWYDCmbZOqoCanQ5csx1D-NicKXcGTDefEkJkPCL",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/qr-codes", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, "cPL7gPPldiKIYRQzGUpWgQvevWYDCmbZOqoCanQ5csx1D-NicKXcGTDefEkJkPCL");
    const userId = decoded.userId;

    const qrCode = new QrCode({ data: req.body.data, title: req.body.title, userId });
    await qrCode.save();

    res.status(201).json({ message: "QR Code saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/qr-codes', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, 'cPL7gPPldiKIYRQzGUpWgQvevWYDCmbZOqoCanQ5csx1D-NicKXcGTDefEkJkPCL');
    const userId = decoded.userId;

    const qrCodes = await QrCode.find({ userId });

    res.status(200).json(qrCodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.delete('/qr-codes/:id', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'cPL7gPPldiKIYRQzGUpWgQvevWYDCmbZOqoCanQ5csx1D-NicKXcGTDefEkJkPCL');
    const userId = decoded.userId;
    const qrCodeId = req.params.id;

    const qrCode = await QrCode.findById(qrCodeId);

    if (!qrCode) {
      return res.status(404).json({ message: 'QR Code not found' });
    }

    if (qrCode.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this QR Code' });
    }

    await QrCode.findByIdAndDelete(qrCodeId);

    res.status(200).json({ message: 'QR Code deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

