namespace MongoShellApi.Services
{
    using MongoDB.Bson;
    using MongoDB.Driver;
    using MongoShellApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class MongoService
    {
        public bool IsLive(string connectionString)
        {
            var database = GetDatabase(connectionString);

            return database.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(3000);
        }

        public ResponseModel ExecuteQuery(QueryModel queryModel)
        {
            var result = new ResponseModel();

            try
            {
                var database = GetDatabase(queryModel.Connection);

                var response = database.RunCommandAsync((Command<BsonDocument>)queryModel.Query).Result;

                result.Response = Newtonsoft.Json.Linq.JObject.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(BsonTypeMapper.MapToDotNetValue(response)));
            }
            catch (Exception ex)
            {
                result.Error = ex.Message;
            }

            return result;
        }

        private static IMongoDatabase GetDatabase(string connectionString)
        {
            var mongoUrl = new MongoUrl(connectionString);
            var client = new MongoClient(mongoUrl);
            return client.GetDatabase(mongoUrl.DatabaseName);
        }
    }
}
