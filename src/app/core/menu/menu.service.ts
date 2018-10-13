import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state?: string;
  name?: string;
  type: string;
  icon?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'Dashboard',
    type: 'link',
    icon: 'fas fa-tachometer-alt'
  },
  {
    state: 'subjects',
    name: 'Subjects',
    type: 'link',
    icon: 'fas fa-user-tie'
  },
  {
    state: 'posts',
    name: 'Posts',
    type: 'link',
    icon: 'fas fa-th-list'
  },
  {
    state: 'settings',
    name: 'Settings',
    type: 'link',
    icon: 'fas fa-cog'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
