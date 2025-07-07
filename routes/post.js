const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/pinterest`)


const postData = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
    trim: true
  },
  image:{
    type:String,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
  ,
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: [],
    min: 0
  }
}, {
  timestamps: true  // adds createdAt and updatedAt automatically :contentReference[oaicite:1]{index=1}
});



module.exports= mongoose.model('post', postData);

