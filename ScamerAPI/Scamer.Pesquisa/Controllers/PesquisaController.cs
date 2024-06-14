using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scamer.Faculdade.DAO.Pesquisa;
using Scamer.Faculdade.Model.Retorno;

namespace Scamer.Faculdade.Controllers
{
    [Produces("application/json")]
    [ApiController]

    public class PesquisaFaculdadeController : ControllerBase
    {
        [HttpGet]
        [Route("V1/Pesquisa/Media/Avaliacoes")]
        public ActionResult Get_Media()
        {
            Retorno objRetorno = null;
            RetornoCritica objRetornoCritica = null;
            PesquisaDAO objPesquisaDAO = null;

            try
            {
                objRetorno = new Retorno();
                objRetornoCritica = new RetornoCritica();
                objPesquisaDAO = new PesquisaDAO();

                objRetorno.data = objPesquisaDAO.Get_Media();
                objRetorno.status = true;

                return Ok(objRetorno);
            }
            catch (Exception ex)
            {
                objRetorno.status = false;
                objRetornoCritica = new RetornoCritica();
                objRetornoCritica.criticas.Add("Ocorreu um erro ao Carregar a pesquisa. Erro: " + ex.Message);
                objRetorno.motivos_Critica.Add(objRetornoCritica);
                return Ok(objRetorno);
            }
        }

        [HttpPost]
        [Route("V1/Auth/{ds_Login}/{ds_Senha}")]
        public ActionResult Set_Login(string ds_Login, string ds_Senha)
        {
            Retorno objRetorno = null;
            RetornoCritica objRetornoCritica = null;
            PesquisaDAO objPesquisaDAO = null;
            Model.Login.Login objLogin = null;
            string Cpf = null;

            try
            {
                objLogin = new Model.Login.Login();
                objRetorno = new Retorno();
                objRetornoCritica = new RetornoCritica();
                objPesquisaDAO = new PesquisaDAO();


                objLogin.sn_Login = objPesquisaDAO.Set_Validar_Login(ds_Login,ds_Senha);

                objRetorno.data = objLogin;
                objRetorno.status = true;

                return Ok(objRetorno);
            }
            catch (Exception ex)
            {
                objRetorno.status = false;
                objRetornoCritica = new RetornoCritica();
                objRetornoCritica.criticas.Add("Ocorreu um erro ao Carregar a pesquisa. Erro: " + ex.Message);
                objRetorno.motivos_Critica.Add(objRetornoCritica);
                return Ok(objRetorno);
            }
        }
        /// <summary>
        /// Carrega as informa��es de uma pesquisa
        /// </summary>
        /// <param name="cd_Usuario_Pesquisa"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("V1/Pesquisa/{cd_Usuario_Pesquisa}")]

        public ActionResult Get_Pesquisa(int cd_Usuario_Pesquisa)
        {
            Retorno objRetorno = null;
            RetornoCritica objRetornoCritica = null;
            PesquisaDAO objPesquisaDAO = null;
            string Cpf = null;

            try
            {
                objRetorno = new Retorno();
                objRetornoCritica = new RetornoCritica();
                objPesquisaDAO = new PesquisaDAO();

                objRetorno.data = objPesquisaDAO.Get_Pesquisa(cd_Usuario_Pesquisa);
                objRetorno.status = true;

                return Ok(objRetorno);
            }
            catch (Exception ex)
            {
                objRetorno.status = false;
                objRetornoCritica = new RetornoCritica();
                objRetornoCritica.criticas.Add("Ocorreu um erro ao Carregar a pesquisa. Erro: " + ex.Message);
                objRetorno.motivos_Critica.Add(objRetornoCritica);
                return Ok(objRetorno);
            }
        }

        /// <summary>
        /// Responsavel por incluir a avalia��o referente a uma pergunta
        /// </summary>
        /// <param name="objPesquisaForm"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("V1/Pesquisa/Avaliacao")]

        public ActionResult Set_Incluir_Avaliacao_Satisfacao([FromBody] Model.Pergunta.PerguntaForm objPesquisaForm)
        {
            Retorno objRetorno = null;
            RetornoCritica objRetornoCritica = null;
            PesquisaDAO objPesquisaDAO = null;

            try
            {
                objRetorno = new Retorno();
                objRetornoCritica = new RetornoCritica();
                objPesquisaDAO = new PesquisaDAO();

                objPesquisaDAO.Set_Incluir_Avaliacao_Satisfacao(objPesquisaForm);
                              
                objRetorno.status = true;

                return Ok(objRetorno);
            }
            catch (Exception ex)
            {
                objRetorno.status = false;
                objRetornoCritica = new RetornoCritica();
                objRetornoCritica.criticas.Add("Ocorreu um erro ao avaliar a pesquisa. Erro: " + ex.Message);
                objRetorno.motivos_Critica.Add(objRetornoCritica);
                return Ok(objRetorno);
            }
        }
    }
}