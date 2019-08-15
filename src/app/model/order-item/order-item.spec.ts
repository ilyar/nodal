import {Item} from '../item/item';
import {Seller} from '../member/seller/seller';
import {OrderItem} from './order-item';
import {Order} from '../order/order';
import {Customer} from '../member/customer/customer';
import * as Util from '../../util/util';

describe('OrderItem', () => {
  beforeEach(() => {
    Util.sequenceClear();
  });

  it('should create an instance', () => {
    const entity = new OrderItem(
      100,
      new Item(),
      50,
      1,
      new Seller('bar'),
    );
    expect(entity).toBeTruthy();
    expect(entity.amount).toEqual(10000);
    expect(entity.feeMarket).toEqual(826);
    expect(entity.amountSeller).toEqual(9174);
    expect(entity.id).toEqual('O1-M1-SKU1');
  });
});
