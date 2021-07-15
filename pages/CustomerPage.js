import { Selector } from "testcafe";

class CustomerPage {

  constructor() {

    this.menuMobile = Selector('.block.block-account-navigation')
    this.ordersLink = Selector('a').withText('Orders')

    this.noOrdersLabel = Selector('div.no-data').withText('No orders');

  }

}

export default new CustomerPage();