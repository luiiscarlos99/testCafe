import { ClientFunction } from 'testcafe';
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import searchresults from '../pages/SearchResultPage'
import productdetails from '../pages/ProductDetailsPage'
import cartpage from '../pages/CartPage'
import checkoutpage from '../pages/CheckoutPage'
import myorderpage from '../pages/MyOrdersPage'
 
const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var nome = 'Luis';
var sobrenome = 'Carlos';
var senha = '123456';
var userEmail = nome+sobrenome+randomNumber+'@test.com';
fixture`E2E Fixture`
    .page(URL);
 
test('Assert home page', async t => {
    await t
    .expect(getURL()).eql(URL)
    .takeScreenshot()
    .expect(homepage.subtitleHeader.exists).ok()
});

test("Place Order E2E Tests", async (t) => {
    await t
    .maximizeWindow()
    .click(homepage.RegisterLink)
    .expect(getURL()).contains('register')
    .click(registerpage.GenderOption)
    .typeText(registerpage.FirstName,nome)
    .typeText(registerpage.LastName,sobrenome)
    .typeText(registerpage.Email,userEmail)
    .typeText(registerpage.Password,senha)
    .typeText(registerpage.ConfirmPassword,senha)
    .click(registerpage.RegisterButton)
    .expect(registerpage.SuccessfullMessage.exists).ok();
    await homepage.search('Apple MacBook Pro 13-inch');
    await t
    .click(searchresults.productTitle)
    .expect(getURL()).contains('apple-macbook-pro-13-inch')
    .expect(productdetails.productPrice.exists).ok()
    .selectText(productdetails.prductQuantity).pressKey("delete")
    .typeText(productdetails.prductQuantity,'3')
    .click(productdetails.addToCart)
    .expect(productdetails.successMessage.exists).ok()
    .wait(3000)
    .click(homepage.CartLink)
    .click(cartpage.termsLabel)
    .click(cartpage.checkoutBtn)
    .expect(getURL()).contains('checkout');
    await checkoutpage.selectCountry('Brazil');
    await t
        .takeScreenshot()
        .typeText(checkoutpage.cityTxt,'Other')
        .typeText(checkoutpage.addressTxt,'Rua arroio sarandi 700')
        .typeText(checkoutpage.zipTxt,'08485461')
        .typeText(checkoutpage.phoneTxt,'332434345')
        .click(checkoutpage.continueBtn)
        .click(checkoutpage.nextDayOption)
        .click(checkoutpage.nextShippingBtn)
        .click(checkoutpage.nextPaymentBtn)
        .click(checkoutpage.nextConfirmBtn)
        .click(checkoutpage.confirmOrderBtn)
        .expect(checkoutpage.orderConfirmationMessage.exists).ok()
        .click(checkoutpage.viewOrderDetailsLink)
        .click(homepage.MyAccountLink)
        .click(myorderpage.orders);
});

test("Change Currency Test", async (t) => {
    await homepage.changeCurrency('Euro')
});