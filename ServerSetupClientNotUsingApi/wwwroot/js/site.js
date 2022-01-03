// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$(document).ready(function () {
	refreshLoadMainList();
	refreshLoadOverdueList();
	$("#mainContent").height($("#mainContent").outerHeight() + 80);
});



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


function removeServer(id){
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
			if (numOfDays > 0) {
				var htmlRow1 = "<label class=\"label-overdue\">" + server.hostname + "</label><br />";
				var htmlRow2 = "<label class=\"label-overdue\">" + server.ip + "</label><br />";
				var htmlRow3 = "<label class=\"label-overdue\">" + Math.trunc(numOfDays) + " day(s) ago</label><br />";
				$("#overdueServerList").append(htmlRow1 + htmlRow2 + htmlRow3 + "</br>");
			}
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




const serverData = {

	data: [
		{
			"id": 101,
			"hostname": "core",
			"description": "The central devices we rely on and scan regularly.",
			"ip": "1.2.3.4",
			// ENHANCEMENT - deal with dates in "2012-04-23T18:30:00.000Z" type format
			"deadline": "04/23/2012",
			"setup": false
		},
		{
			"id": 102,
			"hostname": "backup",
			"description": "Lorem ipsum backup.",
			"ip": "255.255.255.255",
			// ENHANCEMENT - deal with dates in "2012-04-23T18:30:00.000Z" type format
			"deadline": "07/23/2018",
			"setup": false
		},
		{
			"id": 103,
			"hostname": "external",
			"description": "Lorem ipsum external.",
			// ENHANCEMENT - deal with dates in "2012-04-23T18:30:00.000Z" type format
			"ip": "1.0.0.0",
			"deadline": "07/23/2018",
			"setup": false
		}
	],

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
