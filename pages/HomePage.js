import { Selector,t } from 'testcafe';

class HomePage{
    constructor() {
        this.subtitleHeader = Selector('h2').withText(
          'Welcome to our store'
        )
        this.RegisterLink =Selector('a.ico-register')
        this.LoginLink = Selector('a.ico-login')
        this.CartLink = Selector('a.ico-cart')
        this.MyAccountLink = Selector('a.ico-account')
        this.LogoutLink = Selector('a.ico-logout')
        this.currencyList = Selector("select#customerCurrency");
      }
      get productSearch() { 
        return Selector("input[id='small-searchterms']"); 
      } 

      async search(product) {
        await t.
        typeText(this.productSearch, product).
        wait(3000).
        pressKey('enter')
    }

    async changeCurrency(currency){
      const currencyOption = this.currencyList.find('option');
      await t
      .click(this.currencyList)
      .click(currencyOption.withText(currency));
  }
}
export default new HomePage();