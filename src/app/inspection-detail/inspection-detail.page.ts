import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.function';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
})
export class InspectionDetailPage implements OnInit {
  constructor(public config: CommonService) {}

  ngOnInit() {}
}
