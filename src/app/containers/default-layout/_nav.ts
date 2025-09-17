import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'BaseLine',
    url: '/baselines',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Table',
        url: '/baselines/tables',
      },
      {
        name: 'Category',
        url: '/baselines/categories',
      },
      {
        name: 'Menu',
        url: '/baselines/menus',
      },
      {
        name: 'Customer',
        url: '/baselines/customers',
      },
      {
        name: 'Store',
        url: '/baselines/stores',
      },
    ],
  },
];
