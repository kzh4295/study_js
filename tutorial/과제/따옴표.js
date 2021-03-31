// ${...} 안에 표현식을 넣고 문자열을 포함한 전체 백틱을 감싸면,
// 평가된 표현식이 문자열로 반환된다.

let name = "ILya";

//표현식은 숫자 1입니다.
alert(`hello ${1}`); // hello 1

//표현식은 문자열 "name"입니다.
alert(`hello ${"name"}`); // hello name

//${...} 표현식 안에 변수가 들어가 있으므로, 변수값이 출력됨
alert(`hello ${name}`); // hello Ilya