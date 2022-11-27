let chai = require('chai');
let chaiHttp = require('chai-http');

//Assertion Style
let should = chai.should();

chai.use(chaiHttp);

   describe("GET/api/products",() =>{
       it("It should get all products", (done) => {
           chai.request('http://localhost:8000/api')
           .get("/products")
           .end((err,response) => {
               response.should.have.status(200);
               response.body.should.be.a('array');
            done();
           })
       })
   })

   describe("GET/api/product",() =>{
    it("It should not get all products", (done) => {
        chai.request('http://localhost:8000/api')
        .get("/product")
        .end((err,response) => {
            response.should.have.status(404);
      done();
        })
    })
})

   describe("GET product by id",() =>{
       it("It should get single product",(done) =>{
           chai.request('http://localhost:8000/api')
           .get("/product/606189dad5f3f57b24043ead")
           .end((err,response) =>{
               response.should.have.status(200);
               response.body.should.be.a('Object');
               response.body.should.have.property('_id');
               response.body.should.have.property('name').eq('Here There & EveryWhere');
               response.body.should.have.property('price');
               response.body.should.have.property('quantity');
               done();
           })
       })
   })

   describe("GET categories related to products",() =>{
    it("It should get only those categories related to products",(done) =>{
        chai.request('http://localhost:8000/api')
        .get("/products/categories")
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body.length.should.be.eq(3);
            done();
        })
    })
})


describe("GET related product",() =>{
    it("It should get list of related product",(done) =>{
        chai.request('http://localhost:8000/api')
        .get("/products/related/606189dad5f3f57b24043ead")
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.should.be.a('array');           
            done();
        })
    })
})

describe("GET product's photo",() =>{
    it("It should get product's photo",(done) =>{
        chai.request('http://localhost:8000/api')
        .get("/product/photo/606189dad5f3f57b24043ead")
        .end((err,response) =>{
            response.should.have.status(200);                   
            done();
        })
    })
})

   describe("POST products",() =>{
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
    it("It should post new product",function () {
        const product = {
            name: "Sony TV",
            description: "LED TV with HD display",
            price:50000,
            sold:1,
            category: "5f3e9be2744fb28e0c73e932",
            quantity:20,
            shipping:true
        };
        
        chai.request('http://localhost:8000/api')
        .post('/product/create/5f50772dab0e1f6aecb915f4')
        .set({"Authorization": `Bearer ${token}`})
        .send(product)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .end((err,response) => {
            response.should.have.status(200);
            response.body.should.have.property('name').eq("Sony TV");
            done();
        })
           
        })
    });

    describe("POST products",() =>{
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s'
        it("It should not POST new product without name property",function () {
            const product = {
                description: "LED TV with HD display",
                price:50000,
                sold:1,
                category: "5f3e9be2744fb28e0c73e932",
                quantity:20,
                shipping:true
            };
            
            chai.request('http://localhost:8000/api')
            .post('/product/create/5f50772dab0e1f6aecb915f4')
            .set({"Authorization": `Bearer ${token}`})
            .send(product)
            .set('Content-Type','application/json')
            .set('Accept','application/json')
            .end((err,response) => {
                response.should.have.status(400);
                response.text.should.be.eq("All fields are required");
                done();
            })
               
            })
        });

    // describe("Delete the product", () =>{
    //     it("It should delete the product", (done) =>{
    //         let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s"
    //         chai.request("http://localhost:8000/api")
    //         .delete("/product/5f4ca4f1fee4fa4498eada9b/5f50772dab0e1f6aecb915f4")
    //         .set({"Authorization": `Bearer ${token}` })
    //         .end((err,response) =>{
    //             response.should.have.status(200);
    //             done();
    //         })
    //     })
    // })

    describe("Delete the product", () =>{
        it("It should not delete already deleted product", (done) =>{
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE1OTkxNDcwNjV9.tY0Vu_iqbX9zueIvq53QHx6N-0SAh86Lq8_irE0Co6s"
            chai.request("http://localhost:8000/api")
            .delete("/product/5f4ca4f1fee4fa4498eada9b/5f50772dab0e1f6aecb915f4")
            .set({"Authorization": `Bearer ${token}` })
            .end((err,response) =>{
                response.should.have.status(400);
                done();
            })
        })
    })

    describe("UPDATE products",() =>{
        it("It should update the product",function () {
            let prod= {
                name: "Carvaan updated"
            };
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzcyZGFiMGUxZjZhZWNiOTE1ZjQiLCJpYXQiOjE2MTcyNTk1MDh9.6uOkCeQPUZyGUVFWNY9FZZwxMY65bvaXZUJLQNglqYU'
            chai.request('http://localhost:8000/api')
            .put('/product/6061896fd5f3f57b24043eac/5f50772dab0e1f6aecb915f4')
            .send(prod)
            .set('Content-Type','application/json')
            .set('Accept','application/json')
            .set({"Authorization": `Bearer ${token}`})
            .end((err,response) => {
                response.should.have.status(200);
                done();
            })
               
        })
    });
