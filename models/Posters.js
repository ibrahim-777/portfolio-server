import mongoose from "mongoose";
import moment from 'moment';
const posterSchema = mongoose.Schema(
  {
    title:String,
    description: String,
    picturePath: String,
    category:String,
    date:{
      type:String,
      default:moment().format('LL')
    }
  },
  { timestamps: true }
);
const posters = mongoose.model("Posters", posterSchema);
export default posters;