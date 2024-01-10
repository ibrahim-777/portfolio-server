import mongoose from "mongoose";
import moment from 'moment';
const projectSchema = mongoose.Schema(
  {
    title:String,
    description: String,
    picturePath: String,
    link:String,
    date:{
      type:String,
      default:moment().format('LL')
    }
  },
  { timestamps: true }
);
const projects = mongoose.model("Projects", projectSchema);
export default projects;