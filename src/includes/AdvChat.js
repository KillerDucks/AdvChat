// Require in needed modules
const net = require("net");
const EventStreamer = require('estreamer');
const DBDriver = require("./DB_Driver");
const AdvSocket = require("./Socks/AdvSocket");
const SockHandler = require("./Socks/SocketHandler").SimpleSocks;

// Require in Parsers
const ChatParser = require("./Extensions/ChatParser.ext");


// [Class] This is the main class for the AdvChat Server
class AdvChatServer
{
    constructor(_EventServer = {Host: "", Port: 0}, _DBConnection = new DBDriver, _Config = {Port: 0})
    {
        // Create an empty Config Object
        this.Config = {};
        // Event Broker Connection info
        (_EventServer.Host == 0 || _EventServer == undefined) ? this.Config.Events = undefined : this.Config.Events = _EventServer;
        // Call the Create Server Method
        this._CreateServer();
        // Socks Handler
        this.Socks = new SockHandler();
        this.test = "123"
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
        this._SocketSrv.listen(9090, "127.0.0.1");
    }

    // [Internal Function] Handle the Connection
    _ConnectionHandler(socket)
    {
        // Create Socket Object
        const x = new AdvSocket(socket, (ChatParser != undefined) ? {Func: ChatParser, Obj: this} : undefined);
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