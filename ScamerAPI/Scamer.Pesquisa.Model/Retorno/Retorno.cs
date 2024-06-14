using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scamer.Faculdade.Model.Retorno
{
    public class Retorno
    {
        public bool status { get; set; }
        public int statusCode { get; set; } = 200;
        public dynamic data { get; set; }
        public List<RetornoCritica> motivos_Critica { get; set; } = new List<RetornoCritica>();
    }
    public class RetornoCritica
    {
        public string propriedade { get; set; }
        public List<string> criticas { get; set; } = new List<string>();
    }
}
