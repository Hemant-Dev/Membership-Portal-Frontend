import { Routes } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
