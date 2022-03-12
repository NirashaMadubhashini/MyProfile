$("#btnPay").click(function () {
    // saveOrder();
    clearAllOrder();
    // loadAllOrders();
});
$("#btnAddToCart").click(function () {
    saveOrder();
    // clearAllOrder();
    loadAllOrders();
});

function loadAllOrders() {
    $("#orderTable").empty();
    for (var i of orderDB) {
        let row = `<tr><td>${i.orderId}</td><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.qty}</td><td>${i.price}</td><td>${i.total}</td></tr>`;
        $("#orderTable").append(row);
    }
}

function saveOrder() {

    let dC = duplicateCheckOrderId();

    if (dC) {
        alert("This OrderId Already Added ,Try Again")
    } else {
        confirm("Do you want to add this Order..?")

        let orderDetailDTO = new OrderDetailDTO(
            $("#txtOrderId").val(),
            $('#selectCusID').icode,
            $("#txtItemName").val(),
            $("#txt-qty").val(),
            $("#txtUnitPrice").val(),
            $("#total").val()
            )
        ;


        var orderObject = {
            orderId: orderDetailDTO.orderid,
            itemCode: orderDetailDTO.itcode,
            itemName: orderDetailDTO.itname,
            qty: orderDetailDTO.itqty,
            price: orderDetailDTO.itprice,
            total: orderDetailDTO.ittot
        }

        orderDB.push(orderObject)
    }
}


function duplicateCheckOrderId() {
    for (var i = 0; i < orderDB.length; i++) {
        if ($("#txtOrderId").val() === orderDB[i].orderId) {

            return true;
        }
    }
    return false
}


$('#selectCusID').change(function () {
    var customerId = $('#selectCusID').find(":selected").text();
    for (let i = 0; i < customerDB.length; i++) {
        console.log(customerDB[0].id)
        if (customerDB[i].id === customerId) {
            console.log(customerDB[i])
            console.log(customerDB[i].cname)
            $('#txtCusName').val(customerDB[i].name);
            $('#txtAddress').val(customerDB[i].address);
            $('#txtSalary').val(customerDB[i].salary);
        }
    }
});

$('#selectItemCode').change(function () {
    var itemCode = $('#selectItemCode').find(":selected").text();
    for (let i = 0; i < itemDB.length; i++) {
        console.log(itemDB[0].itemCode)
        if (itemDB[i].itemCode === itemCode) {
            console.log(itemDB[i])
            console.log(itemDB[i].cname)
            $('#txtItemName').val(itemDB[i].itemName);
            $('#txtUnitPrice').val(itemDB[i].price);
            $('#txt-qtyOnHand').val(itemDB[i].quantity);
        }
    }
});


const orderIDRegEx = /^(O-)[0-9]{3}$/;
const qtOHRegEx = /^[0-9]{2,}$/;
const cashRegEx = /^[0-9]{2,}$/;


$('#txtOrderId,#txt-qty,#txtCash').on('keydown', function (eventOb) {
    if (eventOb.key === "Tab") {
        eventOb.preventDefault();
    }
    formValidOrder();
});

$('txtOrderId,#txt-qty,#txtCash').on('blur', function () {
    formValidOrder();
});

$("#txtOrderId").on('keyup', function (eventOb) {
    setButtonOrder();

    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }

    if (eventOb.key === "Control") {
        var typedOrderId = $("#txtOrderId").val();
        var srcOrder = searchOrderFromID(typedOrderId);
        $("#txtOrderId").val(srcOrder.getOrderId());
        $("#txt-qty").val(srcOrder.getQty());
        $("#txtCash").val(srcOrder.getCash());
    }
});


$("#txt-qty").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }
});

$("#txt-qty").on('keydown', (function (e) {
        let qtyOnHand = $("#txt-qtyOnHand").val();
        let qtyTyped = $("#txt-qty").val() + "0";
        let qtyOnHandNumber = parseInt(qtyOnHand);
        let qtyNumber = parseInt(qtyTyped);
        console.log(qtyTyped)
        if (qtyOnHandNumber < qtyNumber) {
            $("#txt-qty").css('border', '2px solid red');
            $("#lblorderQty").text("insufficient Quantity");
        } else {
            $("#txt-qty").css('border', '2px solid green');
            $("#lblorderQty").text("");
        }
    }
));

$("#txtCash").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }
});

$("#btnPay").attr('disabled', true);

function clearAllOrder() {
    $('#txtOrderId,#txt-qty,#txtCash').val("");
    $('#txtOrderId,#txt-qty,#txtCash').css('border', '2px solid #ced4da');
    $('#txtOrderId').focus();
    $("#btnPay").attr('disabled', true);
    loadAllOrders();
    $("#lblorderId,#lblorderQty,#lblcash").text("");
}

function formValidOrder() {
    var orderID = $("#txtOrderId").val();
    $("#txtOrderId").css('border', '2px solid green');
    $("#lblorderId").text("");
    if (orderIDRegEx.test(orderID)) {
        var qty = $("#txt-qty").val();
        if (qtOHRegEx.test(qty)) {
            $("#txt-qty").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cash = $("#txtCash").val();
            var resp = cashRegEx.test(cash);
            $("#txt-qty").css('border', '2px solid green');
            $("#lblorderQty").text("");
            if (resp) {
                $("#txtCash").css('border', '2px solid green');
                $("#lblcash").text("");
                return true;
            } else {
                $("#txtCash").css('border', '2px solid red');
                $("#lblcash").text("Insufficient cash balance");
                return false;
            }
        } else {
            $("#txt-qty").css('border', '2px solid red');
            $("#lblorderQty").text("insufficient Quantity");
            return false;
        }
    } else {
        $("#txtOrderId").css('border', '2px solid red');
        $("#lblorderId").text("Order ID is a required field : Pattern O-000");
        return false;
    }
}


function checkIfValidOrder() {
    var orderID = $("#txtOrderId").val();
    if (orderIDRegEx.test(orderID)) {
        $("#txt-qty").focus();
        var qty = $("#txt-qty").val();
        if (qtOHRegEx.test(qty)) {
            $("#txtCash").focus();
            var cash = $("#txtCash").val();
            var resp = cashRegEx.test(cash);
            if (resp) {
                let res = confirm("Do you really want to Purchase this order..?");
                if (res) {
                    saveOrder();
                    clearAllOrder();
                }
            } else {
                $("#txtCash").focus();
            }
        } else {
            $("#txt-qty").focus();
        }
    } else {
        $("#txtOrderId").focus();
    }
}

function setButtonOrder() {
    let b = formValidOrder();
    if (b) {
        $("#btnPay").attr('disabled', false);
    } else {
        $("#btnPay").attr('disabled', true);
    }
}

$('#btnPay').click(function () {
    checkIfValidOrder();
});