Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function setRadios() {

    var inputs = document.getElementById('m4jForm').getElementsByClassName('m4jRadio');

    function sumRadios() {
        var total = 0,
            oForm = this.form;

        for (var x = 0; x < inputs.length; x++) {
            if (inputs[x].checked) total += parseInt(inputs[x].value);
        }

        // Defines the field that totals the selections
        oForm.elements['m4j65'].value = total.toFixed(0);

    }

    for (var y = 0; y < inputs.length; y++) {
        inputs[y].onclick = sumRadios;
    }

}
onload = setRadios;

feeValues = {
     "4" : { monthly: 8118.00, annual:  8392.94, registration: 18909.44, deposit: 0.00, egd: 0.0,     ieb: 0.0},
     "5" : { monthly: 8118.00, annual:  8392.94, registration: 18909.44, deposit: 0.00, egd: 0.0,     ieb: 0.0},
     "6" : { monthly: 8118.00, annual:  8392.94, registration: 19159.44, deposit: 0.00, egd: 0.0,     ieb: 250.0},
     "7" : { monthly: 8948.90, annual:  9161.58, registration: 18909.44, deposit: 0.00, egd: 0.0,     ieb: 0.0},
     "8" : { monthly: 8948.90, annual:  9161.58, registration: 18909.44, deposit: 0.00, egd: 0.0,     ieb: 0.0},
     "9" : { monthly: 8948.90, annual:  9161.58, registration: 19159.44, deposit: 0.00, egd: 0.0,     ieb: 250.0},
    "10" : { monthly: 9722.80, annual:  9161.58, registration: 18909.44, deposit: 0.00, egd: 1687.50, ieb: 0.0},
    "11" : { monthly: 9722.80, annual: 12271.22, registration: 22217.72, deposit: 0.00, egd: 0.0,     ieb: 3100.0},
    "12" : { monthly: 9722.80, annual: 12271.22, registration: 22217.72, deposit: 0.00, egd: 0.0,     ieb: 3100.0}
}

function calculateFees() {

    var enrolment = $("#enrolment").val();
    var enteringGrade = $("#enteringGrade").val();
    var optionalFET = $("#optionalFET").val();
    var paymentFrequency = $("#paymentFrequency").val();

    var total = 0.0

    if (enteringGrade != "") {

        if (enrolment == "newstudent") {

            //total += feeValues[enteringGrade].registration;
            $("#registration").val("R" + feeValues[enteringGrade].registration.formatMoney());

            //total += feeValues[enteringGrade].deposit;
            //$("#deposit").val("R" +feeValues[enteringGrade].deposit.formatMoney());


        } else {

            $("#registration").val("R" + (0.0).formatMoney());

            //$("#deposit").val("R" + (0.0).formatMoney());

        }



        var tuition = (feeValues[enteringGrade].monthly * 12)

        var discount = 0.0;

        if (paymentFrequency == "perterm") {
            discount = tuition * 2/100.0
            tuition = tuition - discount;
        }

        if (paymentFrequency == "peryear") {
            discount = tuition * 5/100.0
            tuition = tuition - discount;
        }

        total += tuition
        $("#tuition").val("R" + tuition.formatMoney());

        //total += feeValues[enteringGrade].annual;

        if (enrolment != "newstudent") {

            $("#curriculum").val("R" + feeValues[enteringGrade].annual.formatMoney());

        } else {

            $("#curriculum").val("R" + (0.0).formatMoney());

        }


        if (optionalFET == "egd") {

            total += feeValues[enteringGrade].egd;

            $("#fetsubjects").val("R" + feeValues[enteringGrade].egd.formatMoney());

        } else {

            $("#fetsubjects").val("R" + (0.0).formatMoney());

        }

        total += feeValues[enteringGrade].ieb;
        $("#ieb").val("R" + feeValues[enteringGrade].ieb.formatMoney());


    } else {


        $("#tuition").val("R" + (0.0).formatMoney());
        $("#curriculum").val("R" + (0.0).formatMoney());

    }

    $("#discount").val("(R" + discount.formatMoney() + ")");

    if (paymentFrequency == "permonth") {

        $("#total").val("12 Monthly Payments of R" + (total / 12).formatMoney());

    } else if (paymentFrequency == "perterm") {

        $("#total").val("3 Termly Payments of R" + (total / 3).formatMoney());

    } else if (paymentFrequency == "peryear") {

        $("#total").val("One payment in Dec 2017 of R" + (total).formatMoney());

    }

    $(".feesresult").css("display", "block");

}

function reset() {

    $(".feesresult").css("display", "none");

    $("#enrolment")[0].selectedIndex = 0;
    $("#enteringGrade")[0].selectedIndex = 0;
    $("#optionalFET")[0].selectedIndex = 0;
    $("#paymentFrequency")[0].selectedIndex = 0;

    $("#registration").val("R" + (0.0).formatMoney());
    $("#deposit").val("R" + (0.0).formatMoney());
    $("#tuition").val("R" + (0.0).formatMoney());
    $("#curriculum").val("R" + (0.0).formatMoney());
    $("#fetsubjects").val("R" + (0.0).formatMoney());
    $("#ieb").val("R" + (0.0).formatMoney());
    $("#total").val("R" + (0.0).formatMoney());

    selectionChange();

}

function selectionChange() {

    if ($("#enrolment").val() == "" || $("#enteringGrade").val() == "" ||
        $("#optionalFET").val() == "" || $("#paymentFrequency").val() == "")
    {

        $("#calcButton").removeClass("disabled").addClass("disabled")

    } else {

        $(".feesresult").css("display", "none");
        $("#calcButton").removeClass("disabled");

    }


}