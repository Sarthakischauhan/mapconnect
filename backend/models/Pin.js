import mongoose from "mongoose";


const pinSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
    },
    title : {
        type : String,
        require : true,
        min : 3
    },
    desc : {
        type : String,
        require : true,
    },
    rating : {
        type : Number,
        require : true,
        min : 0,
        max : 5
    },
    lat : {
        type : Number,
        require : true,
    },
    long : {
        type : Number,
        require : true,
    }

},{ timestamps : true });

const pins = mongoose.model("pins",pinSchema);

export default pins;