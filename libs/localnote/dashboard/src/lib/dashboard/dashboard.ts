import { Component } from '@angular/core';
import { Button } from '@local-note/button';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [Button]
})
export class Dashboard {}
