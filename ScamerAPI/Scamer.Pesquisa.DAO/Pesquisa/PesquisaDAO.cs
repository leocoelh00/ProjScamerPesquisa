using System.Reflection;
using System.Text;
using Dapper;
using Scamer.Faculdade.Model.Pergunta;

namespace Scamer.Faculdade.DAO.Pesquisa
{
    public class PesquisaDAO : Scamer.Pesquisa.Conexao.ConexaoMysql
    {
        ///<summary>
        /// Responsavel por trazer uma pesquisa em especifica
        /// </summary>
        /// <returns></returns>
        public Model.Pesquisa.Pesquisa Get_Pesquisa(int cd_Usuario_Pesquisa)
        {
            StringBuilder objSql = null;
            try
            {
                objSql = new StringBuilder();

                objSql.Append("  SELECT PG.CD_PERGUNTA,                                                            ");
                objSql.Append("         PG.DS_PERGUNTA,                                                            ");
                objSql.Append("         P.TP_PESQUISA                                                             ");
                objSql.Append("     FROM APPPESQUISA.PESQUISA AS P                                              ");
                objSql.Append("     INNER JOIN APPPESQUISA.PERGUNTA AS PG ON(P.CD_PESQUISA = PG.CD_PESQUISA)       ");
                objSql.Append("  WHERE P.CD_PESQUISA = @CD_USUARIO_PESQUISA                                     ");
                objSql.Append("     AND P.SN_ATIVA = 'S'                                                        ");
                
                base.AbrirConexao();

                return base.objMySqlConnection.QueryFirstOrDefault<Model.Pesquisa.Pesquisa>(objSql.ToString(), new
                {
                    CD_USUARIO_PESQUISA = cd_Usuario_Pesquisa,
                    
                });
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao executar sql:" + ex.Message);
            }
            finally
            {
                base.FecharConexao();
                objSql = null;
            }

        }

        public Model.Avaliacoes.Avaliacao Get_Media()
        {
            StringBuilder objSql = null;
            try
            {
                objSql = new StringBuilder();

                objSql.Append(" SELECT ROUND(AVG(nr_resposta),2) AS nr_Media_Avaliacao  ");
                objSql.Append(" FROM APPPESQUISA.PESQUISA_RESPOSTAS                     ");

                base.AbrirConexao();

                return base.objMySqlConnection.QueryFirstOrDefault<Model.Avaliacoes.Avaliacao>(objSql.ToString());
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao executar sql:" + ex.Message);
            }
            finally
            {
                base.FecharConexao();
                objSql = null;
            }
        }

        public bool Set_Validar_Login(string ds_Login, string ds_Senha)
        {
            StringBuilder objSql = null;
            try
            {
                objSql = new StringBuilder();

                objSql.Append(" SELECT DS_LOGIN,                                ");
                objSql.Append("        DS_SENHA                                 ");
                objSql.Append("         CD_PERMISSAO FROM APPPESQUISA.USUARIO u ");
                objSql.Append(" WHERE DS_LOGIN = @DS_LOGIN                      ");
                objSql.Append("       AND DS_SENHA = @DS_SENHA                  ");
                objSql.Append("       AND CD_PERMISSAO = 1                      ");
                base.AbrirConexao();

                var b_Login = base.objMySqlConnection.Query(objSql.ToString(), new
                {
                    DS_LOGIN = ds_Login,
                    DS_SENHA = ds_Senha
                });


                return b_Login.Count() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao executar sql:" + ex.Message);
            }
            finally
            {
                base.FecharConexao();
                objSql = null;
            }
        }
        
        ///<summary>
        ///Responsavel por incluir a avaliação inicial de uma pesquisa
        /// </summary>
        /// 
        public void Set_Incluir_Avaliacao_Satisfacao(PerguntaForm objPesquisaForm)
        {
            StringBuilder objSql = null;
            try
            {
                objSql = new StringBuilder();

                objSql.Append(" INSERT INTO APPPESQUISA.PESQUISA_RESPOSTAS (CD_PESQUISA, ");
                objSql.Append("                                            CD_PERGUNTA,  ");
                objSql.Append("                                            NR_RESPOSTA)  ");
                objSql.Append("                          VALUES(@CD_PESQUISA,            ");
                objSql.Append("                                 @CD_PERGUNTA,            ");
                objSql.Append("                                 @NR_RESPOSTA)            ");

                base.AbrirConexao();

                base.objMySqlConnection.Execute(objSql.ToString(), new
                {
                    NR_RESPOSTA = objPesquisaForm.nr_Resposta,
                    CD_PESQUISA = objPesquisaForm.cd_Usuario_Pesquisa,
                    CD_PERGUNTA = objPesquisaForm.cd_Pergunta
                });

            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao executar sql:" + ex.Message);
            }
            finally
            {
                base.FecharConexao();
                objSql = null;
            }
        }
    }

}