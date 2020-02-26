using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class SubCategoryVM
    {
        public int subCat_id { get; set; }
        public string name { get; set; }
        public Nullable<int> cat_id { get; set; }

        //public virtual tblCategory tblCategory { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tblProduct> tblProducts { get; set; }
    }
}