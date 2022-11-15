import {google} from 'googleapis'

export async function getQuotes(id:string){
  const spreadsheetId=process.env.SpreadsheetId;

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
    range:"2022!A3:Z"
  })  

  const rowByID= rows.data.values.filter((row)=>row[0]===id)
  console.log(rowByID)

}



