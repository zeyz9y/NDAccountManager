using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using NDAccountManager.Models;
using System.Diagnostics;

namespace NDAccountManager.Controllers
{
    [AuthorizeForScopes(Scopes = new[] { "User.Read" })]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly GraphServiceClient _client;

        public HomeController(ILogger<HomeController> logger, GraphServiceClient graphClient)
        {
            _logger = logger;
            _client = graphClient;
        }

        public async Task<IActionResult> IndexAsync()
        {
            var user = await _client.Me.GetAsync();
            ViewBag.Name = user.DisplayName;

            if (User.IsInRole("Development"))
            {
                ViewBag.Role = "Development";
            }
            else if (User.IsInRole("Sale"))
            {
                ViewBag.Role = "Sales";
            }
            else if (User.IsInRole("Manager"))
            {
                ViewBag.Role = "Management";
            }
            else if (User.IsInRole("Support"))
            {
                ViewBag.Role = "Support";
            }

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
