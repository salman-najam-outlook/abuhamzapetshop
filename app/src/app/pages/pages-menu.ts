import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Main Menu",
    group: true
  },
  {
    title: "Products",
    icon: "layout-outline",
    hidden: false,
    children: [
      {
        title: "Add - Update",
        link: "/pages/products/addedit"
      },
      {
        title: "Purchase",
        link: "/pages/products/purchase"
      },
      {
        title: "Sales",
        link: "/pages/products/sales"
      }
    ]
  },
  {
    title: "Maintenance",
    icon: "layout-outline",
    children: [
      {
        title: "Users",
        link: "/pages/maintenance/users"
      },
      {
        title: "Categories",
        link: "/pages/maintenance/categories"
      },
      {
        title: "Suppliers",
        link: "/pages/maintenance/suppliers"
      },
      {
        title: "Customers",
        link: "/pages/maintenance/customers"
      },
      {
        title: "Employees",
        link: "/pages/maintenance/employees"
      },
      {
        title: "Payments",
        link: "/pages/maintenance/payments"
      },
      {
        title: "Accounts",
        link: "/pages/maintenance/accounts"
      },
      {
        title: "Advances",
        link: "/pages/maintenance/advances"
      }
    ]
  }
];
