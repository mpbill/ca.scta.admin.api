
let arrayToObject=function (arr) {
    // console.log(arr);
    let obj={};
    for(let i=0;i<arr.length;i++){
        let item=arr[i];
        obj[item._id.toString()]=item;
    }
    return obj;
};
module.exports=arrayToObject;