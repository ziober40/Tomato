using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Tomato.Helpers;
using Tomato.Models;

namespace Tomato.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApiHelper _apiHelper = new ApiHelper();

        [HttpPost]
        public async Task<JsonResult> PullHot(int page = 1)
        {
            const string linkIndex = "/Stream/Hot/";
            var appkey = "appkey,OeS7C0DVNQ,page," + page;
            var requestUri = linkIndex + appkey;
            const string httpAWykopPl = "http://a.wykop.pl";
            const string secret = "6VdblWCXvl";

            var bodyList = await _apiHelper.GetString(secret, httpAWykopPl, requestUri).ContinueWith(request =>
            {
                dynamic dynJson = JsonConvert.DeserializeObject(request.Result);
                return ReturnModels(dynJson);
            });

            return Json(bodyList);
        }


        [HttpPost]
        public async Task<JsonResult> PullTags(string tag, int page = 1)
        {
            var linkIndex = "/tag/" + tag + "/";
            var appkey = "appkey,OeS7C0DVNQ,page," + page;
            var requestUri = linkIndex + appkey;
            const string httpAWykopPl = "http://a.wykop.pl";
            const string secret = "6VdblWCXvl";

            var bodyList = await _apiHelper.GetJObject(secret, httpAWykopPl, requestUri).ContinueWith(request =>
            {
                dynamic dynJson = JsonConvert.DeserializeObject(request.Result.ToString());
                return ReturnModels(dynJson.items);
            });

            return Json(bodyList);
        }

        private static List<ReturnModel> ReturnModels(dynamic dynJson)
        {
            var list = new List<ReturnModel>();

            foreach (var item in dynJson)
            {
                try
                {
                    list.Add(
                        new ReturnModel
                        {
                            ImagePreview = item.embed.preview.ToString(),
                            Image = item.embed.url.ToString(),
                            Url = item.url,
                            Body = item.body,
                            Id = item.id,
                            VotesCount = item.vote_count,
                            CommentsCount = item.comment_count,
                            Date = item.date,
                            Gender = item.author_sex
                        });
                }
                catch (Exception)
                {
                    if (item.body != null)
                    {
                        list.Add(
                            new ReturnModel
                            {
                                ImagePreview = "",
                                Image = "",
                                Body = item.body,
                                Url = item.url,
                                Id = item.id,
                                VotesCount = item.vote_count,
                                CommentsCount = item.comment_count,
                                Date = item.date,
                                Gender = item.author_sex
                            });
                    }
                }
            }
            return list;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Graphs()
        {
            return View();
        }
    }
}