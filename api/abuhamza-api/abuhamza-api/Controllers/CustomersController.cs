using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.Models;

namespace abuhamza_api.Controllers
{
    //[Authorize]
    public class CustomersController : ApiController
    {
        ICustomerBusiness customerBusiness;

        public CustomersController(ICustomerBusiness _customerBusiness)
        {
            customerBusiness = _customerBusiness;
        }

        // api/users/GetAllUsers
        // This Api call will get all customers from the database
        [HttpGet]
        [Route("api/customers/GetAllCustomers")]
        public async Task<List<CustomerToReturnVM>> GetAllCustomers()
        {
            List<CustomerToReturnVM> listCustomerVM = new List<CustomerToReturnVM>();
            List<tblCustomer> listCustomer = await customerBusiness.GetCustomers();
            AutoMapper.Mapper.Map(listCustomer, listCustomerVM);
            return listCustomerVM;
        }

        // api/customers/GetCustomerById/1
        // This Api call will get single customer from the database based on Cus_id
        [HttpGet]
        [Route("api/customers/GetCustomerById/{id}")]
        public async Task<CustomerToReturnVM> GetCustomerById(int id)
        {
            CustomerToReturnVM customerToReturnVM = new CustomerToReturnVM();
            CustomerDomainModel customerDomainModel = await customerBusiness.GetCustomerById(id);
            AutoMapper.Mapper.Map(customerDomainModel, customerToReturnVM);
            return customerToReturnVM;
        }

        // api/customers/DeleteCustomer/{id}
        // This Api call will delete one customer by given cus_id
        [HttpDelete]
        [Route("api/customers/DeleteCustomer/{id}")]
        public async Task<string> DeleteCustomer(int id)
        {
            return await customerBusiness.DeleteCustomer(id);
        }

        // api/customers/AddUpdateCustomer/{id}
        // This Api call will Add a new customer in case if cus_id is equal to zero else update the customer.
        [HttpPost]
        [Route("api/customers/AddUpdateCustomer")]
        public async Task<string> AddUpdateUser(CustomerVM customerVM)
        {
            CustomerDomainModel customerDM = new CustomerDomainModel();
            AutoMapper.Mapper.Map(customerVM, customerDM);
            return await customerBusiness.AddUpdateCustomer(customerDM);
        }
    }
}
