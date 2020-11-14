class Validators
{
    validate_int(val)
    {  
        if(isNaN(val))
            throw Error("the value is not a number")

        if(parseInt(val) !== parseFloat(val))
            throw Error("the value is not an int")

        return true;
    }

    validate_float(val)
    {
        if(isNaN(val))
            throw Error("the value is not a number")

        
        return true;
    }

   validate_uppercase(val)
   {
       if(val !== val.toUpperCase())
            throw Error("The value must be UPPERCASE")

     return true;
   }

}


// let v = new Validators()

// v.validate_uppercase("A123");

module.exports =Validators;