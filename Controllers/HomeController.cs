using Microsoft.AspNetCore.Mvc;

namespace ToDoApi.Controllers
{
    [Controller]
    [Route("/")]
    public class HomeController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
    }
}