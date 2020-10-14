const responseResolver = (req, res, next) => {
  if (req.header('API-Request')) {
    res.resolve = (err, data) => {
      if (err) res.status(httpCode(err)).json({ error: err });
      else res.json(data);
    }
  } else {
    res.resolve = (err, data) => {
      if (err) res.status(httpCode(err)).render('index', { err });
      else res.render('index', { err: false, data });
    }
  }
  next();
};

const httpCode = (err) => {
  let code;
  switch (err) {
    case 'Unknown route':
      code = 404;
      break;
    case 'Project not found':
      code = 404;
      break;
    case 'Invalid issue data provided':
      code = 400;
      break;
    default:
      code = 200;
  }
  return code;
}
module.exports = { responseResolver };
