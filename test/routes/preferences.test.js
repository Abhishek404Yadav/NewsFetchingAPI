process.env.NODE_ENV='test';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../index'); 

describe("Preferences Route Testing",()=>{
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

    it("1. Succesfully Access to Preferences",done=>{
        chai.request(server).get("/api/preferences").set('authorization',`JWT ${jwtToken}`).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.preferences).to.be.deep.equal(["tesla","meta","google"]);
            done();
        });       
    });

    it("2. Validate if user passed wrong jwt ", (done) => {
        chai.request(server).get("/api/preferences").set('authorization',`JWT ${jwtToken}bhh`).end((err,res)=>{
            expect(res.status).equal(403);
            expect(res.body.message).equal("Invalid JWT Token");
            done();
        });
      });

    it("3. Succesfully updating the Preferences",done=>{
        const preferences= {preferences:["tesla","meta","flipkart"]};
        chai.request(server).put("/api/preferences").set('authorization',`JWT ${jwtToken}`).send(preferences).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.preferences).to.be.deep.equal(["tesla","meta","flipkart"]);
            done();
        });       
    });
});