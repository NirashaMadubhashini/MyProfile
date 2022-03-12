function CustomerDTO(cid,cname,caddress,csalary) {

    var id =cid;
    var name=cname;
    var address=caddress;
    var salary=csalary;


    Object.defineProperty(this,"cid",{
        get:function()
        {
            return id;
        },
        set:function(cid)
        {
            this.id=cid;
        }
    });


    Object.defineProperty(this,"cname",{
        get:function()
        {
            return name;
        },
        set:function(cname)
        {
            this.name=cname;
        }
    });


    Object.defineProperty(this,"caddress",{
        get:function()
        {
            return address;
        },
        set:function(caddress)
        {
            this.address=caddress;
        }
    });


    Object.defineProperty(this,"csalary",{
        get:function()
        {
            return salary;
        },
        set:function(csalary)
        {
            this.salary=csalary;
        }
    });
}
