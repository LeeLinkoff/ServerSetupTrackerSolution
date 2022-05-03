namespace ServerSetupTrackerApi
{
    public class Server
    {
        public string id { get; set; }
        public string hostname { get; set; }
        public string description { get; set; }
        public string ip { get; set; }
        public string deadline { get; set; }
        public bool setup { get; set; }

        public Server(string id, string host, string desc, string ip, string deadline, bool setup)
        {
            this.id = id;
            this.hostname = host;
            this.description = desc;
            this.ip = ip;
            this.deadline = deadline;
            this.setup = setup;
        }
    }
}
