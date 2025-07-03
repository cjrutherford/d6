import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CreateUserProfileDto {
    name: string;
    bio: string;
    profilePictureUrl: string;
}

export declare type ProfileType = {
  name: string;
  bio: string;
  profilePictureUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfile {
  private readonly baseUrl = '/api/user';

  constructor(private readonly http: HttpClient) { }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}`);
  }

  createUserProfile(profileData: CreateUserProfileDto) {
    return this.http.post(`${this.baseUrl}`, profileData);
  }

  updateUserProfile(profileData: CreateUserProfileDto) {
    return this.http.put(`${this.baseUrl}`, profileData);
  }

  deleteUserProfile() {
    return this.http.delete(`${this.baseUrl}`);
  }
}
