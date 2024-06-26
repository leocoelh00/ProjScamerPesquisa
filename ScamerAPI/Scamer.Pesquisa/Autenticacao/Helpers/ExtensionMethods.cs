using API.Pesquisa.Autenticacao.Entities;
using System.Collections.Generic;
using System.Linq;

namespace API.Pesquisa.Autenticacao.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users) {
            return users.Select(x => x.WithoutPassword());
        }

        public static User WithoutPassword(this User user) {
            user.Password = null;
            return user;
        }
    }
}