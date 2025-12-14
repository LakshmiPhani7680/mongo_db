import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  console.log("JWT Middleware Invoked", req.cookies);
  const { jwtToken } = req.cookies;
  console.log("Extracted JWT Token:", jwtToken);
  if (!jwtToken) {
    return res.status(401).json({ success: false, msg: "login to continue" });
  }
  jwt.verify(jwtToken, "secretkey", (err, decoded) => {
    if (err) res.status(401).json({ success: false, msg: "login to continue" });
    else {
      const userPayload = decoded;
      req.userId = userPayload.userId;
      next();
    }
  });
};

export default jwtAuth;
