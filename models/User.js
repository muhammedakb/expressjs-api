const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Question = require("./Athlete");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "Please provide a password with min length : 6"],
    required: [true, "Please provide a password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  foot: {
    type: String,
  },
  position: {
    type: String,
  },
  place: {
    type: String,
  },
  tffnumber: {
    type: Number,
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  phone: {
    type: Number,
    minlength: [10, "Please provide a phone number with min length : 10"],
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

// UserSchmea Methods
UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    name: this.name,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

UserSchema.methods.getResetPasswordTokenFromUser = function () {
  const randomHexString = crypto.randomBytes(15).toString("hex");
  const { RESET_PASSWORD_EXPIRE } = process.env;

  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

  return resetPasswordToken;
};

// Kullanıcı oluşturulmadan hemen önce
// pre hooks ile password hash işlemini gerçekleştiriyoruz.
UserSchema.pre("save", function (next) {
  // Parola değişme
  if (!this.isModified("password")) {
    next();
  }

  //bcryptjs ile password hashleme
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      // Store hash in your password DB.
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

// Bir kullanıcı silindiğinde, onun sorularıda silinecek
UserSchema.post("remove", async function () {
  await Question.deleteMany({
    user: this._id,
  });
});

// users isimli collection oluşacak
module.exports = mongoose.model("User", UserSchema);
