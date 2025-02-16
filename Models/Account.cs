﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NDAccountManager.Models
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountID { get; set; }

        public string? UserID { get; set; }

        public string AccountName { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public string? Notes { get; set; }

        public bool IsPublic { get; set; }

        public bool IsShared { get; set; } 
    }
}
