function OrderDetailDTO(orderid,itcode,itname,itqty,itprice,ittot) {
    var order =orderid;
    var code =itcode;
    var qty=itqty;
    var price=itprice;
    var rs=ittot;



    Object.defineProperty(this,"orderid",{
        get:function()
        {
            return order;
        },
        set:function(orderid)
        {
            this.order=orderid;
        }
    });


    Object.defineProperty(this,"itcode",{
        get:function()
        {
            return code;
        },
        set:function(itcode)
        {
            this.code=itcode;
        }
    });


    Object.defineProperty(this,"itqty",{
        get:function()
        {
            return qty;
        },
        set:function(itqty)
        {
            this.qty=itqty;
        }
    });

    Object.defineProperty(this,"itprice",{
        get:function()
        {
            return price;
        },
        set:function(itprice)
        {
            this.price=itprice;
        }
    });

    Object.defineProperty(this,"ittot",{
        get:function()
        {
            return rs;
        },
        set:function(ittot)
        {
            this.rs=ittot;
        }
    });

}

