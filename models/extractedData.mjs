import mongoose from 'mongoose';

const darknetSchema = new mongoose.Schema({
  hashID: String,
  crawled_at: String,
  web_info: {
    url: String,
    title: String,
    description: String,
    query_parameters: Object,
    content: String,
    page: String,
    links: [String],
  },
  financial_entity: {
    btc_wallets: [String],
    eth_wallets: [String],
  },
  person_entity: {
    emails: [String],
    usernames: [String],
  },
});

const DarknetData = mongoose.model('DarknetData', darknetSchema);

export const searchDarknet = async (req, res) => {
  const { query } = req.query;

  if (!query)
    return res.status(400).send({ error: 'Query parameter is required.' });

  try {
    const results = await DarknetData.find({ $text: { $search: query } });
    res.send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
