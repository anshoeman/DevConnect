const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors')
const path = require('path')
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());





app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

//Serve Static assests in productions
if(process.env.NODE_ENV ==='production'){
 app.use(express.static('client/build'))
 app.get('*',(req,res)=>{
   res.sendFile(path.resolve(__dirname,'client','build','index.html'))
 }) 
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
