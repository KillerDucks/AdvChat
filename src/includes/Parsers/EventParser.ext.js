const Message = require("../Structs/Message.struct");
const SockMsg = require("../Structs/SockMsg.struct");
const EventMsg = require("../Structs/Event.struct");

const AdvServer = require("../AdvChat");
const AdvSocket = require("../Socks/AdvSocket");

// Handle All of the Event Messages
function Parser(msg = new EventMsg()._msg, AdvChat = new AdvServer(), AdvSock = new AdvSocket())
{
    switch(msg.Type)
    {
        case "Sub":
            // Subscribe the Client to the Chosen Topic/Subtopic
            Subscribe(msg, AdvSock);
            break;

        case "Pub":
            // [TODO] Look into this Type possibly not needed/used
            
            // Publish the Clients Message to the Chosen Subtopic of a Main Topic
            // Publish(msg, AdvSock);
            break;
    }
}

function Subscribe(topic = new EventMsg()._msg, AdvSock = new AdvSocket())
{
    // Check First if the Client is Subscribed to the Main topic (Aka The Chat Server)
    if(!AdvSock._Subscriptions.includes(topic.Topic))
    {
        // [TODO] Look into this as it may allow any client to sub to any server

        // The Client is not subscribed to the main topic so subscribe the AdvSocket
        topic.SockID = AdvSock._UUID; // [TODO] This Emit isn't needed maybe remove
        AdvSock._Event.emit("subscribe", topic);
        // Push the Topics on the Subscriptions Array
        AdvSock._Subscriptions.push(topic.Topic);
        console.info(`[${AdvSock._UUID}] has subscribed to => [${topic.Topic}]`);
        if(topic.Subtopic != "")
        {
            AdvSock._Subscriptions.push(`${topic.Topic}${topic.Subtopic}`);
            console.info(`[${AdvSock._UUID}] has subscribed to => [${topic.Topic}${topic.Subtopic}]`);
        }
    }
}

function Publish(topic = new EventMsg()._msg, AdvSock = new AdvSocket())
{
    // Emit the Publish Event
}

module.exports = Parser;