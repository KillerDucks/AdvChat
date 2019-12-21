// [Structure] This is a simple Event Object Structure
class SockMsg
{
    constructor(_msg = {
        Topic: "",
        Subtopic: ""
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

module.exports = SockMsg;