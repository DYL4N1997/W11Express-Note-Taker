const fs = require("fs");

// initialising express
const app = express();
const PORT = process.env.PORT || 4000;

// listen for sever
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});