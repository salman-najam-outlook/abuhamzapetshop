using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class ForthSubCategoryVM
    {
        public int fsubCat_id { get; set; }
        public string name { get; set; }
        public Nullable<int> subCat_id { get; set; }
    }
}