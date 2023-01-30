import mongoose from "mongoose";
import { getData } from './fomdata.js';






// const userIds = [
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
//     new mongoose.Types.ObjectId(),
// ];


// export const formdata = [
//     {
//         _id: new mongoose.Types.objectId(),
//         form:"buglist",
//         creator: "User Model foreign key",
//         data:{
//             "System":"MacOS",
//             "Time":"2022/12/30",
//             "Test Case Name":"test1",
//             "中文描述":"用於測試",
//             "Title":"Title 測試",
//             "System Information":"Monitor: U2422H\n",
//             "Description":"English description",
//             "Information Link":"Information Link Test"
//         }
//     }
// ]



export const GetFormData = async() =>{
    const resp = await getData('1lz5_74N477kQLJsv80-k98mV5m9t-6f7PirnM3XRH5k', '131297436');
    return resp
}

export const formmodel = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Buglist",
        selectdata:{
            "monitor":{
                "label":"Monitor",
                "sx":{},
                "initvalue":"",
                "usage":"copy",
                "field":"searchselect",
                "fulldata":['U2422H','U2722DE']
            },
            "fw":{
                "label":"FW",
                "sx":{},
                "initvalue":"",
                "usage":"copy",
                "field":"searchselect",
                "fulldata":['M3B102']
            },
            "inputsource":{
                "label":"Input Source",
                "sx":{},
                "initvalue":"",
                "usage":"copy",
                "field":"searchselect",
                "fulldata":['C to C']
            },
            // relation = 關聯選單, {a:[],b:[]}
            "PC": {
                "relation":"schema-system",
                "label":"PC",
                "sx":{},
                "initvalue":"",
                "usage":"copy",
                "field":"searchselect",
                "fulldata":
                {
                    "Window":["Window10 pro"],
                    "MacOS":[
                        "non-M1 Mac Pro 2019",
                        'non-M1 MacBook Pro(13" 2019)',
                        'M1 MacBook Pro (13", 2020)',
                        "Mac Mini (M1, 2020)",
                        "M1 MacBook Air (2020)",
                        'non-M1 MacBook Pro(13" 2020)',
                        'non-M1 MacBook Air',
                        "non-M1 Mac Mini 2018",
                        'M1-Pro MacBook Pro (2020)',
                        "M1 MacBook Air (2020, OS13)",
                        'M2 MacBook Pro (13", 2022)',
                        "M1-Max Mac Studio",
                        'non-M1 MacBook Pro(13" 2017)',
                        'non-M1 MacBook Pro(16" 2019)'
                    ]                    
                }
            },
            "osversion":{
                "relation":"selectdata-PC",
                "label":"OS version",
                "sx":{},
                "initvalue":"",
                "usage":"copy",
                "field":"searchselect",
                "fulldata":{
                    "Window10 pro":[],
                    "non-M1 Mac Pro 2019":['10.15.5','11.2.1','11.4','11.5','11.6','12.0.1','12.1','12.2'],
                    'non-M1 MacBook Pro(13" 2019)':['10.14','11.2.3'],
                    'M1 MacBook Pro (13", 2020)':['11.7.1','11.6.8','12.4','12.5',"13.0"],
                    "Mac Mini (M1, 2020)":['11.4','11.6','12.0.1','12.4','12.6'],
                    "M1 MacBook Air (2020)":['11.5.2','11.3','12.0.1'],
                    'non-M1 MacBook Pro(13" 2020)':['10.15.6','11.3 Beta','11.6.3','12.3.1','12.5','13.0'],
                    'non-M1 MacBook Air':['10.15.7','11.5.2','12.4','12.5','11.7'],
                    "non-M1 Mac Mini 2018":['10.15.7','11.2.3','11.6.4','12.0.1','13.0'],
                    'M1-Pro MacBook Pro (2020)':['12.6','13.0','12.0.1','12.3'],
                    "M1 MacBook Air (2020, OS13)":['12.2.1','12.5','13.0','12.6'],
                    'M2 MacBook Pro (13", 2022)':['12.5.1','13.0','13 Beta'],
                    "M1-Max Mac Studio":['12.3','12.5.1','13 Beta'],
                    'non-M1 MacBook Pro(13" 2017)':['10.14','10.15'],
                    'non-M1 MacBook Pro(16" 2019)':['10.15.7','11.5.2']
                }
            },
            "ddmversion":{
                "label":"DDM version",
                "sx":{},
                "initvalue":"",
                "usage":"copy",
                "field":"searchselect",
                "fulldata":[]
            }
        },
        schema:{
            "status":{
                "label":"狀態",
                "type":"string",
                "initvalue":"",
                "required":true,
                "sx":{gridColumn:"span 2"},
                "multiline":false,
                "field":"select-color",
                "fulldata":{
                    "red":"fail (re open)",
                    "yellow":"client comments",
                    "green":"close & pass",
                    "blue":"ready for test",
                },
                "disabled":false,
            },
            "&:blank-0":{
                "sx":{gridColumn:"span 2"},
                "field":"blank"
            },
            "system":{
                "label":"System",
                "type":"string",
                "initvalue":"",
                "required":true,
                "sx":{gridColumn:"span 1"},
                "multiline":false,
                "field":"select",
                "fulldata":['Window','MacOS'],
                "disabled":false,
            },

            "time":{
                "label":"Time",
                "type":"string",
                "initvalue":"",
                "required":true,
                "sx":{gridColumn:"span 1"},
                "multiline":false,
                "field":"time",
                "auto":true,
                "disabled":true,
            },
            "tester":{
                "label":"Tester",
                "type":"string",
                "initvalue":"",
                "required":true,
                "sx":{gridColumn:"span 1"},
                "multiline":false,
                "field":"user",
                "auto":true,
                "disabled":true,
            },
            "testcasename":{
                "label":"Test Case Name",
                "type":"string",
                "initvalue":"",
                "required":true,
                "sx":{gridColumn:"span 1"},
                "multiline":false,
                "field":"searchselect",
                "fulldata":[],
                "disabled":false,
            },
            "chinesedescription":{
                "relation":"schema-system",
                "label":"中文描述",
                "type":"string",
                "initvalue":{
                    "":"",
                    "MacOS":"[DDPM]",
                    "Window":"[DDM]",
                },
                "required":true,
                "sx":{gridColumn:"span 2"},
                "multiline":true,
                "rows":3,
                "disabled":{
                    "":true,
                    "MacOS":false,
                    "Window":false
                },
                "field":"text",
            },
            "title":{
                "relation":"schema-system",
                "label":"Title",
                "type":"string",
                "initvalue":{
                    "":"",
                    "MacOS":"[DDPM]",
                    "Window":"[DDM]",
                },
                "required":true,
                "sx":{gridColumn:"span 2"},
                "multiline":true,
                "rows":3,
                "disabled":{
                    "":true,
                    "MacOS":false,
                    "Window":false
                },
                "field":"text",
            },
            "systeminformation":{
                "label":"System Information",
                "type":"string",
                "initvalue":"",
                "required":true,
                "sx":{gridColumn:"span 4"},
                "multiline":true,
                "rows":5,
                "disabled":false,
                "field":"text",
            },

            "description":{
                "label":"Description",
                "type":"string",
                "initvalue":"1.\n2.\n3.\n4.\n\nResult:\nExpectation:",
                "required":true,
                "sx":{gridColumn:"span 4"},
                "multiline":true,
                "rows":8,
                "disabled":false,
                "field":"text",
            },
            "informationlink":{
                "label":"Information Link",
                "type":"string",
                "initvalue":"",
                "required":false,
                "sx":{gridColumn:"span 4"},
                "multiline":true,
                "rows":3,
                "disabled":false,
                "field":"ckeditor",
            },
        },
    }

]

