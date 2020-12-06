var urli = 'http://automationpractice.com/index.php'
var womenCategry = '#block_top_menu > ul > li:nth-child(1) > a'
var listView = '#list > a > i'
var firstDress = 'a[href="http://automationpractice.com/index.php?controller=cart&add=1&id_product=1&token=e817bb0705dd58da8db074c69f729fd8"]'
var listPrice = '#layer_cart_product_price'
var cross = '.cross'
var secondDress = 'a[href="http://automationpractice.com/index.php?controller=cart&add=1&id_product=2&token=e817bb0705dd58da8db074c69f729fd8"]'
var proceedToPay = '#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > a'
var finalPrice = '#total_price'

context('Verify Checkout Price', () => {
  //  const {userCount} = require ('cypress/element/checkoutpage')

    beforeEach(() => {
        cy.visit(urli)
    })

    it('Verify Checkout price for Ladies Dress', () => {
        cy.get(womenCategry).click();
        cy.window().scrollTo(0, 700)
        cy.get(listView).click()
        // add first dress
        cy.get(firstDress).click()
        //verify price of first dress
        cy.get(listPrice).should('have.text', '$16.51')
        // click cross
        cy.get(cross).click()
        //add second dress
        cy.get(secondDress).click()
        //verify second dress price
        cy.get(listPrice).should('have.text', '$27.00')
        // click proceed to pay
        cy.get(proceedToPay).click()
        cy.window().scrollTo(0, 700)
        //verify final price on checkout page
        cy.get(finalPrice).should('have.text', '$45.51')
    })

    it('should api test', function () {
        cy.request("http://automationpractice.com/index.php")
    });

})
