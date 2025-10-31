import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interfaces';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  [x: string]: any;
  http: HttpClient = inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course/';
  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);
  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}account/me`).pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseUrl}account/me`, profile);
  }

  uploadAvatar(file: any) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(`${this.baseUrl}account/upload_image`, fd);
  }

  filterProfile(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(`${this.baseUrl}account/accounts`, { params }).pipe(
      tap((res) => {
        return this.filteredProfiles.set(res.items);
      })
    );
  }
}
