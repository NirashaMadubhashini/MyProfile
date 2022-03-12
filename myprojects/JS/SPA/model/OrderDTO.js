function OrderDTO(oid,item,cid,qtyOnHnd,cost) {
    var orderId =oid;
    var cusId=cid;
    var items = new Array(item);
    var qtOH=qtyOnHnd;
    var tot=cost;

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


    Object.defineProperty(this,"item",{
        get:function()
        {
            return items;
        },
        set:function(item)
        {
            this.items=item;
        }
    });

    Object.defineProperty(this,"qtyOnHnd",{
        get:function()
        {
            return qtOH;
        },
        set:function(qtyOnHnd)
        {
            this.qtOH=qtyOnHnd;
        }
    });


    Object.defineProperty(this,"cost",{
        get:function()
        {
            return tot;
        },
        set:function(cost)
        {
            this.tot=cost;
        }
    });
}
