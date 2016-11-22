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

    alert("CALCULATE FEES HERE");

}