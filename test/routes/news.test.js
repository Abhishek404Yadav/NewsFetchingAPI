process.env.NODE_ENV='test';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../index'); 

describe("News Route Testing",()=>{
    let jwtToken='';
    
    beforeEach(done=>{
        const signUpBody={
            fullName: "Abhishek",
            email: "abhiyadav.ce@gmail.com",
            preferences: ["tesla","meta","google"],
            password:"Abhi@1332",
        }
        chai.request(server).post('/api/register').send(signUpBody).end((req,res)=>{
            const signInBody={
                email: "abhiyadav.ce@gmail.com",
                password:"Abhi@1332",
            }
            chai.request(server).post('/api/login').send(signInBody).end((err,loginRes)=>{
                jwtToken=loginRes.body.accessToken;
                done();
            });
        });

    });

    it("1. Succesfully Access to NewsAPI",done=>{
        chai.request(server).get("/api/news").set('authorization',`JWT ${jwtToken}`).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('news');
            done();
        });       
    });

    it("2. Validate if user passed wrong jwt ", (done) => {
        chai.request(server).get("/api/news").set('authorization',`JWT ${jwtToken}bhh`).end((err,res)=>{
            expect(res.status).equal(403);
            expect(res.body.message).equal("Invalid JWT Token");
            expect(res.body).to.not.have.property('news');
            done();
        });
      });
});