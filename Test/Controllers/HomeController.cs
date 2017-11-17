using System.Web.Mvc;
using Test.Repo;

namespace Test.Controllers
{
    public class HomeController : Controller
    {
        //private readonly IRepository _dbRepo;

        //public HomeController()
        //{
        //    _dbRepo = new SqliteRepository(new TestDbEntities("name=TestDbEntities"));
        //}
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            //var products = _dbRepo.GetProducts();
            return View();
        }
    }
}
