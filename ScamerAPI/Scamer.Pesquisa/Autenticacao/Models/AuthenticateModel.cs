using System.ComponentModel.DataAnnotations;

namespace API.Pesquisa.Autenticacao.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}