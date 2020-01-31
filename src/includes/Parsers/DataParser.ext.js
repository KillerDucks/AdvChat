const Message = require("../Structs/Message.struct");
const SockMsg = require("../Structs/SockMsg.struct");
const EventMsg = require("../Structs/Event.struct");

const AdvServer = require("../AdvChat");
const AdvSocket = require("../Socks/AdvSocket");

// Parsers
const AdvParser = require("./ChatParser.ext");
const EvtParser = require("./EventParser.ext");

function Parser(msg = new SockMsg()._msg, AdvChat = new AdvServer(), AdvSock = new AdvSocket())
{
    // Handle All of the Data and then Pass to the appropriate Parser
    console.info(msg);
    // Assume the Message is in the Correct Format 
    // Switch on the Type
    switch(msg.Type)
    {
        case "AdvChat":
            AdvParser(msg, AdvChat, AdvSock);
            break;

        case "Event":
            EvtParser(msg.Data.Event, AdvChat, AdvSock);
            break;

        default:
            // No Parser Found
            console.info(`[AdvChat::Parser::Top]\t No Appropriate Parser Found !! Type [${msg.Type}]`);
            break;
    }
}

module.exports = Parser;