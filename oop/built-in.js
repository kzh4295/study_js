console.log('math.random()', Math.random());
console.log('math.random()', Math.floor(3.9));

let MyMath = {
  PI:Math.PI,
  random:function(){
    return Math.random();
  },
  floor: function(val) {
    return Math.floor(val);
  }
}
console.log("MyMath.PI", MyMath.PI);