const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Customer",
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 100,
    required: true,
  },
  image: {
    type: String,
    default: "customer.png",
  },
});

customerSchema.methods.generateToken = function () {
  const data = {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    image: this.image,
  };
  const token = jwt.sign(
    data,
    process.env.MenuHub_Private_Key || config.get("API_Private_Key")
  );
  return token;
};

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(6).max(100).required(),
    image: Joi.string().default("customer.png"),
  });

  return schema.validate(customer);
}

function validateCustomerUpdate(waiter) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phoneNumber: Joi.string().required(),
  });
  return schema.validate(waiter);
}

exports.validate = validateCustomer;
exports.Customer = Customer;
exports.validateCustomerUpdate = validateCustomerUpdate;
