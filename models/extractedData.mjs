const extractedDataSchema = new mongoose.Schema(
  {
    'hash-ID': { type: String, required: true, unique: true },
    crawled_at: { type: Date, required: true },
    web_info: {
      url: { type: String, required: true },
      title: { type: String },
      description: { type: String },
      query_parameters: { type: Map, of: String },
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
      tox_ids: [String],
      ssi: [String],
      phone_number: [String],
    },
  },
  { timestamps: true }
);

extractedDataSchema.index({
  'web_info.title': 'text',
  'web_info.description': 'text',
  'web_info.content': 'text',
  'person_entity.emails': 'text',
  'person_entity.usernames': 'text',
  'person_entity.phone_number': 'text',
});

const ExtractedData = mongoose.model('ExtractedData', extractedDataSchema);
export default ExtractedData;
