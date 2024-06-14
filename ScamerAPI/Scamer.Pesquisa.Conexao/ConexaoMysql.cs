using MySql.Data.MySqlClient;
using System;

namespace Scamer.Pesquisa.Conexao
{
    public class ConexaoMysql
    {
        protected MySqlConnection objMySqlConnection = null;
        protected MySqlCommand objMySqlCommand = null;
        protected MySqlDataAdapter objMySqlDataAdapter = null;
        protected MySqlTransaction objMySqlTransaction = null;

        public ConexaoMysql()
        {
            try
            {
                objMySqlCommand = new MySqlCommand();
                objMySqlDataAdapter = new MySqlDataAdapter();
            }
            catch (Exception ex)
            {
                throw (new Exception("Problema ao instanciar classe de conexão: " + ex.Message));
            }
        }

        protected void AbrirConexao()
        {
            try
            {
                objMySqlConnection = new MySqlConnection("Server=localhost;Database=APPPESQUISA;Uid=root;Pwd=@Ll070507");

                objMySqlConnection.Open();
            }
            catch (Exception ex)
            {
                throw (new Exception("Problema ao abrir conexão: " + ex.Message));
            }
        }

        protected void FecharConexao()
        {
            try
            {
                objMySqlConnection.Close();
            }
            catch (Exception ex)
            {
                throw (new Exception("Problema ao fechar conexão: " + ex.Message));
            }
        }
    }
}
