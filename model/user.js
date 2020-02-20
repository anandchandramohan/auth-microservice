const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const db = require("../db/connection.js");
const connection = db.getMongooseConnection();
var fields = {
     firstName: {
        type: String,
        required: true
      },
     lastName: {
        type: String,
        required: true
      },
     userName: {
        type: String,
        require: true,
        unique: true
     },
     primaryEmail: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: false
      }
};
const userSchema = mongoose.Schema(fields, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
const blacklistFields = ['password'];
userSchema.methods.toJSON = function toJSON() {
    const doc = this.toObject();
    blacklistFields.forEach((field) => {
      if (Object.hasOwnProperty.call(doc, field)) {
        delete doc[field];
      }
    });
    return doc;
  };
  
  userSchema.pre('save', function Save(next) {
    if (this.isNew || this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password);
    }
    next();
  });

  userSchema.methods.verifyPassword = function verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = connection.model("user", userSchema);