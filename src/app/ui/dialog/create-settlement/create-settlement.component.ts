import {
  Component,
  OnInit,
} from '@angular/core';
import {
  DatePipe,
} from '@angular/common';
import { ModelService } from '../../../model/model.service';
import { VirtualDateService } from '../../../util/virtual-date.service';

@Component({
  selector: 'app-create-settlement',
  templateUrl: 'create-settlement.component.html',
  providers: [
    DatePipe,
  ]
})
export class CreateSettlementComponent implements OnInit {
  paymentGateway: string;
  settlementDate: string;
  dateMin: string;
  dateMax: string;

  constructor(
    private datePipe: DatePipe,
    public model: ModelService,
    private dateService: VirtualDateService,
  ) {
  }

  ngOnInit() {
    this.paymentGateway = this.model.paymentMethods[0];
    this.settlementDate = this.dateService.getValue();
    // TODO this.dateMin = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
    // TODO this.dateMax = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
  }

  toSettlement(): boolean {
    this.model.toSettlement(this.paymentGateway, new Date(this.settlementDate));
    return false;
  }
}
