const responseResolver = (req, res, next) => {
  if (req.header('API-Request')) {
    res.resolve = (err, data) => {
      if (err) res.status(400).json({ error: err });
      else res.json(data);
    }
  } else {
    res.resolve = (err, data) => {
      if (err) res.render('index', { err });
      else res.render('index', { err: false, data });
    }
  }
  next();
};

module.exports = { responseResolver };
