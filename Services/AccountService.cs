using NDAccountManager.Data;

namespace NDAccountManager.Services
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;

        public AccountService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SetIsSharedToFalse(int accountId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account != null)
            {
                account.IsShared = false;
                await _context.SaveChangesAsync();
            }
        }
    }
}
