using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class MainCategoryVM
    {
        public int mainCat_id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string unit { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCategory> tblCategories { get; set; }
    }
}