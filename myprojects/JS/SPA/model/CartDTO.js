function CartDTO(oid,oiCode,oiName,oiQty,oiPrice,oTot) {
    var orderId =oid;
    var iCode=oiCode;
    var iName =oiName;
    var iQty=oiQty;
    var unPrice=oiPrice;
    var orTot=oTot;

    Object.defineProperty(this,"oid",{
        get:function()
        {
            return orderId;
        },
        set:function(oid)
        {
            this.orderId=oid;
        }
    });


    Object.defineProperty(this,"oiCode",{
        get:function()
        {
            return iCode;
        },
        set:function(oiCode)
        {
            this.iCode=oiCode;
        }
    });


    Object.defineProperty(this,"oiName",{
        get:function()
        {
            return iName;
        },
        set:function(oiName)
        {
            this.iName=oiName;
        }
    });

    Object.defineProperty(this,"oiQty",{
        get:function()
        {
            return iQty;
        },
        set:function(oiQty)
        {
            this.iQty=oiQty;
        }
    });


    Object.defineProperty(this,"oiPrice",{
        get:function()
        {
            return unPrice;
        },
        set:function(oiPrice)
        {
            this.unPrice=oiPrice;
        }
    });

    Object.defineProperty(this,"oTot",{
        get:function()
        {
            return orTot;
        },
        set:function(oTot)
        {
            this.orTot=oTot;
        }
    });
}
