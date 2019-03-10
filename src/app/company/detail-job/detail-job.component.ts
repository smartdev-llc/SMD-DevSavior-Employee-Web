import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {

  isLoading = false;
  constructor() { }

  ngOnInit() {
    console.log('log');

  }

  redirectToLogin(){

  }

}
