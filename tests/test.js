const SocketClient = require("estreamer");
const Sock = new SocketClient("127.0.0.1", 9090);

const Message = require("../src/includes/Structs/Message.struct");
const SockMsg = require("../src/includes/Structs/SockMsg.struct");
const EventMsg = require("../src/includes/Structs/Event.struct");

Sock._Sock.on("data", (data) => {
     // Handle Incoming Events
     try {
        let e = JSON.parse(data);
        console.log(e);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});

function Write(data)
{
    if(typeof(data) == "object")
    {
        Sock._Sock.write(`\n${JSON.stringify(data)}`);
    }
    else
    {
        Sock._Sock.write(`\n${data}`);
    }
}

function SendSampleEvent()
{
    let sMsg = new SockMsg({Status: 200, Type: "Event", Data: {
        Event: new EventMsg({
            Topic: "AdvChat",
            Subtopic: ">Developers",
            Type: "Sub"
        })._msg
    }});
    console.log(sMsg.GetMsg());
    Write(sMsg.GetMsg());
}

function SendSampleMessage(message)
{
    let msg = new Message({id: 0, Author: "KillerDucks", Reply: 0, Message: message, Embed: 0});
    let sMsg = new SockMsg({Status: 200, Type: "AdvChat", Data: {
        AdvChat: msg.GetMsg(),
        Event: new EventMsg({
            Topic: "AdvChat",
            Subtopic: ">Developers"
        })._msg
    }});
    console.log(sMsg.GetMsg());
    Write(sMsg.GetMsg());
}

SendSampleEvent();
SendSampleMessage("Okay Boomer");

/**
 * Login();
 * Refresh();
 * 
 * Subscribe(); // IF needed
 * Check_Subs();
 * 
 * // Send a Message [Sender]
 * Publish(message);
 * 
 * // Send a Message [Recipient]
 * AdvChatServer -> PublishEvent();
 * Client <- Get the Event via the Event Stream
 */