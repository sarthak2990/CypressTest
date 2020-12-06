//import 'cypress/support/checkoutpage'

let apiEndpoint = 'https://api.fidel.uk/v1/'
let key = 'sk_test_d6aada01-9a2d-4f1b-be33-7cdcc920462b'
let programId

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe('Verify Brand Endpoint', () => {
    //  const {userCount} = require ('cypress/element/checkoutpage')
    // cy.ap
    let header = {
        'Content-Type': 'application/json',
        'fidel-key': key,
    }

   let name = "Brand" + makeid(5)

    it('Create Brand Post Request', function () {

        cy.request({
            method: 'POST',
            url: apiEndpoint + "brands",
            headers: header,
            body: {
                "name": name,
                "logoURL": "https://brand.com/brandlogo.png",
                "metadata": {
                    "customKey1": "customValue1",
                    "customKey2": "customValue2"
                }
            }
        }).then((response) => {
            // response.body is automatically serialized into JSON
            // here verify response code and th name of program created
            expect(response.status).to.eq(201)// true
            const ability_name = response.body.items[0];
            // fetchinf program id to be used on other tests/future tests
            programId = ability_name.id
            expect(ability_name.name).to.eq(name);
        })
    });

    it('Get Brand id', function () {
        cy.request({
            method: 'GET',
            url: apiEndpoint + "brands/" + programId,
            headers: header,
        }).then((response) => {
            expect(response.status).to.eq(200)// true
            const ability_name = response.body.items[0];
            expect(ability_name.name).to.eq(name);
            expect(ability_name.id).to.eq(programId);
        })
    });

    //TODO Commenting these tests for duplicate and delete as currently i am not sure how it will work but i believe they should be

/*    it('Create Duplictae Brand Post Request', function () {

        cy.request({
            method: 'POST',
            url: apiEndpoint + "brands",
            headers: header,
            body: {
                "name": name,
                "logoURL": "https://brand.com/brandlogo.png",
                "metadata": {
                    "customKey1": "customValue1",
                    "customKey2": "customValue2"
                }
            }
        }).then((response) => {
            // response.body is automatically serialized into JSON
            // here verify response code and th name of program created
            expect(response.status).to.eq(400)// true
            // const ability_name = response.body.items[0;
            // // fetchinf program id to be used on other tests/future tests
            // programId = ability_name.id
            expect(response.body.error.message).to.eq("Item already exists");
        })
    });

    it('Delete Brand', function () {
        cy.request({
            method: 'DELETE',
            url: apiEndpoint + "brands/" + programId,
            headers: header,
        }).then((response) => {
            expect(response.status).to.eq(204)// true
            // const ability_name = response.body.items[0];
            // expect(ability_name.name).to.eq(name);
            // expect(ability_name.id).to.eq(programId);
        })
    });*/
})