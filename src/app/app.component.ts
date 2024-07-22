import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiModule } from './ui/ui.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
