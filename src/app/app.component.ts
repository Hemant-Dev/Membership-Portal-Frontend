import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserComponent } from "./Components/user/user.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, UserComponent, RouterModule]
})
export class AppComponent {
  title = 'Membership-Portal-Frontend';
}
