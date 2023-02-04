const express =require('express')
const cors=require('cors')
//excel reading and writing package
const excelReader=require('xlsx')


const app=express()

const whitelist = ["http://localhost:3000","https://csa-exam.onrender.com"]
const corsOptions = {
          origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
              callback(null, true)
            } else {
              callback(new Error("Not allowed by CORS"))
            }
          },
          credentials: true,
        }
app.use(cors(corsOptions))
//load excel file with all questions
 const file=excelReader.readFile('./csaExam.xlsx')

 //listening  to request
app.use('/',(req,res)=>{
    let data = []
    const sheets = file.SheetNames
    // convert to json 
    for(let i = 0; i < sheets.length; i++)
    {
       const temp = excelReader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
          data.push(res)
       })
    }
      
    // send  data
   
    res.json({
        status:200,
        data:data
    })
})


//create server 
app.listen((3333),()=>{
    console.log('server is running')
})
