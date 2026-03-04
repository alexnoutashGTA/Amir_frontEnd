import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  user: User = {
    username: '',
    email: '',
    address: ''
  };

  editingId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  submitForm() {
    if (this.editingId) {
      this.userService.updateUser(this.editingId, this.user).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    }
  }

  editUser(user: User) {
    this.editingId = user._id!;
    this.user = { ...user };
  }

  resetForm() {
    this.user = { username: '', email: '', address: '' };
    this.editingId = null;
  }
}
