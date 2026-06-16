module.exports = function handler(req, res) {
  res.json({
    key: process.env.PUSHER_KEY || null,
    cluster: process.env.PUSHER_CLUSTER || null,
  });
};
