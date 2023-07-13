const expect = require("chai").expect;
const joiValidate = require("../../validator/joiValidate");

const obj={
    fullName: "Abhishek",
    email: "abhiyadav.ce@gmail.com",
    preferences: ["tesla","meta","google"],
    password:"Abhi@1332",
}
describe("Checking Joi Module validator",function(){
    it('1. should validate the "obj" the data passed correctly',function(done){
        let result =joiValidate(obj);
        expect(result.value).to.deep.equal(obj);
        done();
    });
    it('2. Validate the deleting in field return an error',function(done){
        delete obj['preferences'];
        let result =joiValidate(obj);
        expect(result.error).to.not.be.undefined;
        done();
    });
    it('3. should return an error when email is missing',function(done){
        obj['preferences']=["tesla","meta","google"];
        obj['email']=""
        let result =joiValidate(obj);
        expect(result.error).to.not.be.undefined;
        expect(result.error.details[0].message).to.equal('"email" is not allowed to be empty');
        done();
    });
    it('4. should return an error when email is invalid',function(done){
        obj['email']="abh98.mc"
        let result =joiValidate(obj);
        expect(result.error).to.not.be.undefined;
        expect(result.error.details[0].message).to.equal('"email" must be a valid email');
        done();
    });
    it('5. should return an error when fullName is invalid',function(done){
        obj['email']="abhi121@gmail.com";
        obj['fullName']="ab12"
        let result =joiValidate(obj);
        expect(result.error).to.not.be.undefined;
        expect(result.error.details[0].message).to.equal('Name should not contain any special character or number');
        done();
    });
    it('6. should return an error when Password length is less than 8',function(done){
        obj['fullName']="Abhishek"
        obj['password']="Abhi12";
        let result =joiValidate(obj);
        expect(result.error).to.not.be.undefined;
        expect(result.error.details[0].message).to.equal('"password" length must be at least 8 characters long');
        done();
    });
    it('7. should return an error when Password is in invalid format',function(done){
        obj['password']="Abhi1235";
        let result =joiValidate(obj);
        expect(result.error).to.not.be.undefined;
        expect(result.error.details[0].message).to.equal('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
        done();
    });


});