process.env.NODE_ENV='test';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../index'); 

describe("Signin Route Testing",()=>{
    beforeEach(done=>{
        const signUpBody={
            fullName: "Abhishek",
            email: "abhiyadav.ce@gmail.com",
            preferences: ["tesla","meta","google"],
            password:"Abhi@1332",
        }
        chai.request(server).post('/api/register').send(signUpBody).end((req,res)=>{
            done();
        });

    });
    it("1. Succesfull SignIn",done=>{
        const signInBody={
            email: "abhiyadav.ce@gmail.com",
            password:"Abhi@1332",
        }
        chai.request(server).post('/api/login').send(signInBody).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body.accessToken).to.not.be.null;
            expect(res.body.message).equal("Login SUccesfull");
            done();
        });
    });
    it("2. Validate if user enter wrong password ",done=>{
        const signInBody={
            email: "abhiyadav.ce@gmail.com",
            password:"Abhi@133",
        }
        chai.request(server).post('/api/login').send(signInBody).end((err,res)=>{
            expect(res.status).equal(401);
            expect(res.body.accessToken).to.be.null;
            expect(res.body.message).equal("Invalid Password !");
            done();
        });
    });
    it("3. Validate if user does not exist ",done=>{
        const signInBody={
            email: "abhiyadav4.ce@gmail.com",
            password:"Abhi@133",
        }
        chai.request(server).post('/api/login').send(signInBody).end((err,res)=>{
            expect(res.status).equal(404);
            expect(res.body.message).equal("User not found");
            done();
        });
    });
});
