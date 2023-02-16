import  { GoogleSpreadsheet } from 'google-spreadsheet';
import GoogleSheet from '../models/GoogleSheet.js';


export const GetData = async(req,res) =>{
    try{
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const {docID,sheetID} = req.params;
        const doc = new GoogleSpreadsheet(docID);
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEET_CRED));
        await doc.loadInfo();
        const sheet = doc.sheetsById[sheetID];
        const rows = await sheet.getRows();
        const title = await sheet.headerValues
        const result = [title];
        for (const row of rows) {
            result.push(row._rawData)
        }
        res.status(201).json(result)
    }catch(error){
        res.status(404).json({error:error.message})
    }
}

export const GetAllList = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const Alllist = await GoogleSheet.find().lean();
        res.status(201).json(Alllist);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


export const GetSheetMap = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const {sheetID} = req.params;
        const googlesheet = await GoogleSheet.findOne({_id:sheetID})
        const doc = new GoogleSpreadsheet(googlesheet['docID']);
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEET_CRED));
        await doc.loadInfo();
        const sheetdict = await doc._rawSheets;
        const sheetlist = []
        for (const key in sheetdict){
            var tempdict = {}
            var sheet = await doc.sheetsById[key];
            var sheetname = sheet['_rawProperties']['title']
            tempdict['name'] = sheetname;
            tempdict['sheetID'] = key
            sheetlist.push(tempdict)
        }
        res.status(201).json({"data":sheetlist})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const DetectData = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const {docID,sheetID} = req.params;
        // const tempsheet = await GoogleSheet.find({docID:docID});
        try{
            var tempsheet = await GoogleSheet.find({docID:docID});
        }catch(error){
            console.log('error',error)
            var tempsheet = []
        }
        
        const doc = new GoogleSpreadsheet(docID);
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEET_CRED));
        await doc.loadInfo();
        if (tempsheet.length>0){
            res.status(201).json({error:"Doc Exists"})
        }else{
            res.status(201).json({"result":true})
        }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const SaveData = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const {docID,sheetID} = req.params;
        const doc = new GoogleSpreadsheet(docID);
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEET_CRED));
        await doc.loadInfo();
        const {name} = req.body;
        const newGoogleSheet = new GoogleSheet({
            name,
            docID
        })
        const saved = await newGoogleSheet.save();
        res.status(201).json(saved)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}