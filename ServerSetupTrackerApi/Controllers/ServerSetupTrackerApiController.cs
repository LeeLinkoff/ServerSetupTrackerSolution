using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ServerSetupTrackerApi.Controllers
{
    [Route("/api/servers")]
    public class ServerSetupTrackerApiController : ControllerBase
    {
        private readonly ILogger<ServerSetupTrackerApiController> _logger;

        public ServerSetupTrackerApiController(ILogger<ServerSetupTrackerApiController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public OkObjectResult Servers()
        {
            // This is just a bare bones example of the endpoint of an API that would provide list of servers to be setup or have
            // been setup
            //
            // Actual implementation would conist of:
            // * Verbose error handling/checking
            // * Communication with a back-end service providing the data to this API endpoint

            // Following is purely for illustrative purposes

            List<Server> servers = new List<Server>();
            servers.Add(new Server("101", "core", "the central device", "255.255.255.255", "9/11/2021", false));
            servers.Add(new Server("102", "backup", "backup server", "255.255.255.230", "9/15/2021", false));
            servers.Add(new Server("103", "edge", "edge server", "255.255.255.210", "8/15/2021", false));

            string jsonResponse = JsonConvert.SerializeObject(servers);

            return Ok(jsonResponse);
        }
    }
}
