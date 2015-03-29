using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            // Scrape links from wikipedia.org

            // 1.
            // URL: http://en.wikipedia.org/wiki/Main_Page
            System.Net.WebClient w = new WebClient();
            string s = w.DownloadString("http://en.wikipedia.org/wiki/Main_Page");

            // 2.
            foreach (LinkItem i in LinkFinder.Find(s))
            {
                Debug.WriteLine(i);
            }
        }
    }
}
