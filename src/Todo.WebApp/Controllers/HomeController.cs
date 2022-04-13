using Microsoft.AspNetCore.Mvc;

namespace TodoWebApp.WebApp.Controllers;

[Controller]
[Route("/")]

public class HomeController : Controller
{
	[Route("")]
	public ActionResult Index()
	{
		return View();
	}
}