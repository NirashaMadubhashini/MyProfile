$("#btnAddCustomer").click(function () {

    saveCustomer();
    clearAll();
    loadAllCustomers();

});

$("#btnSearch").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        new CustomerDTO(
            $("#customerId").val(response.id),
            $("#customerName").val(response.name),
            $("#customerAddress").val(response.address),
            $("#customerSalary").val(response.salary));
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


    $("#customerTable>tr").click(function () {
        console.log($(this));

        let customerDTO = new CustomerDTO(
            $(this).children(":eq(0)").text(),
            $(this).children(":eq(1)").text(),
            $(this).children(":eq(2)").text(),
            $(this).children(":eq(3)").text());

        $("#customerId").val(customerDTO.cid);
        $("#customerName").val(customerDTO.cname);
        $("#customerAddress").val(customerDTO.caddress);
        $("#customerSalary").val(customerDTO.csalary);

    });

}


function saveCustomer() {

    let dC = duplicateCheck();

    if (dC) {
        alert("This CustomerId Already Added ,Try Again")
    } else {
        confirm("Do you want to add this Customer..?")

        let customerDTO = new CustomerDTO(
            $("#customerId").val(),
            $("#customerName").val(),
            $("#customerAddress").val(),
            $("#customerSalary").val());

        var customerObject = {
            id: customerDTO.cid,
            name: customerDTO.cname,
            address: customerDTO.caddress,
            salary: customerDTO.csalary
        };

        customerDB.push(customerObject)


    }

}


function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id === id) {
            return customerDB[i];
        }
    }
}

function duplicateCheck() {
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#customerId").val() === customerDB[i].id) {

            return true;
        }
    }
    return false
}


$("#btnUpdateCustomer").click(function () {
    // let customerId = $("#customerId").val();
    // let customerName = $("#customerName").val();
    // let customerAddress = $("#customerAddress").val();
    // let customerSalary = $("#customerSalary").val();

    let customerDTO = new CustomerDTO(
        $("#customerId").val(),
        $("#customerName").val(),
        $("#customerAddress").val(),
        $("#customerSalary").val());

    for (var i = 0; i < customerDB.length; i++) {
        if ($("#customerId").val() === customerDB[i].id) {

            customerDB[i].id = customerDTO.cid;
            customerDB[i].name = customerDTO.cname;
            customerDB[i].address = customerDTO.caddress;
            customerDB[i].salary = customerDTO.csalary;

            alert("Successfully Updated")
        }
    }
    loadAllCustomers()
    clearAll()
});

$("#btnDelete").click(function () {
    var index = 0;
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#customerId").val() === customerDB[i].id) {
            index = i;
        }
    }
    customerDB.splice(index, 1);
    clearAll();
    $(this).closest('tr').remove();

    confirm("Do you want to delete this Customer..?")
});


const cusIDRegEx = /^(C00-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[A-z]{3,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#customerId,#customerName,#customerAddress,#customerSalary').on('keydown', function (eventOb) {
    if (eventOb.key === "Tab") {
        eventOb.preventDefault();
    }
    formValidCus();
});

$('#customerId,#customerName,#customerAddress,#customerSalary').on('blur', function () {
    formValidCus();
});

$("#customerId").on('keyup', function (eventOb) {
    setButton();

    if (eventOb.key === "Enter") {
        checkIfValidCus();
    }

    if (eventOb.key === "Control") {
        var typedCustomerId = $("#customerId").val();
        var srcCustomer = searchCustomerFromID(typedCustomerId);
        $("#customerId").val(srcCustomer.getCustomerId());
        $("#customerName").val(srcCustomer.getCustomerName());
        $("#customerAddress").val(srcCustomer.getCustomerAddress());
        $("#customerSalary").val(srcCustomer.getCustomerSalary());
    }
});

$("#customerName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key === "Enter") {
        checkIfValidCus();
    }
});

$("#customerAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key === "Enter") {
        checkIfValidCus();
    }
});

$("#customerSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key === "Enter") {
        checkIfValidCus();
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

function formValidCus() {
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

function checkIfValidCus() {
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
    let b = formValidCus();
    if (b) {
        $("#btnAddCustomer").attr('disabled', false);
    } else {
        $("#btnAddCustomer").attr('disabled', true);
    }
}

$('#btnAddCustomer').click(function () {
    checkIfValidCus();
});

