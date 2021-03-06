import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const recoveryLogSchema = new Schema({
  country_code: {
    type: String,
    required: true,
  },
  country_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  IPv4: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  recoveryToken: {
    type: String,
    required: true,
  },
  requestedOn: {
    type: Date,
    required: true,
  },
  recoveredOn: {
    type: Date,
    required: false,
  },
  exp: {
    type: Date,
    required: false,
  },
});

const accessLogSchema = new Schema({
  country_code: {
    type: String,
    required: true,
  },
  country_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  IPv4: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  accessOn: {
    type: Date,
    default: new Date(),
  },
});

const client = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  recoveryLogs: [recoveryLogSchema],
  accessLogs: [accessLogSchema],
});

client.query.byEmail = function (email) {
  return this.where({ email: email, active: true });
};

export default mongoose.models.Client || mongoose.model('Client', client);
