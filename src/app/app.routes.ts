import { Routes } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ShowListComponent } from './Components/show-list/show-list.component';
import { UserFormComponent } from './Components/user-form/user-form.component';

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
        path: '**',
        component: NotFoundComponent
    }
];
