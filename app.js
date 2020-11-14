const fs = require("fs");
const chalk = require("chalk")
// folosesc chalk ca sa colorez consola
const express = require("express"),
      app=express(),
      path = require("path"),
      bodyParser = require("body-parser");

// cerem claseele 
const Ui_consola = require("./ui_consola.js");
const Service = require("./service.js")
const Validator = require("./validator.js")

// declaram tot ce avem nevoie
let val = new Validator();
let srv = new Service();
let ui = new Ui_consola(val,srv);


//ui.run();



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

const PORT  = 3000;






app.get("/",(req,res)=>{
    //console.log(srv.print_data())
    res.render("main.ejs",{stocks:srv.print_data()})
})

app.get("/CMD",(req,res)=>{
    
    ui.run();
    res.redirect("/");
})


app.post("/add_stock",(req,res)=>{
    console.log("aicia");
    console.log(req.body.stock_name);
    console.log(req.body.stock_price);
    
    try{
        val.validate_uppercase(req.body.stock_name);
        val.validate_float(req.body.stock_price)
        console.log("am trecut de validari")
        srv.add_stock(req.body.stock_name,req.body.stock_price);
        console.log("am adaugat stockul")
        res.render("main.ejs",{stocks:srv.print_data(),error:false})
        //res.redirect("/");
    }catch(err)
    {
        console.log(err.message);
        res.render("main.ejs",{stocks:srv.print_data(),error:true,message:err.message})
    }

})

app.post("/filter_stocks",(req,res)=>{
    let order = req.body.order 
    try{
        val.validate_float(req.body.limit)
        if(order !="1" && order !="0")
            throw Error("Order must be 0 or 1")
        let stocks=srv.filter_stocks(req.body.limit,order);
        res.render("main.ejs",{stocks:stocks,error1:false});
    }catch(err)
    {
        res.render("main.ejs",{stocks:srv.print_data(),error1:true,message:err.message});
    }
})


// search barul il modific putin deoarece vreau ca daca caut
// A sa imi arate toate datele cu A
app.post("/search",(req,res)=>{
    console.log(req.body.search)
    let stocks = srv.print_data();
    let stocks_search=[]

    stocks.forEach((stock)=>{
        if(stock.name.includes(req.body.search.trim()))
            stocks_search.push(stock);
    })
    res.render("main.ejs",{stocks:stocks_search});

})


app.listen(PORT,()=>{
    console.log("listening on port 3000")
})
















