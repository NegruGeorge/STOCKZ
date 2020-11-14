const scanner = require("readline-sync");

const Validator = require("./validator.js")
const Service =require("./service.js");
const chalk = require("chalk");



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
        console.log(chalk.yellow("exit->0"))
        console.log(chalk.yellow("search a stock->1"))
        console.log(chalk.yellow("Filter stocks->2"))
        console.log(chalk.yellow("Add a stock->3"))
        console.log(chalk.yellow("show stocks->4"));
    }

    print_stocks()
    {
        let stocks = this.srv.print_data()
        
        stocks.forEach( (stock)=>{
            console.log(chalk.blue(stock.name + " stock costs: " + stock.price+"$"));
        })
           
    }

     search_stock()
    {
       // throw Error("nu mere")
        let stock_name= scanner.question(chalk.green("Enter Stock name: "))
        let price =this.srv.search_stock(stock_name);
        
        console.log(chalk.blue(stock_name + " stock costs: " + price+"$"));
       
    }

    filter()
    {
        let price = scanner.question(chalk.green("enter Stock price for filter: "))
        this.validator.validate_float(price);

        console.log(chalk.yellow("CMD FOR ORDER:1->Ascending order"));
        console.log(chalk.yellow("              0)->Descending order"));
        let order = scanner.question(chalk.green("enter order: "));
        //console.log(order);
        if(order !="1" && order !="0")
            throw Error("Order must be 0 or 1")

        let stocks  = this.srv.filter_stocks(price,order)
        console.log(chalk.yellow("stocks after order:"))
        stocks.forEach( (stock)=>{
            console.log(chalk.blue(stock.name + " stocks costs: " + stock.price+"$"));
        })
    }


    add_stock()
    {
        let name = scanner.question(chalk.green("Add Stock name: "))
        this.validator.validate_uppercase(name);

        let price = scanner.question(chalk.green("Add price for Stock: "))
        this.validator.validate_float(price);

        this.srv.add_stock(name,price);
        console.log(chalk.blue("stock added"));

    }

// nu putem sa rulam cu un while pentru ca avem async functions in node si  pusca
// trenuie sa fac functia recursiva pentru a putea folosti readline  (exista un npm readline-sync care imi poate rezolva problema dar am decis sa nu il folosesc)


    run()
    {   
        let cmd 
        this.print_cmd();
        let run=1

        while(run){

            let cmd = scanner.question("Enter command: ")
                try{
                switch (cmd){
                    case("0"):
                        console.log("closing program");
                        console.log("\n")
                        run=0;
                        break;
                    case("1"):
                        this.search_stock();
                        console.log("\n")                        
                        break;
                    case("2"):
                        this.filter();
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
                        console.log(chalk.red("invalid comand... try again\n"))
                       
                

                
                }
            }catch(err)
            {
                console.log(chalk.red(err.message + "\n"))
                
            }
                
             
            }
           
            console.log("end");
        

    }


}





module.exports = Ui_consola;