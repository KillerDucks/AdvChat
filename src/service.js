// Require in needed modules
const AdvServer = require("./includes/AdvChat");
const DBDriver = require("./includes/DB_Driver");

// Create an instance of a Database Driver
const DB = new DBDriver("localhost", "AdvChat", "Chat", false, false, true);

// Create an instance of the Advanced Chat Server
const AdvChat = new AdvServer(undefined, DB);