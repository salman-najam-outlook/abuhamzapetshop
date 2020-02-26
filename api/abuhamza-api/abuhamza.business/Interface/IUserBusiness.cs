using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface IUserBusiness
    {
        Task<List<tblUser>> GetUsers();
        Task<string> DeleteUser(int id);
        Task<UserDomainModel> GetUserById(int id);
        Task<string> AddUpdateUser(UserDomainModel user);
    }
}
