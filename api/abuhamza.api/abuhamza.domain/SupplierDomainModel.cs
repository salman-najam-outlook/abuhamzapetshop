﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class SupplierDomainModel
    {
        public int sup_id { get; set; }
        public string name { get; set; }
        public string company { get; set; }
        public string contact { get; set; }
        public Nullable<System.DateTime> date { get; set; }
    }
}
