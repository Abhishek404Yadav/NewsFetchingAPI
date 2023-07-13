const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

before((done) => {
  const connectDB = async (done) => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/userTestdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connected to the database`);
      done();
    } catch (error) {
      console.error("Error connecting to the database:", error);
      done();
    }
  };
  connectDB(done);
});

beforeEach((done)=>{
  console.log("running before Each Testcases");
  mongoose.connection.collections.users.drop(()=>{
    done();
  });
});



after((done) => {
  mongoose.disconnect();
  console.log("TestDB disconnected");
  done();
});
