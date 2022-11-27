let chai = require('chai');
let chaiHttp = require('chai-http');

//Assertion Style
let should = chai.should();

chai.use(chaiHttp);

describe("GET all orders by ADMIN",() =>{
    it("It should get all orders", (done) => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
        chai.request('http://localhost:8000/api')
        .get("/order/list/5f50772dab0e1f6aecb915f4")
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .set({"Authorization": `Bearer ${token}`})
        .end((err,response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
         done();
        })
    })
})

describe("GET status of orders",() =>{
    it("It should get status of orders",(done) => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
        chai.request('http://localhost:8000/api')
        .get("/order/status-values/5f50772dab0e1f6aecb915f4")
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .set({"Authorization": `Bearer ${token}`})
        .end((err,response) => {
            response.should.have.status(200);
         done();
        })  
    })
})

describe("GET feedback of orders",() =>{
    it("It should get feedback of orders",(done) => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
        chai.request('http://localhost:8000/api')
        .get("/order/feedback/5f50772dab0e1f6aecb915f4")
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .set({"Authorization": `Bearer ${token}`})
        .end((err,response) => {
            response.should.have.status(200);
         done();
        })  
    })
})