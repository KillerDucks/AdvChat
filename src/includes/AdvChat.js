// Require in needed standard modules
const net = require("net");
// Event Streamer to connect to the EventBroker
const EventStreamer = require('estreamer');
// DBDriver for access to the Prototypes
const DBDriver = require("./DB_Driver");
// DBAL_Storage to handle the DB for Storage context
const DBAL_Storage = require("./Storage/Database.ext");
// Socks to handle all of the Sockets
const AdvSocket = require("./Socks/AdvSocket");
const SockHandler = require("./Socks/SocketHandler").SimpleSocks;

// Require in Parsers
const DataParser = require("./Parsers/DataParser.ext");


// [Class] This is the main class for the AdvChat Server
class AdvChatServer
{
    constructor(_EventServer = {Host: "", Port: 0}, _DBConnection = new DBDriver, _Config = {Port: 0})
    {
        // Create an empty Config Object [TODO] Allow the Config from the Class init
        this.Config = {};
        // Event Broker Connection info
        (_EventServer.Host == 0 || _EventServer == undefined) ? this.Config.Events = undefined : this.Config.Events = _EventServer;
        // Call the Create Server Method
        this._CreateServer();
        // Socks Handler
        this.Socks = new SockHandler();
        // Do not change this value {Docs:[Core/Mods/Debugging]}
        this.ModuleSeeker_Value = "AdvChat_ABC_123";
        // Setup Storage
        // Call the Event Broker connection method
        // this._Connect2EventBroker(); [TODO] Uncomment after DB testing
    }

    // [Internal Function] Creates a TCP Server
    _CreateServer()
    {
        this._SocketSrv = net.createServer()
                            .on("connection", this._ConnectionHandler.bind(this))
                            .on("close", this._ConnectionCloseHandler.bind(this))
                            .on("error", this._ConnectionErrorHandler.bind(this));
        // Change the socket Host as it wont bind to * connections
        this._SocketSrv.listen(9090, "127.0.0.1");
    }

    // [Internal Function] Handle the Connection
    _ConnectionHandler(socket)
    {
        // Create Socket Object
        const x = new AdvSocket(socket, (DataParser != undefined) ? {Func: DataParser, Obj: this} : undefined);
        this.Socks.Add(x);
        setInterval(x._TimeoutWrite.bind(x), 1000);
    }

    // [Internal Function] Handle the Connection Error
    _ConnectionErrorHandler(err)
    {
        console.error(err);
        this._SocketSrv.end();
        this._SocketSrv.destroy();
    }

    // [Internal Function] Handle the Connection Close
    _ConnectionCloseHandler()
    {
        console.info(`Socket has Closed`);
        this._SocketSrv.end();
        this._SocketSrv.destroy();
    }

    // [Internal Function] This function will try to connect to the Event Broker
    _Connect2EventBroker()
    {
        // [TODO] Check for connections that fail
        this.EventBroker = (this.Config.Events == undefined) ? new EventStreamer("127.0.0.1", 7070) : new EventStreamer(this.Config.Events.Host, this.Config.Events.Port);
    }
}



module.exports = AdvChatServer;