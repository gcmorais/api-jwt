const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, "secret");
    const { id } = decoded;

    request.userId = id;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Token invalid" });
  }
};
