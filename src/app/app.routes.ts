import { Routes } from '@angular/router';
import { UserComponent } from './Components/User/user/user.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ShowListComponent } from './Components/User/show-list/show-list.component';
import { UserFormComponent } from './Components/User/user-form/user-form.component';
import { ProductComponent } from './Components/Product/product/product.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';
import { ProductFormComponent } from './Components/Product/product-form/product-form.component';
import { GenderComponent } from './Components/Gender/gender/gender.component';
import { GenderFormComponent } from './Components/Gender/gender-form/gender-form.component';
import { GenderListComponent } from './Components/Gender/gender-list/gender-list.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'showList',
        component: ShowListComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'user-form',
        component: UserFormComponent
    },
    {
        path: 'user-form/:id',
        component: UserFormComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'product-form',
        component: ProductFormComponent
    },
    {
        path: 'product-form/:id',
        component: ProductFormComponent
    },
    {
        path: 'product-list',
        component: ProductListComponent
    },
    {
        path: 'gender',
        component: GenderComponent
    },
    {
        path: 'gender-form',
        component: GenderFormComponent
    },
    {
        path: 'gender-form/:id',
        component: GenderFormComponent
    },
    {
        path: 'gender-list',
        component: GenderListComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
