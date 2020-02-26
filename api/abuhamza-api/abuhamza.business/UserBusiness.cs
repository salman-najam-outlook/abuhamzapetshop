using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business
{
    public class UserBusiness : IUserBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly UserRepository userRepository;

        public UserBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            userRepository = new UserRepository(unitOfWork);
        }

        public async Task<List<tblUser>> GetUsers()
        {
            List<tblUser> uList = new List<tblUser>();
            uList = await userRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteUser(int id)
        {
            string status = "";
            if (id > 0)
            {
                await userRepository.Delete(u => u.user_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<UserDomainModel> GetUserById(int id)
        {
            UserDomainModel user = new UserDomainModel();
            var model = await userRepository.SingleOrDefault(u => u.user_id == id);
            if (model != null)
            {
                user = new UserDomainModel();
                user.user_id = model.user_id;
                user.firstname = model.firstname;
                user.lastname = model.lastname;
                user.userRoll = model.userRoll;
                user.status = model.status;
                user.username = model.username;
                user.email = model.email;
                user.contact = model.contact;
            }
            return user;
        }

        public async Task<string> AddUpdateUser(UserDomainModel user)
        {
            string status = "";
            if (user.user_id > 0)
            {
                tblUser userToUpdate = await userRepository.SingleOrDefault(u => u.user_id == user.user_id);
                if (userToUpdate != null)
                {
                    userToUpdate.firstname = user.firstname;
                    userToUpdate.lastname = user.lastname;
                    userToUpdate.username = user.username;
                    userToUpdate.password = user.password;
                    userToUpdate.email = user.email;
                    userToUpdate.contact = user.contact;
                    await userRepository.Update(userToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblUser userToAdd = new tblUser();
                userToAdd.firstname = user.firstname;
                userToAdd.lastname = user.lastname;
                userToAdd.username = user.username;
                userToAdd.password = user.password;
                userToAdd.email = user.email;
                userToAdd.status = user.status;
                userToAdd.userRoll = user.userRoll;
                userToAdd.contact = user.contact;
                await userRepository.Insert(userToAdd);
                status = "added";
            }
            return status;
        }
    }
}
