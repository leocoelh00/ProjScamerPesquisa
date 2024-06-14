using System;
using System.Collections.Generic;
using System.Text;

namespace API.Geral.Extensions
{
    public static class DateTimeExtensions
    {

        public static bool E_Feriado(this DateTime data)
        {
            DateTime[] feriados = new DateTime[11];
            String[] f = { "01/01", "21/04", "01/05", "07/09", "12/10", "02/11", "15/11", "25/12" };
            String[] fe = {"DIA DA CONFRATERNIZAÇÃO UNIVERSAL",
                            "TIRADENTES","DIA DO TRABALHO",
                            "DIA DA INDEPENDÊNCIA",
                            "DIA DA PADROEIRA DO BRASIL",
                            "DIA DE FINADOS",
                            "PROCLAMAÇÃO DA REPÚBLICA",
                            "NATAL",
                            "PASCOA",
                            "CARNAVAL",
                            "CORPUS CHRISTI"};

            feriados[0] = Convert.ToDateTime(f[0]);
            feriados[1] = Convert.ToDateTime(f[1]);
            feriados[2] = Convert.ToDateTime(f[2]);
            feriados[3] = Convert.ToDateTime(f[3]);
            feriados[4] = Convert.ToDateTime(f[4]);
            feriados[5] = Convert.ToDateTime(f[5]);
            feriados[6] = Convert.ToDateTime(f[6]);
            feriados[7] = Convert.ToDateTime(f[7]);

            DateTime[] d = CalculaPascoa(DateTime.Now.Year.ToString());

            feriados[8] = d[0];
            feriados[9] = d[1];
            feriados[10] = d[2];

            for (int i = 0; i < feriados.Length; i++)
            {
                if (data.Equals(feriados[i]))
                {
                    return true;
                }
            }

            return false;
        }

        public static bool E_Final_De_Semana(this DateTime data)
        {
            List<DayOfWeek> fim_de_semana = new List<DayOfWeek>() { DayOfWeek.Saturday, DayOfWeek.Sunday };
            return fim_de_semana.Contains(data.DayOfWeek);
        }

        public static bool E_Dia_Util(this DateTime data)
        {
            return !(E_Feriado(data) || E_Final_De_Semana(data));
        }

        public static DateTime Obter_Ultimo_Dia_Util_Do_Mes(this DateTime data)
        {
            DateTime last_day_mounth = DateTime.ParseExact(DateTime.Now.ToString(data.Year.ToString().PadLeft(4,'0') + data.Month.ToString().PadLeft(4, '0')) + "01", "yyyyMMdd", null).AddMonths(1).AddDays(-1);
            if (last_day_mounth.DayOfWeek == DayOfWeek.Monday) last_day_mounth = last_day_mounth.AddDays(-2);
            if (last_day_mounth.DayOfWeek == DayOfWeek.Saturday) last_day_mounth = last_day_mounth.AddDays(-1);
            if (E_Feriado(last_day_mounth)) last_day_mounth = last_day_mounth.AddDays(-1);
            return last_day_mounth;
        }

        public static DateTime Obter_Ultimo_Dia_Do_Mes(this DateTime data)
        {
            DateTime last_day_mounth = DateTime.ParseExact(data.ToString("yyyyMM") + "01", "yyyyMMdd", null).AddMonths(1).AddDays(-1);
            return last_day_mounth;
        }

        public static DateTime Obter_Primeiro_Dia_Do_Mes(this DateTime data)
        {
            DateTime first_day_mounth = DateTime.ParseExact(data.ToString("yyyyMM") + "01", "yyyyMMdd", null);
            return first_day_mounth;
        }

        private static DateTime[] CalculaPascoa(string Ano)
        {
            DateTime[] Data = new DateTime[3];
            int ano = Convert.ToInt32(Ano.Substring(0, 4));
            int x, y;
            int a, b, c, d, e;
            int dia, mes;


            DateTime pascoa, carnaval, corpus;


            if (ano >= 1900 & ano <= 2099)
            {
                x = 24;
                y = 5;
            }
            else
                if (ano >= 2100 & ano <= 2199)
            {
                x = 24;
                y = 6;
            }
            else
                    if (ano >= 2200 & ano <= 2299)
            {
                x = 25;
                y = 7;
            }
            else
            {
                x = 24;
                y = 5;
            }


            a = ano % 19;
            b = ano % 4;
            c = ano % 7;
            d = (19 * a + x) % 30;
            e = (2 * b + 4 * c + 6 * d + y) % 7;


            if ((d + e) > 9)
            {
                dia = (d + e - 9);
                mes = 4;
            }
            else
            {
                dia = (d + e + 22);
                mes = 3;
            }


            // PASCOA 
            pascoa = Convert.ToDateTime((Convert.ToString(dia) + "/" + Convert.ToString(mes) + "/" + ano));
            Data[0] = pascoa;


            // CARNAVAL ( PASCOA - 47 dias ) 
            carnaval = pascoa.AddDays(-47);
            Data[1] = carnaval;


            // CORPUS CHRISTI ( PASCOA + 60 dias ) 
            corpus = pascoa.AddDays(60);
            Data[2] = corpus;

            return Data;
        }

    }
}
