using Microsoft.EntityFrameworkCore;
using NDAccountManager.Models;

namespace NDAccountManager.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
            base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.AccountID);
                entity.Property(e => e.UserID).IsRequired(false);
                entity.Property(e => e.UserName).IsRequired();
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.Notes).IsRequired(false);
                entity.Property(e => e.IsPublic).IsRequired();
                entity.Property(e => e.AccountName).IsRequired(false);
                entity.Property(e => e.IsShared).IsRequired();
            });
        }
    }
}
