using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.Models;

namespace abuhamza_api.Controllers
{
    public class UsersController : ApiController
    {
        IUserBusiness userBusiness;        

        public UsersController(IUserBusiness _userBusiness)
        {
            userBusiness = _userBusiness;
        }

        // api/users/GetAllUsers
        // This Api call will get all users from the database
        [HttpGet]
        [Route("api/users/GetAllUsers")]
        public async Task<List<UserToReturnVM>> GetAllUsers()
        {
            List<UserToReturnVM> listUserVM = new List<UserToReturnVM>();
            List<tblUser> listUser = await userBusiness.GetUsers();
            AutoMapper.Mapper.Map(listUser, listUserVM);
            return listUserVM;
        }

        // api/users/GetUserById/1
        // This Api call will get single user from the database based on UserId
        [HttpGet]
        [Route("api/users/GetUserById/{id}")]
        public async Task<IHttpActionResult> GetUserById(int id)
        {
            UserToReturnVM userToReturnVM = new UserToReturnVM();
            UserDomainModel userDomainModel = await userBusiness.GetUserById(id);
            if (userDomainModel.user_id > 0)
            {
                AutoMapper.Mapper.Map(userDomainModel, userToReturnVM);
                return Ok(userToReturnVM);
            }
            return Ok(404);
        }

        // api/users/DeleteUser/{id}
        // This Api call will delete one user by given UserId
        [HttpDelete]
        [Route("api/users/DeleteUser/{id}")]
        public async Task<string> DeleteUser(int id)
        {
            return await userBusiness.DeleteUser(id);
        }

        // api/users/AddUpdateUser/{id}
        // This Api call will Add a new user in case if UserId is equal to zero else update the user.
        [HttpPost]
        [Route("api/users/AddUpdateUser")]
        public async Task<string> AddUpdateUser(UserVM userVM)
        {
            UserDomainModel userDM = new UserDomainModel();
            AutoMapper.Mapper.Map(userVM, userDM);
            return await userBusiness.AddUpdateUser(userDM);
        }

        [HttpGet]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/users/GetUsersClaims")]
        [Authorize]
        public UserToReturnVM GetDonorClaims()
        {
            DateTime dobClaim = DateTime.Now;
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;

            UserToReturnVM loggedInUser = new UserToReturnVM()
            {
                user_id = Convert.ToInt32(identityClaims.FindFirst("Userid").Value),
                username = identityClaims.FindFirst("Username").Value,
                firstname = identityClaims.FindFirst("Firstname").Value,
                lastname = identityClaims.FindFirst("Lastname").Value,
                email = identityClaims.FindFirst("Email").Value,
                contact = identityClaims.FindFirst("Contact").Value,
                userRoll = identityClaims.FindFirst("Userrole").Value,
                status = identityClaims.FindFirst("Status").Value,
            };
            return loggedInUser;
        }

    }
}
