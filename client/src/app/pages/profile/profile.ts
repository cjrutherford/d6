/**
 * Profile page component: displays and allows editing of the user's profile.
 * - Loads user profile data
 * - Supports editing username, bio, and profile photo
 */

import { Component, signal } from '@angular/core';
import { CreateUserProfileDto, ProfileType } from '../../services/user-profile';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message';
import { UsersService } from '../../services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(
    private readonly users: UsersService,
    private readonly messageService: MessageService,
  ) {
    this.loadProfile();
  }

  username = signal('johndoe');
  profilePhotoUrl = signal('https://placehold.co/120');
  bio = signal('This is a short bio about John Doe.');

  isEditing = signal(false);
  editedUsername = signal(this.username());
  editedBio = signal(this.bio());
  editedProfilePhotoUrl = signal(this.profilePhotoUrl());

  loadProfile() {
    this.users.getUsers().subscribe({
      next: (profile: ProfileType) => {
        if (profile) {
          this.username.set(profile.name ?? 'johndoe');
          this.bio.set(profile.bio ?? 'This is a short bio about John Doe.');
          let setProfile = profile.profilePictureUrl ?? 'https://placehold.co/120x120';

          // If it's a data URL, use as-is
          if (setProfile.startsWith('data:')) {
            // do nothing, use as-is
          }
          // If it's a relative path (starts with /), prepend your API host
          else if (setProfile.startsWith('/')) {
            setProfile = `https://your-api-host.com${setProfile}`;
          }
          // Otherwise, use as-is (absolute URL, etc.)

          this.profilePhotoUrl.set(setProfile);

          // Keep edited fields in sync if not editing
          if (!this.isEditing()) {
            this.editedUsername.set(this.username());
            this.editedBio.set(this.bio());
            this.editedProfilePhotoUrl.set(this.profilePhotoUrl());
          }
        }
      },
      error: (err: any) => {
        console.error('Error loading profile:', err);
        this.messageService.addMessage({
          content: 'Failed to load profile. Please try again later.' + err,
          type: 'error',
        });
      },
    })
  }

  onEdit() {
    this.isEditing.set(true);
    this.editedUsername.set(this.username());
    this.editedBio.set(this.bio());
    this.editedProfilePhotoUrl.set(this.profilePhotoUrl());
  }

  async onSave() {
    const createProfileDto: CreateUserProfileDto = {
      name: this.editedUsername(),
      bio: this.editedBio(),
      profilePictureUrl: this.editedProfilePhotoUrl(),
    };

    // Determine if this is a new profile or an update
    // If username and bio are both still the defaults, assume new profile
    const isNewProfile =
      this.username() === 'johndoe' &&
      this.bio() === 'This is a short bio about John Doe.';

    if (isNewProfile) {
      // Create new profile
      await firstValueFrom(this.userProfileService.createProfile(createProfileDto))
        .catch((err: any) => {
          console.error('Error creating profile:', err)
          this.messageService.addMessage({
            content: 'Failed to create profile. Please try again later.' + err,
            type: 'error',
          });
      });
    } else {
      // Update existing profile
      await firstValueFrom(this.users.updateUser(createProfileDto))
        .catch((err: any) => {
          console.error('Error updating profile:', err);
          this.messageService.addMessage({
            content: 'Failed to update profile. Please try again later.' + err,
            type: 'error',
          });
        });
      this.messageService.addMessage({
        content: 'Profile updated successfully!',
        type: 'success',
      });
    }

    // Update local state and exit edit mode
    this.username.set(this.editedUsername());
    this.bio.set(this.editedBio());
    this.profilePhotoUrl.set(this.editedProfilePhotoUrl());
    this.isEditing.set(false);
  }

  onCancel() {
    this.isEditing.set(false);
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedProfilePhotoUrl.set(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
