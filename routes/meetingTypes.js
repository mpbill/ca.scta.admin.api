/**
 * Created by mpbil on 4/12/2017.
 */
let express = require('express');
let router = express.Router();
let meetingTypeId=0;
let makeMeetingType=function (name,abbreviation) {
    meetingTypeId++;
    return {
        _id:meetingTypeId.toString(),
        name:name,
        abbreviation:abbreviation
    }
};
let bbt = makeMeetingType("Big Book Topic","BBT");
let bbs = makeMeetingType("Big Book Study","BBS");
let span = makeMeetingType("Spanish / Español","SPAN");
let wm = makeMeetingType("Women's Meeting","WM");
let spar = makeMeetingType("Speaker/Participation","SPAR");
let bm = makeMeetingType("Beginner's Meeting","BM");
let allTypes=[bbt,bbs,span,wm,spar,bm];
let allTypesMapped = {};
allTypes.forEach((i)=>allTypesMapped[i._id]=i);
router.get('/',function (req,res,next) {
    console.log(allTypesMapped);
    res.send(allTypesMapped);
});
module.exports=router;