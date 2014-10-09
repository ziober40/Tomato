using System;
using System.Collections;
using System.Collections.Generic;

namespace Tomato.Models
{
    public class ReturnModel
    {
        public string ImagePreview { get; set; }
        public string Image { get; set; }
        public string Body { get; set; }
        public string Url { get; set; }
        public string Id { get; set; }
        public int VotesCount { get; set; }
        public int CommentsCount { get; set; }
        public DateTime Date { get; set; }
        public string Gender { get; set; }
    }
}