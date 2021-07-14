import { ClientFunction } from 'testcafe';
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import loginpage from '../pages/LoginPage';
import customerpage from '../pages/CustomerPage';

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var nome = 'Luis';
var sobrenome = 'Carlos';
var senha = '123456';
var userEmail = nome+sobrenome+randomNumber+'@test.com';

fixture`Registration Fixture`
    .page(URL);
 
test('Assert home page', async t => {
    await t
    .expect(getURL()).eql(URL)
    .takeScreenshot()
    .expect(homepage.subtitleHeader.exists).ok()
});

test('User Registration and Login Test',async t => {
 await t
     .click(homepage.RegisterLink)
     .expect(getURL()).contains('register')
     .click(registerpage.GenderOption)
     .typeText(registerpage.FirstName,nome)
     .typeText(registerpage.LastName,sobrenome);
     await registerpage.selectDay('12');
     await registerpage.selectMonth('February');
     await registerpage.selectYear('1999');
     await t
     .typeText(registerpage.Email,userEmail)
     .typeText(registerpage.Password,senha)
     .typeText(registerpage.ConfirmPassword,senha)
     .click(registerpage.RegisterButton)
     .expect(registerpage.SuccessfullMessage.exists).ok()
     .click(homepage.LogoutLink) 
     .click(homepage.LoginLink)
     .expect(loginpage.accountHeader.exists).ok()
     .typeText(loginpage.emailInput,userEmail)
     .typeText(loginpage.passwordInput,senha)
     .click(loginpage.submitButton)
     .click(homepage.MyAccountLink)
     .expect(customerpage.ordersLink.exists).ok()
     .click(customerpage.ordersLink)
     .expect(customerpage.noOrdersLabel.exists).ok()
     .takeScreenshot();    
})