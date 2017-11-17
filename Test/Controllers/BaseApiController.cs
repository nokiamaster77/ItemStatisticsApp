using Test.Repo;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Newtonsoft.Json;

namespace Test.Controllers
{
    public class BaseApiController : ApiController
    {
        protected readonly IRepository ProductDb = new SqliteRepository(new TestDbEntities("name=TestDbEntities"));

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
