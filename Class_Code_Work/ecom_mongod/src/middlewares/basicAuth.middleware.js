import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const base64Credentials = authHeader.replace("Basic ", "");
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  const users = UserModel.getAllUsers();
  const user = users.find(
    (u) => u.email === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    req.userId = nameToAlphabeticPositions(user.name);
    next();
  }
  //   next();
};

function nameToAlphabeticPositions(name) {
  // Convert the name to uppercase to handle 'A' through 'Z' consistently
  const uppercaseName = name.toUpperCase();
  const positions = [];

  for (let i = 0; i < uppercaseName.length; i++) {
    const char = uppercaseName[i];
    // Check if the character is a letter (A-Z)
    if (char >= "A" && char <= "Z") {
      // Get the ASCII value of the character and subtract 64
      // ('A' is 65, so 65 - 64 = 1)
      const position = char.charCodeAt(0) - 64;
      positions.push(position);
    }
    // Ignores spaces or other non-alphabetic characters
  }

  // Join the numbers with a hyphen for the final output
  return positions.join(":");
}
export default basicAuthorizer;
