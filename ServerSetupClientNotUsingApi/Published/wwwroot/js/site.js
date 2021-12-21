// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function addServer() {

    var actionCol = "<button type=\"button\" class=\"btn btn-link btn-sm\" onclick=\"$('#row3').remove();\">Remove</button>&nbsp;<button type=\"button\" class=\"btn btn-link btn-sm\" onclick=\"$('#StatusCol3').text('Complete');\">Complete</button>";
    var htmlRow = "<tr id='row3'><td>" + $("#host").val() + "</td><td>" + $("#ip").val() + "</td><td>" + $("#deadline").val() + "</td><td id=\"StatusCol1\">Pending</td><td>" + actionCol + "</td></tr>";

    $("#serverTable tr:last").after(htmlRow)
}