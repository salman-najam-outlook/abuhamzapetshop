import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { User } from '../models/user.model';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu = [];
  user: User;
  newMenuItem: NbMenuItem[];

  constructor(private nbMenuService: NbMenuService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.newMenuItem = [
      {
        title: 'Main Menu',
        group: true,
      },
      {
        title: 'Dashboard',
        icon: 'layout-outline',
        link: '/pages/reports/dashboard',
        hidden: this.user.userRoll === 'emp' ? true : false,
      },
      {
        title: 'Products',
        icon: 'layout-outline',
        hidden: false,
        children: [
          {
            title: 'Add - Update',
            link: '/pages/products/addedit',
            hidden: this.user.userRoll === 'emp' ? true : false,
          },
          {
            title: 'Purchase',
            link: '/pages/products/purchase',
            hidden: false,
          },
          {
            title: 'Sales',
            link: '/pages/products/sales',
          },
        ],
      },
      {
        title: 'Maintenance',
        icon: 'layout-outline',
        hidden: this.user.userRoll === 'emp' ? true : false,
        children: [
          {
            title: 'Accounts',
            link: '/pages/maintenance/accounts',
          },
          {
            title: 'Advances',
            link: '/pages/maintenance/advances',
          },
          {
            title: 'Categories',
            link: '/pages/maintenance/categories',
          },
          {
            title: 'Employees',
            link: '/pages/maintenance/employees',
          },
          {
            title: 'Customers',
            link: '/pages/maintenance/customers',
          },
          {
            title: 'Payments',
            link: '/pages/maintenance/payments',
          },
          {
            title: 'Suppliers',
            link: '/pages/maintenance/suppliers',
          },
          {
            title: 'Transactions',
            link: '/pages/maintenance/transactions',
          },
          {
            title: 'Users',
            link: '/pages/maintenance/users',
          },
        ],
      },
    ];
    this.menu = this.newMenuItem;
  }
}
