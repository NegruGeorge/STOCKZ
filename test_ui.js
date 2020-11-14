const readline = require("readline");

const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout


});


const Validator = require("./validator.js")
const Service =require("./service.js");



class Ui_consola
{
    validator;
    srv;
    constructor(validator,service)
    {
        this.validator = validator;
        this.srv = service;
        console.log(typeof srv)
    }

    print_cmd()
    {
        console.log("exit->0")
        console.log("search a stock->1")
        console.log("Filter stocks->2")
        console.log("Add a stock->3")
        console.log("show stocks->4");
    }

    print_stocks()
    {
        let stocks = this.srv.print_data()
        
        stocks.forEach( (stock)=>{
            console.log(stock.name + " stock costs: " + stock.price+"$");
        })
           
    }

    async search_stock()
    {
        
       await scanner.question("Enter Stock name: ",  (answer)=>{
            console.log("stock name is" + answer);
            scanner.close();
        })
    }



    

// nu putem sa rulam cu un while pentru ca avem async functions in node si  pusca
// trenuie sa fac functia recursiva pentru a putea folosti readline  (exista un npm readline-sync care imi poate rezolva problema dar am decis sa nu il folosesc)


    run()
    {   
        
        this.print_cmd();
            scanner.question("give a comand >>: ",(answer)=>{
                answer;
                switch (answer){
                    case("0"):
                        console.log("closing program");
                        console.log("\n")
                        return scanner.close();
                        break;
                    case("1"):
                        this.search_stock();
                        console.log("\n")                        
                        break;
                    case("2"):
                        this.filter_stock();
                        console.log("\n")
                        break;
                    case("3"):
                        this.add_stock();
                        console.log("\n")
                        break;
                    case("4"):
                        this.print_stocks();
                        console.log("\n");
                        break;

                    default:
                        console.log(answer);
                        console.log("invalid comand... try again")
                        console.log("\n")
                

                
                }
                
                this.run();
              
             })

        

    }


}





module.exports = Ui_consola;