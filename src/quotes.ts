import {google} from 'googleapis'

type QuoteType ={
  name:string,
  jan:number,
  feb:number,
  mar:number,
  apr:number,
  may:number,
  june:number,
  july:number,
  aug:number,
  sept:number,
  oct:number,
  nov:number,
  dec:number,
  total:number
}

export async function getQuotes(id:string): Promise<QuoteType>{
  const spreadsheetId=process.env.SpreadsheetId;

  const auth= new google.auth.GoogleAuth({
    keyFile:"./secrets.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
  })
  
  //Create client instance for auth
  const client = await auth.getClient();
  
  //Instance of google sheets API
  const googleSheets= google.sheets({ version:'v4'});
  
  //Read Rows from spreadSheets
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range:"2023!A3:Z"
  })  

  const rowByID= rows.data.values?.filter((row)=>row[0].toLocaleUpperCase()===id.toLocaleUpperCase())

  if(!rowByID){
    return <QuoteType>{}
  }
  
  let quote:QuoteType;

  quote=<QuoteType>{}
  
  rowByID?.forEach(item=>{
    quote.name=item[1]?item[1]:''
    quote.jan=item[2]?Number(item[2]):0
    quote.feb=item[3]?Number(item[3]):0
    quote.mar=item[4]?Number(item[4]):0
    quote.apr=item[5]?Number(item[5]):0
    quote.may=item[6]?Number(item[6]):0
    quote.june=item[7]?Number(item[7]):0
    quote.july=item[8]?Number(item[8]):0
    quote.aug=item[9]?Number(item[9]):0
    quote.sept=item[10]?Number(item[10]):0
    quote.oct=item[11]?Number(item[11]):0
    quote.nov=item[12]?Number(item[12]):0
    quote.dec=item[13]?Number(item[13]):0
    quote.total=Number(item[14])
  })

  return quote

}



