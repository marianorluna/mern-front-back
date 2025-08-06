import "./db.js";
import app from "./app.js";
import { PORT } from "./config.js";


// Start the server
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
