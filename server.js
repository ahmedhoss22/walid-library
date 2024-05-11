const express =require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require("./routes/index.route")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors");

//Database conncetion
 function dbConnection(){
    const url =process.env.DB_URL
    mongoose.connect(url)
    .then(()=>{
        console.log("DB Connected !!");
    })
    .catch((err)=>{
        console.log(err);
        console.log("DB Not Connected");
    })
}
 
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  
  app.options("*", cors());
   



  app.get('/pdf', async (req, res) => {
    try {
      const { pdfUrl } = req.query;
      const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      res.set('Content-Type', 'application/pdf');
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('Error fetching PDF');
    }
  });







  app.use("/api/images" , express.static("./uploads"))
  app.use("/api",routes)













app.all("*",(req,res)=>{
    res.status(404).send({message:"Invalid Route"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    dbConnection()
    console.log(`Server is Running ${PORT}`);
})