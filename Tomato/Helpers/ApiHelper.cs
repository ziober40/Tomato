using System;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Tomato.Helpers
{
    public class ApiHelper
    {
        public async Task<JObject> GetJObject(string secret, string httpAWykopPl, string requestUri)
        {
            var requestHandler = new HttpClient {BaseAddress = new Uri(httpAWykopPl)};

            requestHandler.DefaultRequestHeaders.Add("apisign", CalculateMd5Hash(secret + httpAWykopPl + requestUri));

            try
            {
                var jsonString = await requestHandler.GetStringAsync(requestUri);
                var obj = JsonConvert.DeserializeObject(jsonString);
                return JObject.Parse(jsonString);
            }
            catch (WebException ex)
            {
                System.Diagnostics.Debug.WriteLine("WebRequest Error: " + ex.Message);
            }

            return null;
        }

        public async Task<string> GetString(string secret, string httpAWykopPl, string requestUri)
        {
            var requestHandler = new HttpClient { BaseAddress = new Uri(httpAWykopPl) };

            requestHandler.DefaultRequestHeaders.Add("apisign", CalculateMd5Hash(secret + httpAWykopPl + requestUri));

            try
            {
                return await requestHandler.GetStringAsync(requestUri);
            }
            catch (WebException ex)
            {
                System.Diagnostics.Debug.WriteLine("WebRequest Error: " + ex.Message);
            }

            return null;
        }

        public string CalculateMd5Hash(string input)
        {
            var md5 = MD5.Create();
            var inputBytes = Encoding.ASCII.GetBytes(input);
            var hash = md5.ComputeHash(inputBytes);
            var sb = new StringBuilder();

            foreach (var t in hash)
            {
                sb.Append(t.ToString("X2"));
            }
            return sb.ToString();
        }
    }
}