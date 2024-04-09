import { Routes } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ShowListComponent } from './Components/show-list/show-list.component';

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
        path: 'user/:id',
        component: UserComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
