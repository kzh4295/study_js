//다음 OR 연산의 결과는 무엇일까요?
alert(null || 2 || undefined); //2(왜? ||는 true부분을 출력, &&는 false부분을 출력)

// OR 연산자의 피연산자가 alert 라면?
alert( alert(1) || 2 || alert(3) ); //2(x)
(왜? alert메서드는 값을 반환하지 않고 , undefined를 반환)

//OR AND OR 연산자로 구성된 표현식
alert( null || 2 && 3 || 4 );
2 && 3 || 4 
//3 (왜?AND 연산자 &&의 우선순위는 ||보다 높습니다. 따라서 &&가 먼저 실행됩니다.

  // 2 && 3 = 3이므로, 문제에서 제시한 표현식은 아래와 같이 바꿔쓸 수 있습니다.
  
  // null || 3 || 4
  // 따라서 첫 번째 truthy인 3이 출력됩니다. )


// 사이 범위 확인하기
// let age;

// if (14<=age<=90) {
//   alert(14세이상 90세 이하)
// }
// ==================================
// 정답: 논리연산자를 써야햇군
// ==================================
if (age >=14 && age <=90);

//바깥 범위 확인하기
if (!(age >=14 && age <=90))
if(age <14 || age >90)

//if에 대한 고찰
if (-1 || 0) alert( 'first' ); //alert(o)
if (-1 && 0) alert( 'second' ); //alert(x)
if (null || -1 && 1) alert( 'third' ); //alert(o)

//로그인구현하기
//  

let userName = prompt("사용자 이름을 입력해주세요.", '');

if (userName == 'Admin') {

  let pass = prompt('비밀번호:', '');

  if (pass == 'TheMaster') {
    alert( '환영합니다!' );
  } else if (pass == '' || pass == null) {
    alert( '취소되었습니다.' );
  } else {
    alert( '인증에 실패하였습니다.' );
  }

} else if (userName == '' || userName == null) {
  alert( '취소되었습니다.' );
} else {
  alert( "인증되지 않은 사용자입니다." );
}




