import  { GoogleSpreadsheet } from 'google-spreadsheet';

export const GetData = async(req,res) =>{
    try{
        res.setHeader("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const {docID,sheetID} = req.params;
        const doc = new GoogleSpreadsheet(docID);
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEET_CRED));
        await doc.loadInfo();
        const sheet = doc.sheetsById[sheetID];
        const rows = await sheet.getRows();
        var count = 0;
        const result = [];
        for (const row of rows) {
            result.push(row._rawData)
        }
        res.status(201).json(result)
    }catch{
        res.status(404).json({error:error.message})
    }
}