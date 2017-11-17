using System.Net.Http;
using System.Web.Http;

namespace Test.Controllers
{
    public class ProductApiController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(ProductDb.GetProducts());
        }

        public HttpResponseMessage Post([FromBody]Product value)
        {
            return ToJson(ProductDb.CreateProduct(value));
        }

        public HttpResponseMessage Put(long id, [FromBody]Product value)
        {
            return ToJson(ProductDb.UpdateProduct(value));
        }

        public HttpResponseMessage Delete(long id)
        {
            return ToJson(ProductDb.DeleteProduct(id));
        }
    }
}