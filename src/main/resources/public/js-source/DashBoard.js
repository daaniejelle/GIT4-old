var outstandingCalls = 0;

function intialize() {
    var bulbId = $("#bulbId");
    bulbId.on("change", bulbIdChanged);

    intializeBulbSelect();
}

function bulbIdChanged(event) {
    var inputField = event.target;
    var bulbId = inputField.value;
    var url = "/setBulb";

    var parameters = {
        bulbId: bulbId
    };

    $.getJSON(url, parameters, fillBulb);
}

function fillBulb(data) {
    var id = data.id;
    var on = data.on;
    var colorName = data.colorName;
    var location = data.location;
    var xPosition = data.xPosition;
    var yPosition = data.yPosition;
    var dimmable = data.dimmable;
    var intensity = data.intensity;

    $("#id").text(id);
    $("#on").text(on);
    $("#colorName").text(colorName);
    $("#location").text(location);
    $("#xPosition").text(xPosition);
    $("#yPosition").text(yPosition);
    $("#dimmable").text(dimmable);
    $("#intensity").text(intensity);

    selectCorrectBulb(id);
}

function selectCorrectBulb(id) {
    // synchronize the select
    var bulbSelect = $("#bulbId");
    bulbSelect.val(id);
}

function intializeBulbSelect(selectedId) {
    var bulbSelect = $("#bulbId");
    bulbSelect.find('option').remove()
    var url = "/bulbs";

    var success = function (data) {
        var selectedBulb = data[0];
        data.forEach(bulb => {
            var option = $("<option>");
            option.text(bulb.location);
            option.attr("value", bulb.id);
            if (selectedId == bulb.id) {
                option.attr("selected", "selected");
                selectedBulb = bulb;
            }
            bulbSelect.append(option);
        });

        fillBulb(selectedBulb);
    }

    $.getJSON(url, null, success);
}

$(document).ready(intialize);