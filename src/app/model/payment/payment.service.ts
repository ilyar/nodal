import {Injectable} from '@angular/core';
import {Payment} from './payment';
import {Order} from '../order/order';
import {Total} from '../transaction/total';
import {NodalBalance} from '../transaction/nodal-balance';
import {TransferService} from '../transaction/transfer.service';
import {Transfer} from '../transaction/transfer';
import {Seller} from '../member/seller/seller';
import {OrderItem} from '../order-item/order-item';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private collection: Map<string, Payment>;
  nodalBalance: NodalBalance;

  constructor(
    private transfer: TransferService,
  ) {
    this.collection = new Map();
    this.nodalBalance = new NodalBalance();
  }

  get transfers(): Transfer[] {
    return this.transfer.all();
  }

  find(id: string): Payment | null {
    return this.collection.get(id);
  }

  toPay(order: Order, gateway: string): void {
    const payment = new Payment(order, gateway);
    this.collection.set(payment.id, payment);
  }

  findNoCaptured(): Array<Payment> {
    return this.all().filter((payment: Payment) => payment.status !== 'captured');
  }

  findCaptured(): Array<Payment> {
    return this.all().filter((payment: Payment) => payment.status === 'captured');
  }

  totalCaptured(): Total {
    return this.findCaptured().reduce((total: Total, payment: Payment) => total.increment(payment), new Total());
  }

  total(): Total {
    return this.findNoCaptured().reduce((total: Total, payment: Payment) => total.increment(payment), new Total());
  }

  nodalSettlement(): void {
    this.nodalBalance.sellers.forEach((seller: Seller) => {
      if (seller.balance > 0) {
        this.transfer.send(seller.balance, seller.name);
        seller.balance = 0;
      }
    });
    this.nodalBalance.seller = 0;
    this.transfer.send(this.nodalBalance.market, 'MARKET');
    this.nodalBalance.market = 0;
    this.nodalBalance.total = 0;
  }

  gatewaySettlement(gateway: string = null, from: Date = null): void {
    // TODO add filter by gateway
    // TODO add filter by date from
    // TODO validate balance
    const nodalTotalPrev = this.nodalBalance.total;
    this.findNoCaptured().forEach((payment: Payment) => {
      payment.capture();
      this.nodalBalance.increment(payment);
    });
    this.transfer.send(this.nodalBalance.total - nodalTotalPrev, 'NA');
  }

  all(): Payment[] {
    return Array.from(this.collection.values()).reverse();
  }
}
