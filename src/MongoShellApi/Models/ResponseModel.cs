namespace MongoShellApi.Models
{
    public class ResponseModel
    {
        public string Error { get; set; }
        
        public Newtonsoft.Json.Linq.JObject Response { get; set; }
    }
}
