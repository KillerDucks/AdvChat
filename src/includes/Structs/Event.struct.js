// [Structure] This is a simple Event Object Structure
class EventMsg
{
    constructor(_msg = {
        Topic: "",
        Subtopic: "",
        Type: ""
    })
    {
        this._msg = _msg;
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

module.exports = EventMsg;