// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const serverData = {

	data: [],

	getServers: function () {
		return serverData.data;
	},

	addServer: function (server) {
		// THE FOLLOWING LINE THROWNG RUNTIME ERROR BECAUSE server.data is "undefined"
		//server.data.id = serverData.data[serverData.data.length - 1].id + 1;  // Naive unique ID
		serverData.data.push(server);
	},

	removeServer: function (id) {
		serverData.data = serverData.data.filter(s => s.id != id);
	},

	setupServer: function (id) {
		serverData.data.filter(s => s.id == id)[0].setup = true;
	}

};




$(document).ready(function () {
	$.ajax({
		url: "https://serversetuptrackerapi.azurewebsites.net/api/servers"
	}).then(
		function (data) {
			serverData.data = JSON.parse(data);
			refreshLoadMainList();
			refreshLoadOverdueList();
			$("#mainContent").height($("#mainContent").outerHeight() + 80);
		})
});




function populateServerDataFromApi() {
	
}




function addServer() {
	var server = {
		// REDO - doing it in serverData caused runtim error
		"id": serverData.data[serverData.data.length - 1].id + 1,
		// ---------------------------------------------
		"hostname": $("#host").val(),
		"description": $("#desc").val(),
		"ip": $("#ip").val(),
		"deadline": $("#deadline").val(),
		"setup": false
	};
	serverData.addServer(server);
	clearFormFields();
	refreshLoadMainList();
	refreshLoadOverdueList();
	$("#mainContent").height($("#mainContent").outerHeight() + 80);
}


function removeServer(id) {
	serverData.removeServer(id);
	refreshLoadMainList();
	refreshLoadOverdueList();
	$("#mainContent").height($("#mainContent").outerHeight() - 80);
}


function completeSetup(id) {
	serverData.setupServer(id);
	refreshLoadMainList();
	refreshLoadOverdueList();
}


function refreshLoadOverdueList() {
	$('#overdueServerList').empty();
	for (var server of serverData.getServers()) {
		if (!server.setup) {
			var today = new Date();
			var serverDeadline = new Date(server.deadline);
			var numOfDays = (today.getTime() - serverDeadline.getTime()) / (1000 * 3600 * 24);
			var htmlRow1 = "<label class=\"label-overdue\">" + server.hostname + "</label><br />";
			var htmlRow2 = "<label class=\"label-overdue\">" + server.ip + "</label><br />";
			var htmlRow3 = "<label class=\"label-overdue\">" + Math.trunc(numOfDays) + " day(s) ago</label><br />";
			$("#overdueServerList").append(htmlRow1 + htmlRow2 + htmlRow3 + "</br>");
		}
	}

}


function clearFormFields() {
	// ENHANCEMENT - iterate thru Input and textarea type tags within modal body and clear, instead of explicitly one at a time
	$("#host").val("");
	$("#desc").val("");
	$("#ip").val("");
	$("#deadline").val("");
}


function refreshLoadMainList() {
	$('#serverTableBody').empty();
	for (var server of serverData.getServers()) {
		var removeAction = "<button type=\"button\" class=\"btn btn-link btn-sm\" onclick=\"removeServer(" + server.id + ");\">Remove</button>";
		var completeAction = "<button type=\"button\" class=\"btn btn-link btn-sm\" onclick=\"completeSetup(" + server.id + ");\">Complete</button>";
		var actionCol = removeAction + (!server.setup ? completeAction : "");
		var htmlRow = "<tr id='row" + server.id + "'><td title=\"" + server.description + "\">" + server.hostname + "</td><td>" + server.ip + "</td><td>" + server.deadline + "</td><td id=\"StatusCol" + server.id + "\">" + (server.setup ? 'Completed' : 'Pending') + "</td><td>" + actionCol + "</td></tr>";
		$("#serverTableBody").append(htmlRow);
	}

}




