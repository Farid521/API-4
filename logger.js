const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const ip = req.ip;
  const time = new Date().getFullYear();
  console.log(`[${time}] ${method} ${url} ${ip}`);
  next();
};

module.exports = logger;
