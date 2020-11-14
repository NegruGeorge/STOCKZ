
const fs = require("fs");
const assert = require("assert");

const json = fs.readFileSync("json.json");
const dataJson = json.toString();
const data = JSON.parse(dataJson);

const Validator = require("./validator.js")
const Service =require("./service.js");

let srv = new Service();
let val = new Validator();



class Test
{
    
    test_print()
    {
        for(let i=0;i<data.length;i++)
               assert(srv.print_data()[i].name,data[i].name)
    }

    test_add()
    {
        // nu merge pentru ca e lower case
        try{
           val.validate_uppercase("cass");
            assert(false);
        }catch(err)
        {
            assert(true);
        }

        // nu merge pentru nume
        try{
            srv.add_stock("AAPL",123);
            assert(false);
        }catch(err)
        {
            assert(true);
        }

           // nu merge pentru ca am string in loc de int la pret
           try{
            val.validate_float("dada");
            // srv.add_stock("JJO","dada");
            assert(false);
        }catch(err)
        {
            assert(true);
        }

    }

    test_filter()
    {
        // nu merge pentru ca e string la input
        try{
            srv.test_filter("asas","1")
            assert(false)
        }catch(err)
        {
            assert(true)
        }

         // nu merge pentru ca e string la order (trb 1 sau 0)
         try{
            srv.test_filter("11","asd")
            assert(false)
        }catch(err)
        {
            assert(true)
        }
    }
  
    run_all()
    {

        this.test_print();
        this.test_add();
        this.test_filter();
    }
}


let test = new Test();

test.run_all();