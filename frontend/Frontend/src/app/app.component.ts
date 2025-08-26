import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CarMapComponent } from "./car-map/car-map.component";
import { AuthService } from './core/services/AuthService.service';
import { ToastComponent } from "./shared/components/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.fetchCurrentUser().subscribe(); 
  }

}
