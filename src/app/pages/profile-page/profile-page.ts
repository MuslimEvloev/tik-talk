import { Component, inject } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subscribable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { SvgIcon } from '../../svg-icon/svg-icon';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { PostFeed } from './post-feed/post-feed';
@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, RouterLink, SvgIcon, ImgUrlPipe, PostFeed],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  [x: string]: any;

  getAccount(id: any): any {
    throw new Error('Method not implemented.');
  }
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id == 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
