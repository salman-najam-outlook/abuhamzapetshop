using System.Web.Http;
using Unity;
using abuhamza_api.Models;
using abuhamza.business;
using abuhamza.business.Interface;
using abuhamza.repository.Infrastructure.Contract;
using abuhamza.repository.Infrastructure;

namespace abuhamza_api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IUserBusiness, UserBusiness>();
            container.RegisterType<ISupplierBusiness, SupplierBusiness>();
            container.RegisterType<ICustomerBusiness, CustomerBusiness>();
            container.RegisterType<IEmployeeBusiness, EmployeeBusiness>();
            container.RegisterType<IProductBusiness, ProductBusiness>();
            container.RegisterType<IPurchaseOrderBusiness, PurchaseOrderBusiness>();
            container.RegisterType<IDetailOrderBusiness, DetailOrderBusiness>();
            container.RegisterType<IMainCategoryBusiness, MainCategoryBusiness>();
            container.RegisterType<ICategoryBusiness, CategoryBusiness>();
            container.RegisterType<ISubCategoryBusiness, SubCategoryBusiness>();
            container.RegisterType<IAccountBusiness, AccountBusiness>();
            container.RegisterType<IForthSubCategoryBusiness, ForthSubCategoryBusiness>();
            container.RegisterType<ISalaryBusiness, SalaryBusiness>();
            container.RegisterType<ITransactionBusiness, TransactionBusiness>();
            container.RegisterType<IInvoiceBusiness, InvoiceBusiness>();
            container.RegisterType<IUnitOfWork, UnitOfWork>();
            config.DependencyResolver = new UnityResolver(container);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                 new { id = RouteParameter.Optional }
            );
        }
    }
}