import { Component, OnInit } from '@angular/core';
// import { MasterService } from 'src/app/master/master.service';

@Component({
  selector: 'home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  entityCardList: Array<{ count: number, icon: string, name: string }> = [];

  constructor(
//    private masterService: MasterService,
) { }

  ngOnInit() {
//    this.getCountMaster1();
  }

/*
  getCountMaster1(): void {
    this.masterService.getCount().subscribe(length => {
      this.entityCardList.push({ count: length, icon: 'po-icon-table', name: 'registros da tabela 1' });
    });
  }
*/

}
