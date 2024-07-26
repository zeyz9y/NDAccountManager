using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDAccountManager.Data;
using NDAccountManager.Models;
using NDAccountManager.Services;

namespace NDAccountManager.Controllers
{
    [Authorize(Roles = "Manager,Development,Sales,Support")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IDataProtector _protector;
        private readonly IBackgroundJobClient _backgroundJobs;

        public AccountsController(ApplicationDbContext context, IDataProtectionProvider provider, IBackgroundJobClient backgroundJobs)
        {
            _context = context;
            _protector = provider.CreateProtector("AccountManagerTest.AccountsController");
            _backgroundJobs = backgroundJobs;
        }

        // GET: Accounts
        public async Task<IActionResult> Index()
        {
            return View(await _context.Accounts.ToListAsync());
        }

        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.AccountID == id);
            if (account == null)
            {
                return NotFound();
            }
            account.Password = _protector.Unprotect(account.Password);
            return View(account);
        }

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accounts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AccountID,UserID,AccountName,UserName,Password,Notes,IsPublic,IsShared")] Account account)
        {
            if (ModelState.IsValid)
            {
                account.UserID = User.Identity.Name;
                account.Password = _protector.Protect(account.Password);
                _context.Add(account);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            account.Password = _protector.Unprotect(account.Password);
            return View(account);
        }

        // POST: Accounts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AccountID,UserID,AccountName,UserName,Password,Notes,IsPublic,IsShared")] Account account, DateTime? expiryDate)
        {
            if (id != account.AccountID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    account.Password = _protector.Protect(account.Password);
                    _context.Update(account);
                    await _context.SaveChangesAsync();
                    if (account.IsShared)
                    {
                        var currentTime = DateTime.Now;
                        TimeSpan difference;
                        if (expiryDate.HasValue && expiryDate.Value > currentTime)
                        {
                            difference = expiryDate.Value - currentTime;
                            _backgroundJobs.Schedule<AccountService>(x => x.SetIsSharedToFalse(account.AccountID), TimeSpan.FromSeconds(difference.TotalSeconds));
                        }
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccountExists(account.AccountID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.AccountID == id);
            if (account == null)
            {
                return NotFound();
            }
            account.Password = _protector.Unprotect(account.Password);
            return View(account);
        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.AccountID == id);
        }
    }
}
