using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoShellApi.Models
{
    public class QueryModel
    {
        public string Connection { get; set; }
        
        public string Query { get; set; }
    }
}
