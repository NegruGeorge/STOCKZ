const { getHeapStatistics } = require("v8");

fs = require("fs");

// am facut repo si service in acelasi loc pentru ca nu am foarte multe date
class Service
{
    constructor()
    {
        this.json = fs.readFileSync("json.json");
        this.dataJson = this.json.toString();
        this.data = JSON.parse(this.dataJson);
    }
  
    
    print_data()
    {
        return this.data
    }

    

    search_stock(name)
    {  
        
        
        for(let i=0;i<this.data.length;i++)
        {
            if(this.data[i].name ===name){
                //console.log("aicia");
                return this.data[i].price
            }
        }

        throw Error("We dont have this stock in databse :(");        

    }

    filter_stocks(price,order)
    {
        let pr = parseFloat(price)
        let stocks=[];
        this.data.forEach((stock)=>{
            if(order==="1"){
                if(parseFloat(stock.price)>=pr)
                {
                    // console.log(pr)
                    // console.log(stock.price)
                  
                    stocks.push(stock);
                }
            }
            else
                if(parseFloat(stock.price)<=pr)
                    stocks.push(stock);
        })

        if(stocks.length===0)
            throw Error("We dont have stocks in this price interval")


        // functie care ia 2 parametrii a si b care reprezinta cate un stock(nume si pret) si verifica dupa pret cand face sortarea
        stocks.sort(function(a,b){return parseFloat(a.price) - parseFloat(b.price)})

        return stocks;
    }
    

    add_stock(name,price)
    {
        this.data.forEach((stock)=>{
            if(stock.name ===name)
                throw Error("this stock already exists");
        })

        let stock ={
            name: name,
            price: parseFloat(price)
        }

       // console.log(stock);
        this.data.push(stock)
       
        //console.log(this.data);

        const dJson = JSON.stringify(this.data);
        fs.writeFileSync("json.json",dJson);

    }


}


// let ser = new Service();
// console.log(ser.search_stock("AAPL"));

module.exports = Service;