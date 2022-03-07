$("#btnAddCustomer").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

$("#btnSearch").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#customerId").val(response.id);
        $("#customerName").val(response.name);
        $("#customerAddress").val(response.address);
        $("#customerSalary").val(response.salary);
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        $("#customerTable").append(row);
    }
}

function saveCustomer() {
    let customerID = $("#customerId").val();
    let customerName = $("#customerName").val();
    let customerAddress = $("#customerAddress").val();
    let customerSalary = $("#customerSalary").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    };

    customerDB.push(customerObject);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

$(document).ready(function () {
    $('#btnDelete').click(function () {
        if (confirm("Want to clear?")) {
            $('#form1 input[type="text"]').val('');
            $('#form1 #customerId').val('');
            $('#form1 #customerName').val('');
            $('#form1 #customerAddress').val('');
            $('#form1 #customerSalary').val('');
        }

    });
});

function deleteCustomer() {
}

function updateCustomer() {
    //write the code
}

const cusIDRegEx = /^(C00-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[A-z]{3,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#customerId,#customerName,#customerAddress,#customerSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#customerId,#customerName,#customerAddress,#customerSalary').on('blur', function () {
    formValid();
});

$("#customerId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#customerId").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#customerId").val(srcCustomer.getCustomerID());
        $("#customerName").val(srcCustomer.getCustomerName());
        $("#customerAddress").val(srcCustomer.getCustomerAddress());
        $("#customerSalary").val(srcCustomer.getCustomerSalary());
    }


});

$("#customerName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#customerAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#customerSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnAddCustomer").attr('disabled', true);

function clearAll() {
    $('#customerId,#customerName,#customerAddress,#customerSalary').val("");
    $('#customerId,#customerName,#customerAddress,#customerSalary').css('border', '2px solid #ced4da');
    $('#customerId').focus();
    $("#btnAddCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
}

function formValid() {
    var cusID = $("#customerId").val();
    $("#customerId").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#customerName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customerName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#customerAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#customerSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#customerAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#customerSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#customerSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#customerAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Address is a required field : Mimum 3");
                return false;
            }
        } else {
            $("#customerName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#customerId").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#customerId").val();
    if (cusIDRegEx.test(cusID)) {
        $("#customerName").focus();
        var cusName = $("#customerName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customerAddress").focus();
            var cusAddress = $("#customerAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#customerSalary").focus();
                var cusSalary = $("#customerSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#customerSalary").focus();
                }
            } else {
                $("#customerAddress").focus();
            }
        } else {
            $("#customerName").focus();
        }
    } else {
        $("#customerId").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnAddCustomer").attr('disabled', false);
    } else {
        $("#btnAddCustomer").attr('disabled', true);
    }
}

$('#btnAddCustomer').click(function () {
    checkIfValid();
});