﻿using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class CategoryToReturnVM
    {
        public int cat_id { get; set; }
        public string name { get; set; }
        public Nullable<int> mainCat_id { get; set; }

        public virtual tblMainCategory tblMainCategory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblSubCategory> tblSubCategories { get; set; }
    }
}