import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auftrag-item',
  templateUrl: './auftrag-item.component.html',
  styleUrls: ['./auftrag-item.component.scss']
})
export class AuftragItemComponent implements OnInit {
  @Input() value: any;

  constructor() { }

  ngOnInit(): void {
  }

}
