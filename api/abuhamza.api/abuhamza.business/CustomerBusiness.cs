using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business
{
    public class CustomerBusiness : ICustomerBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly CustomerRepository customerRepository;

        public CustomerBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            customerRepository = new CustomerRepository(unitOfWork);
        }
        public async Task<List<tblCustomer>> GetCustomers()
        {
            List<tblCustomer> uList = new List<tblCustomer>();
            uList = await customerRepository.GetAll();

            return uList;
        }
        public async Task<List<tblCustomer>> GetCustomersByAccountTypeId(int accType_ID)
        {
            string status = "";
            int condition = 0;
            if (condition > 0)
            {
                List<tblCustomer> l = new List<tblCustomer>();
                l = await customerRepository.GetAll();
            }

            List<tblCustomer> uList = new List<tblCustomer>();
            DataTable dt = new DataTable();

            using (SqlConnection conn = new SqlConnection(@"data source=207.246.92.23;initial catalog=abuhamzapetstore;user id=abuhamza;password=$Default123;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetCustomerByAccountTypeID", conn))
            {
                try
                {
                    SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                    adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapt.SelectCommand.Parameters.Add(new SqlParameter("@acc_TypeId", SqlDbType.Int));
                    adapt.SelectCommand.Parameters["@acc_TypeId"].Value = accType_ID;

                    adapt.Fill(dt);

                    uList = (from DataRow dr in dt.Rows
                             select new tblCustomer()
                             {
                                 cus_id = Convert.ToInt32(dr["cus_id"]),
                                 name = dr["name"].ToString(),
                                 date = Convert.ToDateTime(dr["date"]),
                                 contact = dr["contact"].ToString()
                             }).ToList();
                }
                catch (Exception ex)
                {

                    status = ex.Message;
                }
               
            }
            return uList;
        }
        public async Task<string> DeleteCustomer(int id)
        {
            string status = "";
            if (id > 0)
            {
                await customerRepository.Delete(c => c.cus_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<CustomerDomainModel> GetCustomerById(int id)
        {
            CustomerDomainModel customer = new CustomerDomainModel();
            var model = await customerRepository.SingleOrDefault(c => c.cus_id == id);
            if (model != null)
            {
                customer.cus_id = model.cus_id;
                customer.name = model.name;
                customer.contact = model.contact;
            }
            return customer;
        }

        public async Task<string> AddUpdateCustomer(CustomerDomainModel customer)
        {
            string status = "";
            if (customer.cus_id > 0)
            {
                tblCustomer customerToUpdate = await customerRepository.SingleOrDefault(c => c.cus_id == customer.cus_id);
                if (customerToUpdate != null)
                {
                    customerToUpdate.name = customer.name;
                    customerToUpdate.contact = customer.contact;
                    await customerRepository.Update(customerToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblCustomer customerToAdd = new tblCustomer();
                tblCustomer cust = new tblCustomer();
                cust = await customerRepository.SingleOrDefault(c => c.contact == customer.contact);

                if (cust != null)
                {

                }
                else
                {
                    customerToAdd.name = customer.name;
                    customerToAdd.contact = customer.contact;
                    customerToAdd.date = DateTime.Now;
                    await customerRepository.Insert(customerToAdd);
                    status = "added";
                }

            }
            return status;
        }
    }
}
