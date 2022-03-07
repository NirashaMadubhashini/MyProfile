$("#btnAddItem").click(function () {
    saveItem();
    clearAll();
    loadAllItems();
});

$("#btnSearchItem").click(function () {
    var searchID = $("#txtSearchItemCode").val();

    var response = searchItem(searchID);
    if (response) {
        $("#itemCode").val(response.itemCode);
        $("#itemName").val(response.itemName);
        $("#itemPrice").val(response.price);
        $("#itemQuantity").val(response.quantity);
    }else{
        clearAll();
        alert("No Such a Item");
    }
});

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.price}</td><td>${i.quantity}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function saveItem() {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemPrice = $("#itemPrice").val();
    let itemQuantity = $("#itemQuantity").val();

    var itemObject = {
        itemCode: itemCode,
        itemName: itemName,
        price: itemPrice,
        quantity: itemQuantity
    };

    itemDB.push(itemObject);
}

function searchItem(itemCode) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].itemCode == itemCode) {
            return itemDB[i];
        }
    }
}

$(document).ready(function () {
    $('#btnDeleteItem').click(function () {
        if (confirm("Want to clear?")) {
            $('#form input[type="text"]').val('');
            $('#form #itemCode').val('');
            $('#form #itemName').val('');
            $('#form #itemPrice').val('');
            $('#form #itemQuantity').val('');
        }

    });
});

function deleteItem(){
    //write the code
}

function updateCustomer(){
    //write the code
}

const itemCodeRegEx = /^(I00-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const itemPriceRegEx = /^[0-9]{2,}$/;
const itemQuantityRegEx = /^[0-9 A-z]{2,}$/;


$('#itemCode,#itemName,#itemPrice,#itemQuantity').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#itemCode,#itemName,#itemPrice,#itemQuantity').on('blur', function () {
    formValid();
});

$("#itemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#itemCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#itemCode").val(srcItem.getItemCode());
        $("#itemName").val(srcItem.getItemName());
        $("#itemPrice").val(srcItem.getItemPrice());
        $("#itemQuantity").val(srcItem.getItemQuantity());
    }


});

$("#itemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#itemPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#itemQuantity").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnAddItem").attr('disabled', true);

function clearAll() {
    $('#itemCode,#itemName,#itemPrice,#itemQuantity').val("");
    $('#itemCode,#itemName,#itemPrice,#itemQuantity').css('border', '2px solid #ced4da');
    $('#itemCode').focus();
    $("#btnAddItem").attr('disabled', true);
    loadAllItems();
    $("#lblitemcode,#lblitemname,#lblitemprice,#lblitemquantity").text("");
}

function formValid() {
    var itemCode = $("#itemCode").val();
    $("#itemCode").css('border', '2px solid green');
    $("#lblitemcode").text("");
    if (itemCodeRegEx.test(itemCode)) {
        var itemName = $("#itemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#itemName").css('border', '2px solid green');
            $("#lblitemname").text("");
            var itemPrice = $("#itemPrice").val();
            if (itemPriceRegEx.test(itemPrice)) {
                var itemQty = $("#itemQuantity").val();
                var resp = itemQuantityRegEx.test(itemQty);
                $("#itemPrice").css('border', '2px solid green');
                $("#lblitemprice").text("");
                if (resp) {
                    $("#itemQuantity").css('border', '2px solid green');
                    $("#lblitemquantity").text("");
                    return true;
                } else {
                    $("#itemQuantity").css('border', '2px solid red');
                    $("#lblitemquantity").text("Item qty is a required field : Pattern 500g or 1kg");
                    return false;
                }
            } else {
                $("#itemPrice").css('border', '2px solid red');
                $("#lblitemprice").text("Item Price is a required field : Mimum 3");
                return false;
            }
        } else {
            $("#itemName").css('border', '2px solid red');
            $("#lblitemname").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#itemCode").css('border', '2px solid red');
        $("#lblitemcode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfValid() {
    var itemCode = $("#itemCode").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#itemName").focus();
        var itemName = $("#itemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#itemPrice").focus();
            var itemPrice = $("#itemPrice").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#itemQuantity").focus();
                var itemQty = $("#itemQuantity").val();
                var resp = itemQuantityRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAll();
                    }
                } else {
                    $("#itemQuantity").focus();
                }
            } else {
                $("#itemPrice").focus();
            }
        } else {
            $("#itemName").focus();
        }
    } else {
        $("#itemCode").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnAddItem").attr('disabled', false);
    } else {
        $("#btnAddItem").attr('disabled', true);
    }
}

$('#btnAddItem').click(function () {
    checkIfValid();
});