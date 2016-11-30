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
     "4" : { monthly: 6264.00, annual:  6781.26, registration: 5312.40, deposit: 6264.00, fet: 0.0},
     "5" : { monthly: 6264.00, annual:  6866.68, registration: 5312.40, deposit: 6264.00, fet: 0.0},
     "6" : { monthly: 6264.00, annual:  7021.55, registration: 5312.40, deposit: 6264.00, fet: 0.0},
     "7" : { monthly: 7606.00, annual:  7693.84, registration: 5312.40, deposit: 7606.00, fet: 0.0},
     "8" : { monthly: 7606.00, annual:  8168.81, registration: 5312.40, deposit: 7606.00, fet: 0.0},
     "9" : { monthly: 7606.00, annual:  8607.12, registration: 5312.40, deposit: 7606.00, fet: 0.0},
    "10" : { monthly: 8920.00, annual:  8779.71, registration: 5312.40, deposit: 8920.00, fet: 1687.50},
    "11" : { monthly: 8920.00, annual: 12837.01, registration: 5312.40, deposit: 8920.00, fet: 1687.50},
    "12" : { monthly: 8920.00, annual:  8983.08, registration: 5312.40, deposit: 8920.00, fet: 1687.50}
}

function calculateFees() {

    var enrolment = $("#enrolment").val();
    var enteringGrade = $("#enteringGrade").val();
    var optionalFET = $("#optionalFET").val();
    var paymentFrequency = $("#paymentFrequency").val();

    var total = 0.0

    if (enteringGrade != "") {

        if (enrolment == "newstudent") {

            total += feeValues[enteringGrade].registration;
            $("#registration").val("R" + feeValues[enteringGrade].registration.formatMoney());

            total += feeValues[enteringGrade].deposit;
            $("#deposit").val("R" +feeValues[enteringGrade].deposit.formatMoney());

        } else {

            $("#registration").val("R" + (0.0).formatMoney());
            $("#deposit").val("R" + (0.0).formatMoney());

        }



        var tuition = (feeValues[enteringGrade].monthly * 12)
        if (paymentFrequency == "perterm") { tuition = tuition * 95.0/100.0 }
        if (paymentFrequency == "peryear") { tuition = tuition * 92.0/100.0 }

        total += tuition
        $("#tuition").val("R" + tuition.formatMoney());

        total += feeValues[enteringGrade].annual;
        $("#curriculum").val("R" +feeValues[enteringGrade].annual.formatMoney());

        if (optionalFET == "egd") {

            total += feeValues[enteringGrade].fet;
            $("#fetsubjects").val("R" + feeValues[enteringGrade].fet.formatMoney());

        } else {

            $("#fetsubjects").val("R" + (0.0).formatMoney());

        }



    } else {


        $("#tuition").val("R" + (0.0).formatMoney());
        $("#curriculum").val("R" + (0.0).formatMoney());

    }



    $("#total").val("R" + total.formatMoney());

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