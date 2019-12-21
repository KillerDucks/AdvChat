// [Structure] This is a simple Socket General Message Structure [TODO] Move to another file
class SockMsg
{
    constructor(_msg = {
        Status: 200,
        Data: 0
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