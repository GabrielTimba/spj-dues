import {Router} from 'express';
import {google} from 'googleapis'

const routes=Router();

const spreadsheetId="1R7gjKSYlSqFptQlxqjF89gDcKWEDSbdq0z1Y_SbL5P8"

routes.get("/",(req,res)=>{
  return res.status(200).json({hello:"world dues 2"})
})

routes.get("/dues",async (req,res)=>{
  const auth= new google.auth.GoogleAuth({
    keyFile:"./secrets.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
  })

  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of google sheets API
  const googleSheets= google.sheets({version:"v4",auth:client});

  //Read Rows from spreadSheets
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range:"Sheet1"
  })

  return res.json(rows.data)
})

export {routes};