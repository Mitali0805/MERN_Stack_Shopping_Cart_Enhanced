let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let cat = require('../routes/category');

//Assertion Style
let should = chai.should();

chai.use(chaiHttp);

describe("GET/api/categories",() =>{
    it("It should get all categories", (done) => {
        chai.request('http://localhost:8000/api')
        .get("/categories")
        .end((err,response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
         done();
        })
    })
})

describe("GET/api/category",() =>{
    it("It should not get all categories", (done) => {
        chai.request('http://localhost:8000/api')
        .get("/category")
        .end((err,response) => {
            response.should.have.status(404);
         done();
        })
    })
})


describe("GET category by id",() =>{
    it("It should get single category",(done) =>{
        chai.request('http://localhost:8000/api')
        .get("/category/5f3e9be2744fb28e0c73e932")
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.should.be.a('Object');
            response.body.should.have.property('name').eq('Electronics');
            done();
        })
    })
})

describe("It will not give category by id",() =>{
    it("ID is wrong",(done) =>{
        chai.request('http://localhost:8000/api')
        .get("/category/5f3e9be2744fb28e0c73e93")
        .end((err,response) =>{
            response.should.have.status(400);
            response.body.should.be.a('Object');
        done();
        })
    })
})

// describe("POST categories",() =>{
//     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
//     it("It should post new category",function (done) {
//         let category = {
//             name: "Furniture"
//         };
        
//         chai.request('http://localhost:8000/api')
//         .post('/category/create/5f50772dab0e1f6aecb915f4')        
//         .set({"Authorization": `Bearer ${token}`})        
//         .set('Content-Type','application/json')
//         .set('Accept','application/json')
//         .send(category)
//         .end((err,response) => {
//             response.should.have.status(200);
//             done();
//         })
           
//         })
//     });

     

    describe("UPDATE category ",() =>{
        it("It should update given category",(done) =>{
            let categ = {
               name:'Clothing'
            }
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
            chai.request('http://localhost:8000/api')
            .put("/category/5f72d9c2321abadae07ee7f9/5f50772dab0e1f6aecb915f4")
            .send(categ)
            .set('Content-Type','application/json')
            .set('Accept','application/json')
            .set({"Authorization": `Bearer ${token}`})
            .end((err,response) =>{
                response.should.have.status(200);
                done();
            })
        })
    })

    // describe("DELETE category ",() =>{
    //     it("It should delete given category",(done) =>{
    //         let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
    //         chai.request('http://localhost:8000/api')
    //         .delete("/category/5f72e28a328b6335a56da271/5f50772dab0e1f6aecb915f4")
    //         .set({"Authorization": `Bearer ${token}`})
    //         .end((err,response) =>{
    //             response.should.have.status(200);
    //             done();
    //         })
    //     })
    // })

    describe("DELETE category ",() =>{
        it("It should not delete already deleted category",(done) =>{
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
            chai.request('http://localhost:8000/api')
            .delete("/category/5f72e28a328b6335a56da271/5f50772dab0e1f6aecb915f4")
            .set({"Authorization": `Bearer ${token}`})
            .end((err,response) =>{
                response.should.have.status(400);
                done();
            })
        })
    })
