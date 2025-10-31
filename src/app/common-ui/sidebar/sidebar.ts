import { Component, inject, Input } from '@angular/core';
import { SvgIcon } from '../../svg-icon/svg-icon';
import { NgFor, NgForOf } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIcon,
    NgForOf,
    SubscriberCard,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chat',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];
  active: string | string[] = [];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
