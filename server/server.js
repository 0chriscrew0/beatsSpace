const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const stripeLoader = require("stripe");
const async = require("async");
require("dotenv").config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//-----------------------------
//           Models
//-----------------------------

const User = require("./models/User");
const Genre = require("./models/Genre");
const Artist = require("./models/Artist");
const Beat = require("./models/Beat");
const Payment = require("./models/Payment");
const Site = require("./models/Site");

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

app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Beat.find(findArgs)
    .populate("artist")
    .populate("genre")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, beats) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).json({
        size: beats.length,
        beats
      });
    });
});

app.get("/api/product/getProducts", (req, res) => {
  Beat.find({})
    .populate("artist")
    .populate("genre")
    .exec((err, products) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send(products);
    });
});

app.post("/api/product/editProduct", auth, admin, (req, res) => {
  Beat.findByIdAndUpdate(
    req.body.id,
    req.body.data,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);

      res.status(200).send({ success: true, products: doc });
    }
  );
});

app.post("/api/product/removeProduct", auth, admin, (req, res) => {
  Beat.deleteOne({ _id: req.body.id }, err => {
    if (err) {
      return res.status(400).send(err);
    }

    User.updateMany(
      {},
      { $pull: { cart: { id: mongoose.Types.ObjectId(req.body.id) } } },
      () => {
        if (err) return res.status(400).send(err);
      }
    );

    return res.status(200).send({ success: true });
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
      artist: doc
    });
  });
});

app.get("/api/product/getArtists", (req, res) => {
  Artist.find({}, (err, artists) => {
    if (err) {
      return res.status(400).send(err);
    }

    const newArtists = artists.filter(item => item.name !== "Unkown");

    return res.status(200).send(newArtists);
  });
});

app.post("/api/product/editArtist", auth, admin, (req, res) => {
  Artist.findByIdAndUpdate(
    req.body.id,
    req.body.data,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);

      res.status(200).send({ success: true, artists: doc });
    }
  );
});

app.post("/api/product/removeArtist", auth, admin, async (req, res) => {
  let noneArtist = await Artist.findOne({ name: "Unkown" }, (err, artist) => {
    return artist;
  });
  if (!noneArtist) {
    noneArtist = new Artist({ name: "Unkown" });
    noneArtist.save();
  }
  console.log(noneArtist);
  Beat.updateMany(
    { artist: { _id: req.body.id } },
    { $set: { artist: noneArtist } },
    err => {
      if (err) return res.status(400).json({ success: false, err });

      Artist.deleteOne({ _id: req.body.id }, err => {
        if (err) return res.status(400).json({ success: false, err });

        res.status(200).send({ success: true });
      });
    }
  );
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

    res.status(200).json({ success: true, genre: doc });
  });
});

app.get("/api/product/getGenres", (req, res) => {
  Genre.find({}, (err, genres) => {
    if (err) {
      return res.status(400).send(err);
    }

    const newGenres = genres.filter(item => item.name !== "None");

    return res.status(200).send(newGenres);
  });
});

app.post("/api/product/editGenre", auth, admin, (req, res) => {
  Genre.findByIdAndUpdate(
    req.body.id,
    req.body.data,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);

      res.status(200).send({ success: true, genres: doc });
    }
  );
});

app.post("/api/product/removeGenre", auth, admin, async (req, res) => {
  let noneGenre = await Genre.findOne({ name: "None" }, (err, genre) => {
    return genre;
  });
  if (!noneGenre) {
    noneGenre = new Genre({ name: "None" });
    noneGenre.save();
  }
  Beat.updateMany(
    { genre: { _id: req.body.id } },
    { $set: { genre: noneGenre } },
    err => {
      if (err) return res.status(400).json({ success: false, err });

      Genre.deleteOne({ _id: req.body.id }, err => {
        if (err) return res.status(400).json({ success: false, err });

        res.status(200).send({ success: true });
      });
    }
  );
});

//-----------------------------
//           Users
//-----------------------------

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
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

app.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    let duplicate = false;

    user.cart.forEach(item => {
      if (item.id == req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      res.status(200).json(req.user.cart);
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.body.productId)
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });

          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.post("/api/users/getCartDetails", auth, (req, res) => {
  const cart = req.body;
  const ids = cart.map(item => item.id);

  Beat.find({ _id: { $in: ids } })
    .populate("artist")
    .populate("genre")
    .exec((err, docs) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send(docs);
    });
});

app.post("/api/users/removeFromCart", auth, (req, res) => {
  const itemId = req.body.id;

  User.findByIdAndUpdate(
    req.user._id,
    { $pull: { cart: { id: mongoose.Types.ObjectId(itemId) } } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      const ids = user.cart.map(item => item.id);

      Beat.find({ _id: { $in: ids } })
        .populate("artist")
        .populate("genre")
        .exec((err, docs) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).send(docs);
        });
    }
  );
});

app.post("/api/users/update-profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).json({ success: true });
    }
  );
});

//-----------------------------
//           Files
//-----------------------------

app.post("/api/users/upload-files", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
        original_filename: req.files.file.name
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

app.get("/api/users/remove-file", auth, admin, (req, res) => {
  let public_id = req.query.public_id;

  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      return res.json({
        success: false,
        error
      });
    }
    res.status(200).send("Success");
  });
});

const stripe = new stripeLoader(process.env.STRIPE_SECRET_KEY);

const charge = (token, amount) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: "usd",
    source: token.id,
    description: "Statement Description"
  });
};

app.post("/api/stripe-payment", auth, async (req, res) => {
  try {
    console.log(req.body);
    let data = await charge(req.body.token, req.body.amount);
    console.log(data);
    res.send("Charged!");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

app.post("/api/users/order-success", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  // USER HISTORY
  req.body.cartDetails.forEach(item => {
    history.push({
      dateofPurchase: Date.now(),
      name: item.name,
      artist: item.artist.name,
      id: item._id,
      price: item.price,
      paymentId: req.body.paymentData.paymentID
    });
  });

  transactionData.user = {
    id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.status(400).json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });

        let beats = [];

        doc.product.forEach(item => {
          beats.push(item.id);
        });

        async.eachSeries(
          beats,
          (id, callback) => {
            Beat.updateOne(
              { _id: id },
              { $inc: { sold: 1 } },
              { new: false },
              callback
            );
          },
          err => {
            if (err) return res.status(400).json({ success: false, err });

            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: []
            });
          }
        );
      });
    }
  );
});

//-----------------------------
//           Site
//-----------------------------

app.get("/api/site/site-info", (req, res) => {
  Site.find({}, (err, sites) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(sites[0]);
  });
});

app.post("/api/site/site-info", auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: "Site" },
    { $set: { siteInfo: req.body.siteInfo, promotion: req.body.promotion } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });

      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo
      });
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
