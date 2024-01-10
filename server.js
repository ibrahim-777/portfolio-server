import cors from 'cors';   //front-end can make request and response from server
import morgan from 'morgan'; //for middleware
import dotenv from 'dotenv'; //for process
import path from 'path';
import express from 'express'; //create server
import bodyParser from 'body-parser'; //for parsing to front end
import mongoose from 'mongoose'; //for data base
import multer from 'multer'; // used for file uploads.
import helmet from 'helmet';  ///security 
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postersRoutes from './routes/posters.js';
import ProjectsRoutes from './routes/projects.js';
import { register } from './controllers/auth.js';
import { createPoster } from './controllers/posters.js';
import { createProject } from './controllers/projects.js';
import { fileURLToPath } from 'url';
import { verifyToken } from './middleware/auth.js';
const __fileName = fileURLToPath(import.meta.url);
const __dirname =path.dirname(__fileName);
dotenv.config({path: path.join(__dirname, '.', '.env')});
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended: true }));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true }));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

const storage = multer.diskStorage({ 
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    // filename: filtername()
    filename: function(req,file,cb){
        cb(null,Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
});

const upload = multer({ storage }); 

app.post('/auth/register',upload.single("picture") , register)
app.post('/posters',verifyToken, upload.single("picture") ,createPoster )
app.post('/projects',verifyToken, upload.single("picture") ,createProject )
/*Routes*/
app.use('/auth',authRoutes);
app.use('/users',verifyToken,userRoutes);
app.use('/posters',verifyToken,postersRoutes)
app.use('/projects',verifyToken,ProjectsRoutes)
const port = process.env.PORT || 6001;
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.PASSWORD
  );
mongoose.connect(DB)
  .then(() =>{ console.log('DB successful')
    });
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
  process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });  