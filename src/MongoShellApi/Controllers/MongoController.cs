using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoShellApi.Models;
using MongoShellApi.Services;

namespace MongoShellApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MongoController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { msg = "pong" });
        }

        [HttpPost("connect")]
        public IActionResult Connect([FromBody] QueryModel model)
        {
            var service = new MongoService();

            var result = service.IsLive(model.Connection);

            return Ok(new { connected = result });
        }

        [HttpPost]
        public IActionResult Post([FromBody] QueryModel model)
        {
            var service = new MongoService();

            var result = service.ExecuteQuery(model);

            return Ok(result);
        }
    }
}
