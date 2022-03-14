function OrderDTO(oid,cid,fullTotal,date) {
    var orderId =oid;
    var cusId=cid;
    var tot=fullTotal;
    var day=date;

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


    Object.defineProperty(this,"cid",{
        get:function()
        {
            return cusId;
        },
        set:function(cid)
        {
            this.cusId=cid;
        }
    });



    Object.defineProperty(this,"fullTotal",{
        get:function()
        {
            return tot;
        },
        set:function(fullTotal)
        {
            this.tot=fullTotal;
        }
    });

    Object.defineProperty(this,"date",{
        get:function()
        {
            return day;
        },
        set:function(date)
        {
            this.day=date;
        }
    });

}
