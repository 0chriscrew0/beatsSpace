const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//-----------------------------
//           Models
//-----------------------------

const User = require("./models/User");
const Genre = require("./models/Genre");
const Artist = require("./models/Artist");
const Beat = require("./models/Beat");

//-----------------------------
//           Middleware
//-----------------------------

const auth = require("./middleware/auth");
const admin = require("./middleware/admin");

//-----------------------------
//           Beats
//-----------------------------

app.get("/api/product/beats", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Beat.find()
    .populate("genre")
    .populate("artist")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, beats) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send(beats);
    });
});

app.get("/api/product/beats_by_id", (req, res) => {
  let ids = req.query.id.split(",");
  let items = ids.map(id => {
    return mongoose.Types.ObjectId(id);
  });

  Beat.find({ _id: { $in: items } })
    .populate("genre")
    .populate("artist")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post("/api/product/createBeat", auth, admin, (req, res) => {
  const beat = new Beat(req.body);

  beat.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
});

app.get("/api/product/getBeats", (req, res) => {
  Beat.find({}, (err, beats) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(beats);
  });
});

//-----------------------------
//           Artist
//-----------------------------

app.post("/api/product/createArtist", auth, admin, (req, res) => {
  const artist = new Artist(req.body);

  artist.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      doc
    });
  });
});

app.get("/api/product/getArtists", (req, res) => {
  Artist.find({}, (err, artists) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(artists);
  });
});

//-----------------------------
//           Genres
//-----------------------------

app.post("/api/product/createGenre", auth, admin, (req, res) => {
  const genre = new Genre(req.body);

  genre.save((err, doc) => {
    if (err) {
      res.json({ success: false, err });
    }

    res.status(200).json({ success: true, doc });
  });
});

app.get("/api/product/getGenres", (req, res) => {
  Genre.find({}, (err, genres) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(genres);
  });
});

//-----------------------------
//           Users
//-----------------------------

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    res.status(200).json({
      success: true
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        success: false,
        message: "Auth failed. Email not found"
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ success: false, message: "Incorrect Password" });
      }

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }

        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            success: true
          });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.status(200).send({
      success: true
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
