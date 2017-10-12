module.exports = (req, res, next) => {
  if (!req.user) {
    // if user doesnt exist stop execution and send status 401 unauthorized
    return res.status (401).send ();
  }

  next ();
};
