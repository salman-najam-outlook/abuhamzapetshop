using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class UserDomainModel
    {
        public int user_id { get; set; }
        public string password { get; set; }
        public string userRoll { get; set; }
        public string status { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string contact { get; set; }
    }
}
