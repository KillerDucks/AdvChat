const DBDriver = require("../DB_Driver");

// Structs
const StorageMSG = require("./Structs/Storage.struct");

/**
 *
 * @summary This is a DataBase Abstraction Layer this abstracts the db into the context of storage for AdvChat
 * @class DBAL_Storage
 */
class DBAL_Storage
{
    constructor(_DBDriver = new DBDriver)
    {
        (_DBDriver != undefined || _DBDriver != "") ? this.DBDriver = _DBDriver : this.DBDriver = false;
        // Add something here maybe
        // [TODO] Possible Init methods
    }

    // [Internal Function] Creates UUID's
    _UUID() 
    {
        return 'Sock-xyxxx-xxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // [Internal Function] Test DB Connection/Status
    _CheckStorage()
    {
        // [TODO] IMPI
    }

    // [External Function] Store
    Store(data = {})
    {
        // Check if the Data is a type of object
        switch (typeof(data)) {
            case "object":
                // Cast this into a Storage Object and Store into the Provider
                if(this.DBDriver)
                {
                    this.DBDriver.InsertRow(new StorageMSG({ID: this._UUID(), Owner:"Debugger", Data: data})._msg, () => {
                        // Callback if needed
                    });
                }
                break;
            case "string":
                // first check if this is a stringified JSON object
                if(data.substring(0, 1) == "{")
                {
                    let dataObj = 0;
                    // Assume this is a JSON object and try to parse it
                    try {
                        dataObj = JSON.parse(data);
                        // Cast this into a Storage Object and Store into the Provider
                        if(this.DBDriver)
                        {
                            this.DBDriver.InsertRow(new StorageMSG({ID: this._UUID(), Owner:"Debugger", Data: dataObj})._msg, () => {
                                // Callback if needed
                            });
                        }
                    } catch (error) {
                        // [TODO] Handle the error somehow
                    }
                }
                break;
        }
    }

    // [External Function] Retrieve
    Retrieve(id = "", Handler)
    {
        this.DBDriver.GetSingleRow(id, Handler);
    }
}

module.exports = DBAL_Storage;