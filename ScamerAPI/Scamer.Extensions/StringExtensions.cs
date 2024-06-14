using API.Geral.Extensions.Types;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Criptografia = API.Geral.Extensions.Types.Criptografia;

namespace API.Geral.Extensions
{
    public static class StringExtensions
    {
        public static string Extrair_Primeiro_Nome(this String value)
        {
            try
            {
                string nome = PowerString.RemoveCaracteresEspeciais(value.Trim()).Trim().ToUpper();
                string reduz = nome.Remove(nome.IndexOf(' ')).Trim();
                if (reduz.Length > 1)
                {
                    return reduz.ToUpper().Substring(0, 1) + reduz.ToLower().Substring(1);
                }
                return reduz;
            }
            catch
            {
                return value;
            }
        }

        public static string Extrair_Ultimo_Nome(this String value)
        {
            try
            {
                string nome = PowerString.RemoveCaracteresEspeciais(value.Trim()).Trim().ToUpper();
                string reduz = nome.Split(' ')[nome.Split(' ').Length-1].Trim();
                if (reduz.Length > 1)
                {
                    return reduz.ToUpper().Substring(0, 1) + reduz.ToLower().Substring(1);
                }
                return reduz;
            }
            catch
            {
                return value;
            }
        }

        public static string Extrair_Somente_Numeros(this String value)
        {
            List<char> numbers = new List<char>("0123456789");
            StringBuilder toReturn = new StringBuilder(value.Length);
            CharEnumerator enumerator = value.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (numbers.Contains(enumerator.Current))
                    toReturn.Append(enumerator.Current);
            }

            return toReturn.ToString();
        }

        public static string Extrair_Caracteres_Especiais(this String value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                value = normalize(value);
                value = value.Normalize(NormalizationForm.FormD);
                StringBuilder sb = new StringBuilder();
                foreach (char c in value.ToCharArray())
                    if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                        sb.Append(c);
                return sb.ToString().Trim();
            }
            else
                return value;
        }

        public static int Transformar_Para_Numero_Inteiro(this String value)
        {
            return Convert.ToInt32(Extrair_Somente_Numeros(value));
        }

        public static bool E_Numero_Decimal_Valido(this String value)
        {
            try
            {
                List<char> numbers = new List<char>("0123456789.");
                StringBuilder toReturn = new StringBuilder(value.Length);
                CharEnumerator enumerator = value.GetEnumerator();

                if (value.Trim().Length < 1) return false;                

                while (enumerator.MoveNext())
                {
                    if (!numbers.Contains(enumerator.Current))
                        return false;
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool E_Numero_Inteiro_Valido(this String value)
        {
            try
            {
                List<char> numbers = new List<char>("0123456789");
                StringBuilder toReturn = new StringBuilder(value.Length);
                CharEnumerator enumerator = value.GetEnumerator();

                if (value.Trim().Length < 1) return false;

                while (enumerator.MoveNext())
                {
                    if (!numbers.Contains(enumerator.Current))
                        return false;
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool E_Nome_Valido(this String value)
        {
            try
            {
                if (value.Replace("  ", " ").Trim().Split(' ').Length > 1)
                {   //nenhuma parte do nome pode conter apenas 1 caracter
                    foreach (string part in value.Replace("  ", " ").Trim().Split(' '))
                    {
                        if (part.Length < 2 && !(new List<string> { "E", "D" }).Contains(part.ToUpper().Trim())) return false;
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        public static string Reduzir_Tamanho(this String value, int tamanho)
        {
            try
            {
                List<string> preposicoes = new List<string>();
                preposicoes.Add("DE");
                preposicoes.Add("DO");
                preposicoes.Add("DOS");
                preposicoes.Add("DA");
                preposicoes.Add("DAS");
                preposicoes.Add("E");

                string nome = PowerString.RemoveCaracteresEspeciais(value.Trim()).Trim().ToUpper();
                string[] pedacosDeNome = nome.Split(' ');
                StringBuilder nomeReduzido = new StringBuilder();


                if (nome.Length <= tamanho)
                {
                    nomeReduzido.Append(nome);
                }
                else
                {
                    List<int> abreviados = new List<int>();
                    int caracteresRemover = nome.Length - 25;
                    int caracteresConseguidos = 0;


                    for (int i = pedacosDeNome.Length - 2; i > 0; i--)
                    {
                        if (!preposicoes.Contains(pedacosDeNome[i].ToString().Trim()))
                        {
                            caracteresConseguidos += pedacosDeNome[i].ToString().Trim().Length - 1;
                            abreviados.Add(i);
                            if (caracteresConseguidos >= caracteresRemover) { break; }
                        }
                    }

                    for (int i = 0; i < pedacosDeNome.Length; i++)
                    {
                        if (abreviados.Contains(i))
                        { nomeReduzido.Append(pedacosDeNome[i].Substring(0, 1) + " "); }
                        else { nomeReduzido.Append(pedacosDeNome[i] + " "); }
                    }

                    if (nomeReduzido.ToString().Trim().Length > tamanho) throw new Exception("problema na função de nome reduzido");
                }

                return nomeReduzido.ToString().Trim();
            }
            catch (Exception)
            {
                if (value != null && value.Length > tamanho)
                { return value.Substring(0, tamanho); }
                else { return value; }
            }

        }

        public static string Reduzir_Para_Login(this String value, int tamanho)
        {
            try
            {
                List<string> preposicoes = new List<string>();
                preposicoes.Add("DE");
                preposicoes.Add("DO");
                preposicoes.Add("DOS");
                preposicoes.Add("DA");
                preposicoes.Add("DAS");
                preposicoes.Add("E");

                string _nome = PowerString.RemoveCaracteresEspeciais(value.Trim()).Trim().ToUpper();
                string[] pedacosDeNome = value.Split(' ');
                StringBuilder nomeReduzido = new StringBuilder();

                if (value.Length <= tamanho)
                {
                    return value.ToString().ToUpper().Trim();
                }
                else
                {
                    for (int i = 0; i < pedacosDeNome.Length; i++)
                    {
                        if (i == 0)
                        { nomeReduzido.Append(pedacosDeNome[i]); }
                        else if (!preposicoes.Contains(pedacosDeNome[i]))
                        {
                            nomeReduzido.Append(pedacosDeNome[i].Substring(0, 1));
                        }
                    }

                    if (nomeReduzido.ToString().Trim().Length > tamanho) throw new Exception("problema na função de nome reduzido");
                    return nomeReduzido.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return value.Substring(0, tamanho);
            }
        }

        public static bool E_Cpf_Valido(this String value)
        {
            return Cpf.ValidaCPF(value);
        }

        public static bool E_Matricula_Valida(this String value)
        {
            return Carteira.Matricula_e_valida(value);
        }

        public static bool E_CNPJ_Valido(this String value)
        {
            return Cpf.ValidaCPF(value);
        }

        public static bool E_PIS_Valido(this String value)
        {
            return PIS.IsPis(value);
        }

        public static bool E_CartaoNacionalSaude_valido(this String value)
        {
            return CartaoNacionalSaude.isValid(value);
        }

        public static bool E_Email_Valido(this String value)
        {
            return EMail.isMail(value);
        }


        public static string SomenteAlfanumericos(this String value)
        {
            value = normalize(value);
            List<char> numbers = new List<char>("0123456789 ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz");
            StringBuilder toReturn = new StringBuilder(value.Length);
            CharEnumerator enumerator = value.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (numbers.Contains(enumerator.Current))
                    toReturn.Append(enumerator.Current);
            }

            return toReturn.ToString();
        }

        public static string SomenteAlfanumericosPlus(this String value)
        {
            value = normalize(value.ToUpper());
            List<char> numbers = new List<char>("0123456789 ABCDEFGHIJKLMNOPQRSTUVXWYZ&:.-_?=!$%*");
            StringBuilder toReturn = new StringBuilder(value.Length);
            CharEnumerator enumerator = value.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (numbers.Contains(enumerator.Current))
                    toReturn.Append(enumerator.Current);
            }

            return toReturn.ToString();
        }

        public static string SomenteMailAlfanumericos(this String value)
        {
            value = normalize(value);
            List<char> numbers = new List<char>("0123456789@_-.ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz");
            StringBuilder toReturn = new StringBuilder(value.Length);
            CharEnumerator enumerator = value.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (numbers.Contains(enumerator.Current))
                    toReturn.Append(enumerator.Current);
            }

            return toReturn.ToString();
        }

        public static string SomenteAlfanumericosNrEndereco(this String value)
        {
            value = normalize(value);
            List<char> numbers = new List<char>("0123456789SNsn");
            StringBuilder toReturn = new StringBuilder(value.Length);
            CharEnumerator enumerator = value.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (numbers.Contains(enumerator.Current))
                    toReturn.Append(enumerator.Current);
            }

            return toReturn.ToString();
        }
        public static String normalize(String str)
        {
            /** Para a normalização dos caracteres de 32 a 255, primeiro caracter */
            char[] FIRST_CHAR =
                (" !'#$%&'()*+\\-./0123456789:;<->?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    + "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ E ,f'.++^%S<O Z  ''''.-"
                    + "-~Ts>o ZY !C#$Y|$'(a<--(_o+23'u .,1o>113?AAAAAAACEEEEIIIIDNOO"
                    + "OOOXOUUUUyTsaaaaaaaceeeeiiiidnooooo/ouuuuyty")
                    .ToCharArray();
            /** Para a normalização dos caracteres de 32 a 255, segundo caracter */
            char[] SECOND_CHAR =
                ("            ,                                               "
                    + "\\                                   $  r'. + o  E      ''  "
                    + "  M  e     #  =  'C.<  R .-..     ..>424     E E            "
                    + "   E E     hs    e e         h     e e     h ")
                    .ToCharArray();
            /**  
            * Efetua as seguintes normalizações para obtenção de certificados:  
            * - Elimina acentos e cedilhas dos nomes;  
            * - Converte aspas duplas em simples;  
            * - Converte algumas letras estrangeiras para seus equivalentes ASCII  
            * (como ß, convertido para ss)  
            * - Põe um "\" antes de vírgulas, permitindo nomes como  
            * "Verisign, Corp." e de "\", permitindo nomes como " a \ b ";  
            * - Converte os sinais de = para -  
            * - Alguns caracteres são removidos:  
            * -> os superiores a 255,  
            * mesmo que possam ser representados por letras latinas normais  
            * (como s, = U+015E = Latin Capital Letter S With Cedilla);  
            * -> os caracteres de controle (exceto tab, que é trocado por um espaço)  
            * @param str A string a normalizar.  
            * @return A string normalizada.  
            */
            char[] chars = str.ToCharArray();
            StringBuilder ret = new StringBuilder(chars.Length * 2);
            for (int i = 0; i < chars.Length; ++i)
            {
                char aChar = chars[i];
                if (aChar == ' ' || aChar == '\t')
                {
                    ret.Append(' '); // convertido para espaço   
                }
                else if (aChar > ' ' && aChar < 256)
                {
                    if (FIRST_CHAR[aChar - ' '] != ' ')
                    {
                        ret.Append(FIRST_CHAR[aChar - ' ']); // 1 caracter   
                    }
                    if (SECOND_CHAR[aChar - ' '] != ' ')
                    {
                        ret.Append(SECOND_CHAR[aChar - ' ']); // 2 caracteres   
                    }
                }
            }

            return ret.ToString();
        }

        public static bool telefoneValido(this String tel)
        {
            return Regex.IsMatch(tel, "\\d{10,11}") && !(
                    Regex.IsMatch(tel, "\\d{2}[1]{8,9}") || Regex.IsMatch(tel, "\\d{2}[2]{8,9}") ||
                    Regex.IsMatch(tel, "\\d{2}[3]{8}") || Regex.IsMatch(tel, "\\d{2}[4]{8,9}") ||
                    Regex.IsMatch(tel, "\\d{2}[5]{8,9}") || Regex.IsMatch(tel, "\\d{2}[6]{8,9}") ||
                    Regex.IsMatch(tel, "\\d{2}[7]{8,9}") || Regex.IsMatch(tel, "\\d{2}[8]{8,9}") ||
                    Regex.IsMatch(tel, "\\d{2}[9]{8,9}")
                    );
        }

        public static string Encode_Password(this String value)
        {
            return Criptografia.EncodePassword(value);
        }

        public static string Decode(this String value)
        {
            return Criptografia.Decrypt(value);
        }

        public static string Encode(this String value)
        {
            return Criptografia.Encrypt(value);
        }

        public static string Add_Paginacao_na_Query_Legado(this String value, int page = 1, int pageLength = 25)
        {
            StringBuilder objSql = new StringBuilder();

            objSql.Append(" select *                                                              ");
            objSql.Append("   from ( select rownum r_e_c_n_o_, t.*                                ");
            objSql.Append("           from(                                                       ");
            objSql.Append(value.ToString());
            objSql.Append("                ) t                      )                             ");
            objSql.Append(" WHERE r_e_c_n_o_ BETWEEN " + ((pageLength * (page - 1)) + 1)  + "     ");
            objSql.Append("              AND " + (pageLength * page)  + "                         ");

            return objSql.ToString();
        }

        public static string Add_Paginacao_na_Query(this String value, int page = 1, int pageLength = 25)
        {
            StringBuilder objSql = new StringBuilder();

            objSql.Append(value.ToString());
            objSql.Append("   LIMIT "+pageLength+ " OFFSET  " + (pageLength * (page - 1))  + " ");

            return objSql.ToString();
        }

        public static string Add_Nr_Registros_na_Query(this String value)
        {
            StringBuilder objSql = new StringBuilder();

            objSql.Append(" select  count(*) over (partition by 1) nr_Registros, tq.*  from (  ");
            objSql.Append(value.ToString());
            objSql.Append("                              ) tq                                       ");

            return objSql.ToString();
        }

        public static string Add_Count_Query_Nr_Registros(this String value)
        {
            StringBuilder objSql = new StringBuilder();

            objSql.Append(" select count(*)  nr_Registros  from (  ");
            objSql.Append(value.ToString());
            objSql.Append("       ) tq                                   ");

            return objSql.ToString();
        }

        /// <summary>
        /// GERA TOKEN ALFANUMÉRICO 
        /// </summary>
        /// <param name="iTamanho_Token">Indica o tamanho do token a ser gerado</param>
        /// <returns></returns>
        public static string Gerar_Token(this String value, int iTamanho_Token)
        {
            int Tamanho = iTamanho_Token; // Numero de digitos da token
            string senha = string.Empty;
            for (int i = 0; i < Tamanho; i++)
            {
                Random random = new Random();
                int codigo = Convert.ToInt32(random.Next(48, 122).ToString());

                // 0: números -> 48 ~ 57; 
                // 1: maiúsculas -> 65 ~ 90; 
                // 2: minúsculas -> 97 ~ 122;
                if ((codigo >= 48 && codigo <= 57) || (codigo >= 65 && codigo <= 90))
                {
                    string _char = ((char)codigo).ToString();
                    if (!senha.Contains(_char))
                    {
                        senha += _char;
                    }
                    else
                    {
                        i--;
                    }
                }
                else
                {
                    i--;
                }
            }
            return senha;
        }
    }
}
