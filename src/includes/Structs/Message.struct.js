// [Structure] This is a simple Message Structure [TODO] Move to another file
class Message
{
    constructor(_msg = {
        id: 0,        
        Author: "",
        Reply: {
            User: ""    
        },
        Message: "",
        Embed: {}
    })
    {
        this._msg = _msg;
        this._msg.Timestamp = Date.now();
    }

    GetMsg()
    {
        return this._msg;
    }

    UpdateMsg(data)
    {
        this._msg = data;
    }
}

module.exports = Message;