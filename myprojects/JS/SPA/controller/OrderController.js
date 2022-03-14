// $("#btnPay").attr('disabled', true);

// $("#btnPay").click(function () {
//     // saveOrder();
//     clearAllOrder();
//     // loadAllOrders();
// });

$("#txtOrderId").attr("disabled", true);
function loadAllOrders() {
    $("#orderTable").empty();
    for (var i of cartTableDB) {
        let row = `<tr><td>${i.orderId}</td><td>${i.iCode}</td><td>${i.iName}</td><td>${i.iQty}</td><td>${i.unPrice}</td><td>${i.orTot}</td></tr>`;
        $("#orderTable").append(row);
    }
}

function addToCart(){
    let oid=$("#txtOrderId").val();
    let oiCode = $('#selectItemCode').find(":selected").text();
    let oiName=$("#txtItemName").val();
    let oiQty=$("#txt-qty").val();
    let oiPrice=$("#txtUnitPrice").val();
    let oTot=$("#total").text();

    for (let i=0;i<cartTableDB.length;i++){
        if(cartTableDB[i].iCode===oiCode){
            console.log(cartTableDB[i])
            var newQty=+cartTableDB[i].iQty + +oiQty;
            let newTotal=oiPrice*newQty;
            cartTableDB[i].iQty= newQty;
            cartTableDB[i].orTot=newTotal;
            return;
        }
    }
    let cartDTO = new CartDTO(oid,oiCode,oiName,oiQty,oiPrice,oTot);
    console.log(cartDTO);

        var cartObject = {
            orderId: cartDTO.oid,
            iCode: cartDTO.oiCode,
            iName: cartDTO.oiName,
            iQty: cartDTO.oiQty,
            unPrice: cartDTO.oiPrice,
            orTot: cartDTO.oTot
    }

    cartTableDB.push(cartObject);

}


$("#btnAddToCart").click(function () {

    // if($('#txtOrderQty').val()!=""){
        if($('#txt-qty').val()!=""){
        qtyUpdate();
        addToCart();
        loadAllOrders();
        $("#selectItemCode,#txtItemName,#txt-qty,#txtUnitPrice,#total").val("")

    }else{
        alert("Please Enter Order Qty");
    }
});

//1
function placeOrder() {

    if(saveOrder()){
        console.log("IF lop called")
        for (let i of cartTableDB){
            let orderDetailDTO = new OrderDetailDTO(i.orderId,i.iCode,i.iQty,i.unPrice,i.orTot);
            orderDetailDB.push(orderDetailDTO);
        }
        alert("Successfully Placed")
    }

}

function saveOrder() {
    let oid=$("#txtOrderId").val();
    let cid = $('#selectCusID').find(":selected").text();
    let fullTotal=$("#total").text();
    let  date=$("#txtDate").val();
    console.log(oid,cid,fullTotal,date,"oid==============>",oid);

    let orderDTO = new OrderDTO(oid,cid,fullTotal,date);
    var orderObject = {
        orderId: orderDTO.oid,
        cusId: orderDTO.cid,
        tot: orderDTO.fullTotal,
        day: orderDTO.date
    }

    console.log("chcke1 oder Dto",orderDTO)
    return orderDB.push(orderObject);
}

function generateOrderID() {
    try {
        let lastOId = orderDB[orderDB.length - 1].orderId;

        console.log("oder Db in Generate",orderDB)
        console.log("lastOId",lastOId)

        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderId").val("00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderId").val("O0" + newOId);
        } else {
            $("#txtOrderId").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderId").val("001");
    }

}


$("#btnPay").click(function () {

    placeOrder();
    generateOrderID();
    cartTableDB.splice(0,cartTableDB.length);
    $('#orderTable').empty();
    $("#txtItemName,#txtUnitPrice,#txt-qtyOnHand,#txt-qty,#total").val("")
    console.log("orderDetail Db",orderDetailDB)
});

// A $( document ).ready() block.
$( document ).ready(function() {
    generateOrderID()
});


function qtyUpdate() {
    let item;
    var itemQty=$('#txt-qtyOnHand').val();

    let text = $('#selectItemCode').find(":selected").text();
    console.log(text)

    var orderQty=$('#txt-qty').val();

    for (let i in itemDB){
        console.log(itemDB)
        if($('#selectItemCode').find(":selected").text()===itemDB[i].itemCode){
            console.log(itemDB[i])
            itemDB[i].quantity=itemQty;
            $('#txt-qtyOnHand').val(itemDB[i].quantity);
        }
    }
}



$('#selectCusID').change(function () {
    var customerId = $('#selectCusID').find(":selected").text();
    for (let i = 0; i < customerDB.length; i++) {

        if (customerDB[i].id === customerId) {

            $('#txtCusName').val(customerDB[i].name);
            $('#txtAddress').val(customerDB[i].address);
            $('#txtSalary').val(customerDB[i].salary);
        }
    }
});

$('#selectItemCode').change(function () {
    var itemCode = $('#selectItemCode').find(":selected").text();
    for (let i = 0; i < itemDB.length; i++) {

        if (itemDB[i].itemCode === itemCode) {

            $('#txtItemName').val(itemDB[i].itemName);
            $('#txtUnitPrice').val(itemDB[i].price);
            $('#txt-qtyOnHand').val(itemDB[i].quantity);
        }
    }
});


const orderIDRegEx = /^(O)[0-9]{2}$/;
const qtOHRegEx = /^[0-9]{2,}$/;
const cashRegEx = /^[0-9]{2,}$/;


$('#txtOrderId').on('keydown', function (eventOb) {
    var orderID = $("#txtOrderId").val();
    $("#txtOrderId").css('border', '2px solid green');
    $("#lblorderId").text("");
    if (orderIDRegEx.test(orderID)) {
        $("#txtOrderId").css('border', '2px solid green');
        $("#lblorderId").text("");
    }else {
        $("#txtOrderId").css('border', '2px solid red');
        $("#lblorderId").text("Order ID is a required field : Pattern O000");
    }
    if (eventOb.key === "Tab") {
        eventOb.preventDefault();
    }
});


function calculateTotal() {
    let qty = $("#txt-qty").val();
    let unitPrice = $("#txtUnitPrice").val();
    let total = unitPrice * qty;
    $("#total").text(total);

}

function updateQty() {
    let qtyOnHand = $("#txt-qtyOnHand").val();
    let qty = $("#txt-qty").val();
    let val = qtyOnHand - qty;
    $("#txt-qtyOnHand").val(val);
}


$("#btnAddToCart").attr('disabled', true);


$("#txt-qty").on('keyup', (function (e) {
        calculateTotal();
        let qtyOnHand = $("#txt-qtyOnHand").val();
        let qtyTyped = $("#txt-qty").val();
        let qtyOnHandNumber = parseInt(qtyOnHand);
        let qtyNumber = parseInt(qtyTyped);

        let empty = $("#txt-qty").empty();
        if (empty) {
            $("#btnAddToCart").attr('disabled', true);
        }

        if (qtyOnHandNumber < qtyNumber) {
            $("#txt-qty").css('border', '2px solid red');
            $("#lblorderQty").text("insufficient Quantity");
        } else {
            $("#txt-qty").css('border', '2px solid green');
            $("#lblorderQty").text("");
        }
        if (e.key === "Enter") {
            $("#btnAddToCart").attr('disabled', false);
            updateQty();
        }
    }
));

function updateCash() {
    let total = $("#total").text();
    let cash = $("#txtCash").val();
    let val = cash - total;
    $("#txtChange").val(val);
}

$("#txtCash").on('keyup', (function (e) {
        let total = $("#total").text();

        let cash = $("#txtCash").val();
        let cashAmount = parseInt(cash);
        let tot = parseInt(total);
        if (cashAmount < tot) {
            $("#txtCash").css('border', '2px solid red');
            $("#lblcash").text("Insufficient Cash Amount");
            $("#txtChange").val("");
        } else {
            $("#txtCash").css('border', '2px solid green');
            $("#lblcash").text("");
            updateCash()
        }
        setButtonOrder();
        if (e.key === "Enter") {
            checkIfValidOrder();
        }
    }
));


function clearAllOrder() {
    $('#txtOrderId,#txt-qty,#txtCash').val("");
    $('#txtOrderId,#txt-qty,#txtCash').css('border', '2px solid #ced4da');
    $("#btnPay").attr('disabled', true);
    loadAllOrders();
    $("#lblorderId,#lblorderQty,#lblcash").text("");
}


function checkIfValidOrder() {
        $("#txt-qty").focus();
        var qty = $("#txt-qty").val();
        if (qtOHRegEx.test(qty)) {
            $("#txtCash").focus();
            var cash = $("#txtCash").val();
            var resp = cashRegEx.test(cash);
            if (resp) {
                let res = confirm("Do you really want to Purchase this order..?");
                if (res) {
                    clearAllOrder();
                }
            } else {
                $("#txtCash").focus();
            }
        } else {
            $("#txt-qty").focus();
        }
}


// function formValidOrder() {
//     var orderID = $("#txtOrderId").val();
//     $("#txtOrderId").css('border', '2px solid green');
//     $("#lblorderId").text("");
//     if (orderIDRegEx.test(orderID)) {
//         var qty = $("#txt-qty").val();
//         if (qtOHRegEx.test(qty)) {
//             $("#txt-qty").css('border', '2px solid green');
//             $("#lblcusname").text("");
//             var cash = $("#txtCash").val();
//             var resp = cashRegEx.test(cash);
//             $("#txt-qty").css('border', '2px solid green');
//             $("#lblorderQty").text("");
//             if (resp) {
//                 $("#txtCash").css('border', '2px solid green');
//                 $("#lblcash").text("");
//                 return true;
//             } else {
//                 $("#txtCash").css('border', '2px solid red');
//                 $("#lblcash").text("Insufficient cash balance");
//             }     return false;
//             }else {
//                 $("#txt-qty").css('border', '2px solid red');
//                 $("#lblorderQty").text("Insufficient qty");
//                 return false;
//             }
//
//     } else {
//         $("#txtOrderId").css('border', '2px solid red');
//         $("#lblorderId").text("Order ID is a required field : Pattern O-000");
//         return false;
//     }
// }


// $("#txt-qty").on('keyup', function (eventOb) {
//     setButtonOrder();
//     calculateTotal();
//     if (eventOb.key === "Enter") {
//
//         let qtyOnHand = $("#txt-qtyOnHand").val();
//         let qty = $("#txt-qty").val();
//         let val = qtyOnHand - qty;
//         $("#txt-qtyOnHand").val(val);
//     }
// });


// $("#txtOrderId").on('keyup', function (eventOb) {
//     setButtonOrder();
//
//     if (eventOb.key === "Enter") {
//         checkIfValidOrder();
//     }
//
//     if (eventOb.key === "Control") {
//         var typedOrderId = $("#txtOrderId").val();
//         var srcOrder = searchOrderFromID(typedOrderId);
//         $("#txtOrderId").val(srcOrder.getOrderId());
//         $("#txt-qty").val(srcOrder.getQty());
//         $("#txtCash").val(srcOrder.getCash());
//     }
// });



// $('txtOrderId,#txt-qty,#txtCash').on('blur', function () {
//     formValidOrder();
// });

// $('#txtOrderId').on('blur', function () {
//     var orderID = $("#txtOrderId").val();
//
//     if (orderIDRegEx.test(orderID)) {
//         $("#txtOrderId").css('border', '2px solid green');
//         $("#lblorderId").text("");
//
//
//     } else {
//         $("#txtOrderId").css('border', '2px solid red');
//         $("#lblorderId").text("Order ID is a required field : Pattern O-000");
//     }
// });


// $('#txtOrderId,#txt-qty,#txtCash').on('keydown', function (eventOb) {
//     if (eventOb.key === "Tab") {
//         eventOb.preventDefault();
//     }
//     let orderId = $("#txtOrderId").empty();
//     let qty = $("#txt-qty").empty();
//     let cash = $("#txtCash").empty();
//
//     if (orderId && qty && cash) {
//         $("#btnPay").attr('disabled', true);
//     } else {
//         $("#btnPay").attr('disabled', false);
//     }
//
// });


// function saveOrder() {
//
//     // let dC = duplicateCheckOrderId();
//     //
//     // if (dC) {
//     //     alert("This OrderId Already Added ,Try Again")
//     // } else {
//     //     confirm("Do you want to add this Order..?")
//
//     let orderDTO = new OrderDTO(
//         $("#txtOrderId").val(),
//         $("#selectItemCode").values,
//         $("#txtItemName").val(),
//         $("#txt-qty").val(),
//         $("#txtUnitPrice").val(),
//         $("#total").val()
//         )
//     ;
//
//     var orderObject = {
//         orderId: orderDTO.oid,
//         itemCode: orderDTO.oiCode,
//         itemName: orderDTO.oiName,
//         qtOH: orderDTO.qtyOnHnd,
//         price: orderDTO.perRs,
//         total: orderDTO.cost
//     }
//
//     orderDB.push(orderObject)
// }