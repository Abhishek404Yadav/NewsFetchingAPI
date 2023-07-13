process.env.NODE_ENV='test';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../index'); 

describe("Signup Route Testing",()=>{
    const signUpBody={
        fullName: "Abhishek",
        email: "abhiyadav.ce@gmail.com",
        preferences: ["tesla","meta","google"],
        password:"Abhi@1332",
    }
    it("1. Succesfull SignUp",done=>{
        chai.request(server).post('/api/register').send(signUpBody).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body.message).equal("User created successfully");
            done();
        });
    });
});