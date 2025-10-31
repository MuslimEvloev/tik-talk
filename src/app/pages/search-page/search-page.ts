import { Component, inject, signal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ProfileService } from '../../data/services/profile';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileFilters } from './profile-filters/profile-filters';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters, AsyncPipe],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.scss'],
})
export class SearchPage {
  protected readonly title = signal('tik-talk');
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
