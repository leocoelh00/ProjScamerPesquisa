using System;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace API.Geral.Extensions
{
    public static class DataTableExtensions
    {
        public static string Exportar_Para_Csv(this DataTable dataTable)
        {
            return Exportar_Para_Csv(dataTable, ";", true, true);
        }

        public static string Exportar_Para_Csv(this DataTable dataTable, bool header)
        {
            return Exportar_Para_Csv(dataTable, ";", header, true);
        }

        public static string Exportar_Para_Csv(this DataTable dataTable, string separator, bool header, bool aspas)
        {
            StringBuilder fileContent = new StringBuilder();

            if (header)
            {
                foreach (var col in dataTable.Columns)
                {
                    fileContent.Append(col.ToString() + separator);
                }

                fileContent.Replace(separator, System.Environment.NewLine, fileContent.Length - 1, 1);
            }

            foreach (DataRow dr in dataTable.Rows)
            {

                foreach (var column in dr.ItemArray)
                {
                    if (aspas)
                    {
                        fileContent.Append("\"" + column.ToString() + "\"" + separator);
                    }
                    else
                    {
                        fileContent.Append(column.ToString() + separator);
                    }
                }

                fileContent.Replace(separator, System.Environment.NewLine, fileContent.Length - 1, 1);
            }

            return fileContent.ToString();
            //System.IO.File.WriteAllText(filePath, fileContent.ToString());

        }

        public static string Exportar_Para_Html(this DataTable dt, string[] colunas)
        {
            StringBuilder strHTMLBuilder = new StringBuilder();

            strHTMLBuilder.Append("<table>");

            strHTMLBuilder.Append("<tr >");
            foreach (DataColumn myColumn in dt.Columns)
            {
                if (colunas.Contains(myColumn.ColumnName))
                {
                    strHTMLBuilder.Append("<td >");
                    strHTMLBuilder.Append(myColumn.ColumnName);
                    strHTMLBuilder.Append("</td>");
                }

            }
            strHTMLBuilder.Append("</tr>");


            foreach (DataRow myRow in dt.Rows)
            {

                strHTMLBuilder.Append("<tr >");
                foreach (DataColumn myColumn in dt.Columns)
                {
                    if (colunas.Contains(myColumn.ColumnName))
                    {
                        strHTMLBuilder.Append("<td >");
                        strHTMLBuilder.Append(myRow[myColumn.ColumnName].ToString());
                        strHTMLBuilder.Append("</td>");
                    }

                }
                strHTMLBuilder.Append("</tr>");
            }

            strHTMLBuilder.Append("</table>");

            string Htmltext = strHTMLBuilder.ToString();

            return Htmltext;
        }

        private static string getMaiusculo(string nome)
        {
            StringBuilder sb = new StringBuilder();
            try
            {
                foreach (string _p in nome.Split('_'))
                {
                    sb.Append(_p.Trim().Substring(0, 1).ToUpper() + _p.Trim().Substring(1) + " ");
                }
            }
            catch (Exception)
            {
                sb.Append(nome);
            }

            return sb.ToString();
        }
    }
}
