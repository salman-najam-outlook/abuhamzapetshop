using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class MainCategoryDomainModel
    {
        public int mainCat_id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string unit { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tblCategory> tblCategories { get; set; }
    }
}
