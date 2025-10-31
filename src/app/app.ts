import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from './common-ui/profile-card/profile-card';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
