require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

console.log("JWT_SECRET loaded :", Boolean(process.env.JWT_SECRET))

app.listen(PORT, () => {
  console.log(`Doorstep Backend Server running on port ${PORT}`);
});
