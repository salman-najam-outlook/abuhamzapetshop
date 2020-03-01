import { NbMenuItem } from '@nebular/theme';
const user = JSON.parse(localStorage.getItem('user'));

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Main Menu',
    group: true,
  },
  {
    title: 'Products',
    icon: 'layout-outline',
    hidden: false,
    children: [
      {
        title: 'Add - Update',
        link: '/pages/products/addedit',
        hidden: (user.userRoll === "emp") ? true : false,
      },
      {
        title: 'Purchase',
        link: '/pages/products/purchase',
        hidden: (user.userRoll === "emp") ? true : false,
      },
      {
        title: 'Sales',
        link: '/pages/products/sales',
      }
    ],
  },
  {
    title: 'Maintenance',
    icon: 'layout-outline',
    hidden: (user.userRoll === "emp") ? true : false,
    children: [
      {
        title: 'Users',
        link: '/pages/maintenance/users',
      },
      {
        title: 'Categories',
        link: '/pages/maintenance/categories',
      },
      {
        title: 'Suppliers',
        link: '/pages/maintenance/suppliers',
      },
      {
        title: 'Employees',
        link: '/pages/maintenance/employees',
      },
      {
        title: 'Payments',
        link: '/pages/maintenance/payments',
      }
    ],
  }
];
