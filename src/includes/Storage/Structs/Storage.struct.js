// [Structure] This is a simple Storage Object Structure
class StorageMSG
{
    constructor(_msg = {
        ID: "",
        Owner: "",
        Data: ""
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

module.exports = StorageMSG;