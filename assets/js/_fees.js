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
     "4" : { monthly: 6264.00, annual:  6781.26, registration: 5312.40, deposit: 6264.00},
     "5" : { monthly: 6264.00, annual:  6866.68, registration: 5312.40, deposit: 6264.00},
     "6" : { monthly: 6264.00, annual:  7021.55, registration: 5312.40, deposit: 6264.00},
     "7" : { monthly: 7606.00, annual:  7693.84, registration: 5312.40, deposit: 7606.00},
     "8" : { monthly: 7606.00, annual:  8168.81, registration: 5312.40, deposit: 7606.00},
     "9" : { monthly: 7606.00, annual:  8607.12, registration: 5312.40, deposit: 7606.00},
    "10" : { monthly: 8920.00, annual:  8779.71, registration: 5312.40, deposit: 8920.00},
    "11" : { monthly: 8920.00, annual: 12837.01, registration: 5312.40, deposit: 8920.00},
    "12" : { monthly: 8920.00, annual:  8983.08, registration: 5312.40, deposit: 8920.00}
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
            $("#registration").val(feeValues[enteringGrade].registration.toFixed(2));

        } else {

            $("#registration").val(0);

        }

        total += feeValues[enteringGrade].deposit;
        $("#deposit").val(feeValues[enteringGrade].deposit.toFixed(2));

        var tuition = (feeValues[enteringGrade].monthly * 12)
        if (paymentFrequency == "perterm") { tuition * 95.0/100.0 }
        if (paymentFrequency == "peryear") { tuition * 92.0/100.0 }

        total += tuition
        $("#tuition").val(tuition.toFixed(2));

        total += feeValues[enteringGrade].annual;
        $("#curriculum").val(feeValues[enteringGrade].annual.toFixed(2));



    } else {

        $("#deposit").val("0");
        $("#tuition").val("0");
        $("#curriculum").val("0");

    }

    if (optionalFET == "egd") {

        total += 1687.50;
        $("#fetsubjects").val("1687.50");

    } else {

        $("#fetsubjects").val("0.00");

    }

    total = total.toFixed(2);
    $("#total").val(total);



}