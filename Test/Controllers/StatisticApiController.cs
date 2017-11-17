using System.Net.Http;

namespace Test.Controllers
{
    public class StatisticApiController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(ProductDb.GetTypeCounts());
        }
    }
}
