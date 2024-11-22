import mongoose from 'mongoose';

// Define the ExtractedData schema
const extractedDataSchema = new mongoose.Schema(
  {
    'hash-ID': { type: String, required: true, unique: true },
    crawled_at: { type: Date, required: true },
    web_info: {
      url: { type: String, required: true },
      title: { type: String },
      description: { type: String },
      content: { type: String },
      links: [{ type: String }],
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
      phone_number: [String],
      ssi: [String],
    },
  },
  { timestamps: true }
);

// Adding a text index to support full-text search
extractedDataSchema.index({
  'web_info.title': 'text',
  'web_info.description': 'text',
  'web_info.content': 'text',
});

const ExtractedData = mongoose.model('ExtractedData', extractedDataSchema);

export default ExtractedData;
