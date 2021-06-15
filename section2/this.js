console.log(this);
console.log(this === module.exports); // ReferenceError: module is not defined in ES module scope

function a() {
  console.log(this === global); // false
}
a();