require('dotenv').config();
const { Model } = require('mongoose');
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true });

console.log('mongoose.connection.readyState: ' + mongoose.connection.readyState);

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const document = new Person({
    name: 'Joe',
    age: 70,
    favoriteFoods: ['carrot', 'cabbage']
  });
  document.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  // Person.findOne({ _id: personId }, (err, data) => {
  //   if (err) return console.log(err);
  //   done(null, data);
  // });
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.food.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) console.log(err);
      done(null, updatedPerson);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }, (err, updatedPerson) => {
      if (err) console.log(err);
      done(null, updatedPerson);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({name:1, age:0, favoriteFoods:1})
  .exec((err, data)=>{
    if (err) return console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
