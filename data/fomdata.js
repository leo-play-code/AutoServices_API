import  { GoogleSpreadsheet } from 'google-spreadsheet';
import mongoose from "mongoose";
import creds from "./credentials.json" assert { type: "json" };
/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */
export async function getData(docID, sheetID, credentialsPath = './credentials.json') {
    const result = [];
    const doc = new GoogleSpreadsheet(docID);
    // const creds = require(credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    const rows = await sheet.getRows();
    // console.log('rows=',rows)
    const status_list = []
    const name_list = []
    const data_list = []
    for (const row of rows) {
        // result.push(row._rawData)
        const data = row._rawData;
        if (data.length>8){
            var status = row._rawData[0].toLowerCase().replaceAll(' ','')
            var name = row._rawData[2].toLowerCase().replaceAll(' ','')
            // color
            if (status.includes('pass')){
                status = 'green'
            }
            if (status.includes('fail') || status === ''){
                status = 'red'
            }
            if (status.includes('check')){
                status = 'purple'
            }
            // name
            if (NameObject.get(name) === undefined){
                name = NameObject.get('nobody')
            }else{
                name = NameObject.get(name)
            }
            
            const data = {
                    _id: new mongoose.Types.ObjectId(),
                    form: mongoose.Types.ObjectId('63c11c8ddbb00f0bf17aa0ab'),
                    creator: mongoose.Types.ObjectId(name),
                    data:{
                        "status":status,
                        "system":"Window",
                        "tester":mongoose.Types.ObjectId(name),
                        "time":row._rawData[1].replaceAll('\n','<br />'),
                        "testcasename":row._rawData[4].replaceAll('\n','<br />'),
                        "chinesedescription":row._rawData[5].replaceAll('\n','<br />'),
                        "title":row._rawData[6].replaceAll('\n','<br />'),
                        "systeminformation":row._rawData[7].replaceAll('\n','<br />'),
                        "description":row._rawData[8].replaceAll('\n','<br />'),
                        "informationlink":(row._rawData[9] !== undefined ?(row._rawData[9].replaceAll('\n','<br />')+'<br />'+row._rawData[3].replaceAll('\n','<br />')):"")
                    }
                }
            // console.log('data',data)
            data_list.push(data)
            // if (!status_list.includes(status)){
            //     status_list.push(status)
            // }
        }
    }


    console.log('status list = ',status_list)
    console.log('name list =',name_list)
    return data_list;
};





const NameObject = new Map([
    ["leo", "63c9dc2d2fd170fd2ff2ce27"],
    ["lanere", "63ca3c3b23d0db8e397ce754"],
    ["ray", "63ca3e5f23d0db8e397ce785"],
    ["chad","63d71dbec424e1f674f068c9"],
    ["wayne","63d71ae7c424e1f674f067e3"],
    ["xin","63d71b3dc424e1f674f067e9"],
    ["aurora","63d71b79c424e1f674f0683a"],
    ["sheila","63d71cdec424e1f674f0689e"],
    ["ready","63d71d25c424e1f674f068a1"],
    ["kira","63d71d97c424e1f674f068c4"],
    ["kephyr","63d71db2c424e1f674f068c7"],
    ["racpy","63d71df7c424e1f674f068cc"],
    ["zoe","63d71e59c424e1f674f068d0"],
    ["eddie","63d71f2bc424e1f674f068e3"],
    ["eric","63d720fec424e1f674f068e9"],
    ["guo","63d72159c424e1f674f068ee"],
    ["austin","63d71aa2c424e1f674f067e0"],
    ["terry","63d75d28c4e213f1ab470383"],
    ["alan","63d76c7342d2d4d7b029a58d"],
    ["mandy","63d76ca542d2d4d7b029a58e"],
    ["nobody","63d76ce842d2d4d7b029a58f"]
]);

