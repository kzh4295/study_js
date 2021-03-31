# 문(statement)
- 어떤 작업을 수행하는 문법 구조(syntax  structure)와 명령어(command)
-  각 문은 서로 다른 줄에 작성하는 것이 일반적
-  줄 바꿈이 있다면 세미콜론 생략가능
-  대괄호 앞에는 세미콜론이 있다고 가정하지 않음

# "use strict" 
- 스크립트 최상단에 위치
- 코드를 클래스와 모듈을 사용해 구성한다면 "use strict"를 생략가능

# 변수명
- 카멜케이즈(소문자 시작) / 
- o : $ / _ /
- x : 숫자시작 / 중간 - / 예약어(let, return)

# typeof
typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)