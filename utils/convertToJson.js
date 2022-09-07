module.exports={
    convertCSV:async(base64)=>{
        const decodedBase64String = Buffer.from(base64, 'base64').toString();
        var lines=decodedBase64String.split("\n");
        var result = [];
        //var headers=lines[0].split(",");
        for(var i=1;i<lines.length;i++){
            var currentline=lines[i].split(",");
            console.log(currentline[0])
            if(currentline[0]!=''){
                let pass=currentline[3].split("\r")
                result.push({name:currentline[0],email:currentline[1],doj:currentline[2],password:pass[0]})
            }
      
        }
        return result
    }
}