module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    hasMongoUri: Boolean(process.env.MONGO_URI),
  });
};
