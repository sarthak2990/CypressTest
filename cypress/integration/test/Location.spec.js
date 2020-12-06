//import 'cypress/support/checkoutpage'

let key = 'sk_test_d6aada01-9a2d-4f1b-be33-7cdcc920462b'
let programId
let brandId = '07d5b6b2-2812-4ada-8bb2-211cb88c88d5'
    let pgId = 'f0c8845f-0740-490e-94f2-e408f5480144'
let apiEndpoint = 'https://api.fidel.uk/v1/'

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe('Verify Location endpoint', () => {
    //  const {userCount} = require ('cypress/element/checkoutpage')
    // cy.ap
    let header = {
        'Content-Type': 'application/json',
        'fidel-key': key,
    }


    let address = "Program" + makeid(5)

    it('Location Post Request', function () {

        cy.request({
            method: 'POST',
            url: apiEndpoint + 'programs/'+pgId+'/locations',
            headers: header,
            body: {
                "address": address,
                "brandId": brandId,
                "city": "London",
                "countryCode": "GBR",
                "postcode": "W1D 3PX",
                "metadata": {
                    "customKey1": "customValue1",
                    "customKey2": "customValue2"
                },
                "searchBy": {
                    "merchantIds": {
                        "visa": ["1234567","7654321"],
                        "mastercard": ["1234567","7654321"]
                    }
                }
            }
        }).then((response) => {
            // response.body is automatically serialized into JSON
            // here verify response code and th name of program created
            expect(response.status).to.eq(201)// true
            const ability_name = response.body.items[0];
            // fetchinf program id to be used on other tests/future tests
            programId = ability_name.id
            expect(ability_name.address).to.eq(address);
        })
    });

    it('Get Location id', function () {
        cy.request({
            method: 'GET',
            url: apiEndpoint + "locations/" + programId,
            headers: header,
        }).then((response) => {
            expect(response.status).to.eq(200)// true
            const ability_name = response.body.items[0];
            expect(ability_name.address).to.eq(address);
            expect(ability_name.id).to.eq(programId);
        })
    });

})