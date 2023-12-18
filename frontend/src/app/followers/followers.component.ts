import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FollowService } from '../services/follow/follow.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent {
  users: any[] = [];

  token = localStorage.getItem('token');
  user_id = localStorage.getItem('user_id');

  constructor(
    private userService: UserService,
    private followService: FollowService
  ) { }
  
  ngOnInit() {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    if (this.token && this.user_id) {
      try {
        this.followService
          .getFollowers(this.user_id, this.token)
          .subscribe((res) => {
            this.users = res;
            console.log(res);
          });
        // console.log(this.users);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Token not found.');
      return;
    }
  };
  followUser(userId: string) {
    // console.log('clicked');

    try {
      if (this.user_id !== null && this.token !== null) {
        this.followService
          .followUser(this.user_id, userId, this.token)
          .subscribe(
            () => {
              // Update the local user object or re-fetch the data
              const userToUpdate = this.users.find(
                (user) => user.user_id === userId
              );
              if (userToUpdate) {
                userToUpdate.isFollowed = true;
                userToUpdate.followersCount += 1; // Assuming you have a count property
              }
              this.fetchUsers();
            },
            (error) => {
              console.error('Failed to follow user:', error);
              // Handle error (e.g., show a notification to the user)
            }
          );
      } else {
        console.log('There is no token or user_id');
      }
    } catch (error) {
      console.log(error);
    }
  }
  unfollowUser(userId: string) {
    try {
      if (this.user_id !== null && this.token !== null) {
        this.followService
          .unfollowUser(this.user_id, userId, this.token)
          .subscribe(
            () => {
              // Update the local user object or re-fetch the data
              const userToUpdate = this.users.find(
                (user) => user.user_id === userId
              );
              if (userToUpdate) {
                userToUpdate.isFollowed = false;
                userToUpdate.followersCount -= 1; // Assuming you have a count property
              }
              this.fetchUsers();
            },
            (error) => {
              console.error('Failed to unfollow user:', error);
              // Handle error (e.g., show a notification to the user)
            }
          );
      } else {
        console.log('There is no token or user_id');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
