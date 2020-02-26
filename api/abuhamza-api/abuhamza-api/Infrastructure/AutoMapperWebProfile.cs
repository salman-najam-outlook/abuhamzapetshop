using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Infrastructure
{
    public class AutoMapperWebProfile : AutoMapper.Profile
    {
        public AutoMapperWebProfile()
        {
            CreateMap<UserDomainModel, UserToReturnVM>();
            CreateMap<tblUser, UserToReturnVM>();
            //.ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.Id))
            //.ForMember(dto => dto.Firstname, opt => opt.MapFrom(src => src.Firstname))
            //.ForMember(dto => dto.Lastname, opt => opt.MapFrom(src => src.Lastname))
            //.ForMember(dto => dto.Username, opt => opt.MapFrom(src => src.Username))
            //.ForMember(dto => dto.Email, opt => opt.MapFrom(src => src.Email))
            //.ForMember(dto => dto.Contact, opt => opt.MapFrom(src => src.Contact));
            CreateMap<UserVM, UserDomainModel>();

            CreateMap<CustomerDomainModel, CustomerToReturnVM>();
            CreateMap<tblCustomer, CustomerToReturnVM>();
            CreateMap<CustomerVM, CustomerDomainModel>();

            CreateMap<EmployeeDomainModel, EmployeeToReturnVM>();
            CreateMap<tblEmployee, EmployeeToReturnVM>();
            CreateMap<EmployeeVM, EmployeeDomainModel>();

            CreateMap<SupplierDomainModel, SupplierToReturnVM>();
            CreateMap<tblSupplier, SupplierToReturnVM>();
            CreateMap<SupplierVM, SupplierDomainModel>();

            CreateMap<ProductDomainModel, ProductToReturnVM>();
            CreateMap<tblProduct, ProductToReturnVM>();
            CreateMap<ProductVM, ProductDomainModel>();

            CreateMap<PurchaseOrderDomainModel, PurchaseOrderToReturnVM>();
            CreateMap<tblPurchaseOrder, PurchaseOrderToReturnVM>();
            CreateMap<PurchaseOrderVM, PurchaseOrderDomainModel>();

            CreateMap<DetailOrderDomainModel, DetailOrderToReturnVM>();
            CreateMap<tblDetailOrder, DetailOrderToReturnVM>();
            CreateMap<DetailOrderVM, DetailOrderDomainModel>();

            CreateMap<MainCategoryDomainModel, MainCategoryToReturnVM>();
            CreateMap<tblMainCategory, MainCategoryToReturnVM>();
            CreateMap<MainCategoryVM, MainCategoryDomainModel>();

            CreateMap<CategoryDomainModel, CategoryToReturnVM>();
            CreateMap<tblCategory, CategoryToReturnVM>();
            CreateMap<CategoryVM, CategoryDomainModel>();

            CreateMap<SubCategoryDomainModel, SubCategoryToReturnVM>();
            CreateMap<tblSubCategory, SubCategoryToReturnVM>();
            CreateMap<SubCategoryVM, SubCategoryDomainModel>();

            CreateMap<AccountDomainModel, AccountToReturnVM>();
            CreateMap<tblAccount, AccountToReturnVM>();
            CreateMap<AccountVM, AccountDomainModel>();

            CreateMap<ForthSubCategoryDomainModel, ForthSubCategoryToReturnVM>();
            CreateMap<tblForthSubCategory, ForthSubCategoryToReturnVM>();
            CreateMap<ForthSubCategoryVM, ForthSubCategoryDomainModel>();

            CreateMap<SalaryDomainModel, SalaryToReturnVM>();
            CreateMap<tblSalary, SalaryToReturnVM>();
            CreateMap<SalaryVM, SalaryDomainModel>();

            CreateMap<TransactionDomainModel, TransactionToReturnVM>();
            CreateMap<tblTransaction, TransactionToReturnVM>();
            CreateMap<TransactionVM, TransactionDomainModel>();

            CreateMap<InvoiceDomainModel, InvoiceToReturnVM>();
            CreateMap<tblInvoice, InvoiceToReturnVM>();
            CreateMap<InvoiceVM, InvoiceDomainModel>();
        }

        public static void Run()
        {
            AutoMapper.Mapper.Initialize(a =>
            {
                a.AddProfile<AutoMapperWebProfile>();
            });
        }
    }
}