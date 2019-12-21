const Message = require("../Structs/Message.struct");
const SockMsg = require("../Structs/SockMsg.struct");
const EventMsg = require("../Structs/Event.struct");

const AdvServer = require("../AdvChat");
const AdvSocket = require("../Socks/AdvSocket");

function Parser(msg = new Message()._msg, AdvChat = new AdvServer(), AdvSock = new AdvSocket())
{
    advMsg = msg.Data.AdvChat;
    // Message Format Detection
    if(typeof(advMsg) != "object")
    {
        return;
    }

    // Command Detection
    if(advMsg.Message.substr(0, 1) == "!")
    {
        // Message is assumed to be a type of server command
        console.log(`[AdvChat]\t Command Received => ${advMsg.Message.substr(1, advMsg.Message.length)}`);
        ExecuteCommand(advMsg.Message.substr(1, advMsg.Message.length), AdvSock);

        // [Debug] Just to test events
        msg.Data.Event.SockID = AdvSock._UUID;
        AdvSock._Event.emit("subscribe", msg.Data.Event);
    }
}

function ExecuteCommand(command = "", AdvSock = new AdvSocket())
{
    // Obj to hold all of the commands
    let Commands = {};
    // Create the Abs path
    let cmdPath = require("path").join(__dirname, "");
    // Split the path
    let x = cmdPath.split('/');
    // Pop off the folder 
    x.pop();
    // Join array and add the correct folder
    cmdPath = x.join("/") + "/Global_Commands";
    require("fs").readdirSync(cmdPath).forEach(function(file) {
        Commands[file.split('.')[0]] = require(cmdPath + "/" + file);
    });

    if(command in Commands)
    {
        // Command Found execute then send a response

        let result = Commands[command]();
        let msg = new Message({id: 0, Author: "AdvChat", Reply: 0, Message: `${result}`, Embed: 0});
        let sMsg = new SockMsg({Status: 200, Data: {
            AdvChat: msg.GetMsg(),
            Event: 0
        }});
        AdvSock.Push(sMsg.GetMsg());
    }
    else
    {
        // Command not found send a response
        let msg = new Message({id: 0, Author: "AdvChat", Reply: 0, Message: `The ${command} command is not found`, Embed: 0});
        let sMsg = new SockMsg({Status: 200, Data: {
            AdvChat: msg.GetMsg(),
            Event: 0
        }});
        AdvSock.Push(sMsg.GetMsg());
    }
}


module.exports = Parser;