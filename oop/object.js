let memberArray = ['ju', 'ji', 'hye'];
console.log(memberArray[1])

//객체는 이름있는 정보를 정리정돈할때 사용하는 도구
let memberObject = {
  manager: 'ji',
  developer : 'hye',
  designer : 'lee'
}

console.log(memberObject.designer);
console.log(memberObject['designer']);
delete memberObject.designer
console.log(memberObject);
