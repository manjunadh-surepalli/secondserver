const http=require("http")
const fs=require("fs")
const { json } = require("stream/consumers")
const server=http.createServer((req,res)=>{
    if(req.url=="/addproduct"){
       let data=fs.readFileSync("pages/senddata.html")
        res.end(data)
    }
    else if(req.url=="/add" && req.method=="POST"){
    //     req.on("data",(data)=>{
    //         let results=JSON.parse(data.toString())       
    //         console.log(results)
    //         let allproducts=fs.readFileSync("./data/product.json","utf-8")?
    //         JSON.parse((fs.readFileSync("./data/product.json","utf-8"))):
    //         []
    //         let isadded=allproducts.find(ele=>ele.name==results.name)
    //         if(isadded){
    //             allproducts.forEach(ele=>{
    //                 if(ele.name==results.name){
    //                     ele.quantity=`${Number(ele.quantity)+Number(results.quantity)}`
    //                 }
    //             })
    //         }else{
    //             allproducts.push(results)
    //         }
    //    fs.writeFileSync("./data/product.json",JSON.stringify(allproducts))
    //         console.log(allproducts)
    //         res.end(JSON.stringify({message:"product added"}))
    //         })
    req.on("data",(data)=>{
       let results=JSON.parse(data.toString())
        let allproducts=fs.readFileSync("./data/product.json","utf-8")? 
        JSON.parse(fs.readFileSync("./data/product.json","utf-8")):[]
        let isadded=allproducts.find(ele=>ele.mobile==results.mobile)
        if(isadded){
          res.end(JSON.stringify({message:"data alredy exists"}))
        }
        else{
        allproducts.push(results)
        }
        fs.writeFileSync("./data/product.json",JSON.stringify(allproducts))
        res.end(JSON.stringify({message:"data added"}))
           
    })
    }
    else if(req.url=="/update"){
        req.on("data",(data)=>{
            let results=JSON.parse(data.toString())
        let productdetails=JSON.parse(fs.readFileSync("./data/product.json","utf-8")) 
        let isindex=productdetails.findIndex((val)=>val.mobile==results.id)
        console.log(isindex)
        productdetails[isindex]={name:`${results.name}`,course:`${results.course}`,mobile:`${results.mobile}`}
        //  for(let i=0;i<productdetails.length;i++){
        //     console.log(productdetails.length)
        //      if(productdetails[i].mobile==results.id){
        //          productdetails[i].name=results.name;
        //          productdetails[i].course=results.course;
        //          productdetails[i].mobile=results.mobile;
        //          break;
        //      }
        //  }
        fs.writeFileSync("./data/product.json",JSON.stringify(productdetails))
         })
        res.end(JSON.stringify({message:"data updated"}))
    }
    else if(req.url=="/delete"){
        req.on("data",(data)=>{
          let results=JSON.parse(data.toString())
          let productdetails=JSON.parse(fs.readFileSync("./data/product.json","utf-8"))
        productdetails=productdetails.filter((ele,i)=>{
            if(productdetails[i].mobile!=results){
                return productdetails[i]
            }
        })
    fs.writeFileSync("./data/product.json",JSON.stringify(productdetails))
        })
        res.end(JSON.stringify({message:" data deleted"}))
    }
    else if(req.url=="/display"){
        let data=fs.readFileSync("./data/product.json","utf-8")
        res.end(data)
    }
    else if(req.url=="/home.css"){
        let data=fs.readFileSync("pages/home.css")
        res.end(data)
    }
    else{
        let data=fs.readFileSync("pages/home.html")
        res.end(data)
    }
})

server.listen(8000,()=>{
    console.log(`server is started at 8000`)
})