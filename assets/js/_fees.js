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


function calculateFees() {

    var enrolment = $("#enrolment").val();
    var enteringGrade = $("#enteringGrade").val();
    var optionalFET = $("#optionalFET").val();
    var paymentFrequency = $("#paymentFrequency").val();

    alert("CALCULATE FEES HERE SELECTS: " + enrolment + " | " + enteringGrade + " | " + optionalFET + " | " + paymentFrequency);

    $("#registration").val("based on some calculation");
    $("#deposit").val("based on some calculation");
    $("#tuition").val("based on some calculation");
    $("#curriculum").val("based on some calculation");
    $("#fetsubjects").val("based on some calculation");
    $("#total").val("based on some calculation");



}