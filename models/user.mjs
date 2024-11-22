import mongoose from 'mongoose';

// The User model
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User = mongoose.model('User', userSchema);

// The ExtractedData model
const extractedDataSchema = new mongoose.Schema(
  {
    'hash-ID': { type: String, required: true, unique: true },
    crawled_at: { type: Date, required: true },
    web_info: {
      url: { type: String, required: true },
      title: { type: String },
      description: { type: String },
      query_parameters: { type: Map, of: String }, // To store query parameters
      content: { type: String },
      links: [{ type: String }], // List of other URLs found
    },
    financial_entity: {
      btc_wallets: [String],
      eth_wallets: [String],
      credit_cards: {
        visa: [String],
        mastercard: [String],
        amex: [String],
        discover: [String],
      },
    },
    person_entity: {
      emails: [String],
      usernames: [String],
      tox_ids: [String],
      ssi: [String],
      phone_number: [String],
    },
  },
  { timestamps: true }
);

const ExtractedData = mongoose.model('ExtractedData', extractedDataSchema);

// Named exports
export { User, ExtractedData };
