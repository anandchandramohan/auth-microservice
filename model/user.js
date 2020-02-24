const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
      },
      resetPasswordToken: {
        type: String,
        required: false
      },
      resetPasswordExpires: {
        type: Date,
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
const blacklistFields = ['password', 'resetPasswordToken', 'resetPasswordExpires'];
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
  userSchema.methods.generatePasswordReset = function() {
    console.log("Reset password token");
    console.log(crypto.createHash('sha256').digest('hex'));
    this.resetPasswordToken = crypto.createHash('sha256').digest('hex');
    this.resetPasswordExpires = Date.now() + 3*3600000; //expires in 3 hous
  };

module.exports = connection.model("user", userSchema);