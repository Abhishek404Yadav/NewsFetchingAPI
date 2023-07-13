const mongoose = require("mongoose");
const expect = require("chai").expect;
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const sinon = require("sinon");

describe("Creating documents in Db", () => {
  const user = new User({
    fullName: "Abhishek Yadav",
    email: "abhiyadav.ce@gmail.com",
    preferences: ["tesla", "meta", "google"],
    password: bcrypt.hashSync("Abhishek@2", 5),
  });
  it("1. Should save the user succesfully in db", (done) => {
    expect(user.isNew).equal(true); //isNew will turn false if data saved in the db
    user
      .save()
      .then((user) => {
        expect(user.isNew).equal(false);
        done();
      })
      .catch((err) => {
        done();
      });
  });
});

//Stubbing on Save function 
describe("Stubbing the user using sinon", () => {
    let saveStub;
    const user = new User({
        fullName: "Abhishek Yadav",
        email: "abhiyadav.ce@gmail.com",
        preferences: ["tesla", "meta", "google"],
        password: bcrypt.hashSync("Abhishek@2", 5),
      });
// stubbed the save function
  beforeEach(() => {
    saveStub = sinon.stub(User.prototype, "save"); 
  });
// restoring because can't stub the already stubbed function
  afterEach(() => {
    saveStub.restore();
  });

  it("1. Should stub the user and save succesfully", (done) => {
    //so mockUser is the user that has been expected to be store in DB it is neede to duplicate the id 
    const mockUser = {
      _id: "123",
      fullName: "Abhishek Yadav",
      email: "abhiyadav.ce@gmail.com",
    };
    saveStub.resolves(mockUser);
    // whenever save promise will resolve mockUser will be stored or can say passed in result
    user.save().then(result=>{
        expect(result).to.deep.equal(mockUser);
        expect(saveStub.calledOnce).to.be.true;
        done();
    })
  });
});
