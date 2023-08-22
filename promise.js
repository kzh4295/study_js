승완이가 구현한 프로미스 해석하기!

// executor => executor 함수는 비동기 작업을 시작하고 해당 작업이 완료되면 resolve(pending -> fullfilled) 또는 reject(pending -> rejected) 함수를 호출하여 Promise의 상태를 결정하는 역할을 합니다.
// executor 함수 내부에서의 비동기 작업은 보통 타이머 함수(setTimeout), 네트워크 요청, 파일 읽기 등이 될 수 있습니다.
function Promise(executor) {
  // 프로미스 객체가 생성될 떄, 객체의 상태, 결과, 에러 , 리스터를 관리합니다.
  this.status = "pending";
  this.result = null;
  this.error = null;
  this.listeners = new Set();

  //executor 함수 내에서 resolve와 reject 현재 Promise 객체의 컨텍스트에 바인딩하여 전달합니다.
  // executor 함수 내에서 resolve를 호출하면(pending -> fullfilled) 해당 promise 상태와 결과값을 제어할 수 있습니다.
  // executor 함수 내에서 reject를 호출하면(pending -> rejected) 해당 promise 상태와 결과값을 제어할 수 있습니다.
  executor(this.resolve.bind(this), this.reject.bind(this));
}

// Promise 프로토타입 객체에 then 메서드를 추가하는 과정입니다.
// 두개의 매개변수 onFulfilled와 onRejected. 이들은 Promise가 이행될 때와 거부될 때 호출될 콜백 함수입니다.
Promise.prototype.then = function (onFulfilled, onRejected) {
  // fn() 함수는 then메서드 내부에서 정의되는 중간함수로 나중에 등록된 리스너로 사용됩니다.
  function fn() {
    // promise 객체의 상태가 fullfilled 인경우, onFulfilled 콜백함수를 호출하며 this.result 값을 인자로 전달합니다.
    // 비동기 작업이 완료되어 결과가 있을떄 해당 콜백함수가 실행됩니다.
    if (this.status === "fulfilled") {
      onFulfilled(this.result);
    }

    // promise 객체의 상태가 rejected인 경우,
    // onRejected 함수가 등록되어 있다면 해당 함수를 호출하며, this.error 값을 인자로 전달합니다. 그렇지 않은 경우에는 onRejected가 없을 때 this를 반환합니다. 이로써 catch가 없는 경우에도 체인을 유지할 수 있습니다.
    if (this.status === "rejected") {
      if (!onRejected) {
        return this;
      }
      onRejected(this.error);
    }
  }

  //  this.listener에 fn 함수를 바인딩하여 등록하는 부분입니다.
  // fn 함수는 상태 변화에 따라 호출 될 함수 리스트에 추가됩니다.
  this.listeners.add(fn.bind(this));

  // then 메서드는 this (현재의 Promise 객체)를 반환하여 메서드 체인을 가능하게 합니다. 이로써 연속적으로 then을 호출하거나 catch를 체인으로 연결할 수 있게 됩니다.
  return this;
};

// Promise의 프로토타입 객체에 catch 메서드를 정의하고 있는 부분입니다. 이 메서드는 onRejected 콜백 함수를 받아서 처리합니다.
Promise.prototype.catch = function (onRejected) {
  // fn 함수는 catch 메서드 내부에서 정의되는 중간 함수입니다. 이 함수는 나중에 등록된 리스너로 사용됩니다.
  function fn() {
    // 상태가 'rejected'가 아닌 경우에는 함수 실행을 중단하고 return하여 함수를 빠져나옵니다. 이로써 'rejected' 상태가 아닐 때는 아무런 동작도 하지 않습니다.
    if (this.status !== "rejected") {
      return;
    }

    // Promise 객체의 상태가 'rejected'일 때, 위 줄은 onRejected 콜백 함수를 호출하며 this.error 값을 인자로 전달합니다. 이로써 비동기 작업이 실패한 경우 해당 콜백 함수가 실행됩니다.
    onRejected(this.error);

    //catch 메서드 내에서 this (현재의 Promise 객체)를 반환하여 메서드 체인을 유지하게 합니다. 이로써 catch 메서드 또한 다른 메서드와 연결하여 사용할 수 있습니다.
    return this;
  }

  //  this.listener에 fn 함수를 바인딩하여 등록하는 부분입니다.
  // fn 함수는 상태 변화에 따라 호출 될 함수 리스트에 추가됩니다.
  this.listeners.add(fn.bind(this));
};

// Promise의 프로토타입 객체에 publish 메서드를 정의하고 있는 부분입니다.
Promise.prototype.publish = function () {
  // forEach 메서드를 사용하여 this.listeners에 등록된 모든 리스너 함수들을 순회합니다. 각 리스너 함수 listener를 실행시킵니다.
  this.listeners.forEach((listener) => {
    listener();
  });
};

// Promise의 프로토타입 객체에 resolve 메서드를 정의하고 있는 부분입니다.
// Promise 객체를 성공적으로 이행(resolve) 상태로 변경하고, 결과 값을 설정하여 미래의 then 콜백 함수에 전달하는 역할을 합니다.
Promise.prototype.resolve = function (value) {
  // resolve 메서드 내부에서 Promise 객체의 상태와 결과 값을 설정하는 부분입니다.
  // this.status를 "fulfilled"로 변경하여 Promise 객체의 상태를 이행 상태로 표시하고, this.result에 전달된 value 값을 저장합니다.
  // 이렇게 함으로써 비동기 작업의 결과를 나타내는 값이 Promise 객체에 설정됩니다.
  this.status = "fulfilled";
  this.result = value;

  // this.publish()는 등록된 리스너 함수들을 실행시켜 Promise 객체의 상태 변화를 알리는 역할을 합니다. publish 메서드를 호출함으로써 onFulfilled 콜백 함수들이 실행되게 됩니다.
  // 이로써 비동기 작업이 성공적으로 완료되어 결과가 있는 경우, then 메서드에 등록된 함수들이 실행되게 됩니다.
  this.publish();
};

// Promise의 프로토타입 객체에 reject 메서드를 정의하고 있는 부분입니다.
// 이 메서드는 Promise 객체를 거부(reject) 상태로 변경하고, 에러 정보를 설정하여 미래의 catch 콜백 함수에 전달하는 역할을 합니다.
Promise.prototype.reject = function (error) {
  // reject 메서드 내부에서 Promise 객체의 상태와 에러 정보를 설정하는 부분입니다.
  // this.status를 "rejected"로 변경하여 Promise 객체의 상태를 거부 상태로 표시하고, this.error에 전달된 error 값을 저장합니다.
  // 이렇게 함으로써 비동기 작업이 실패한 경우에 대한 에러 정보가 Promise 객체에 설정됩니다.
  this.status = "rejected";
  this.error = error;

  // 등록된 리스너 함수들을 실행시켜 Promise 객체의 상태 변화를 알리는 역할을 합니다. publish 메서드를 호출함으로써 onRejected 콜백 함수들이 실행되게 됩니다.
  this.publish();
};

// 비동기적인 상황을 시뮬레이션하여, 랜덤한 값을 생성하고 그에 따라 Promise 객체가 이행 또는 거부되는 예제입니다.
// 코드 실행 결과에 따라 resolve 또는 reject 상태로 이행된 Promise 객체의 상태에 따라 then 또는 catch 메서드를 통해 콜백 함수를 실행할 수 있습니다.

// Promise 생성자 함수는 콜백 함수를 인자로 받는데, 이 콜백 함수는 비동기 작업을 정의하고 그 결과에 따라 resolve 또는 reject 함수를 호출하여 Promise 객체의 상태를 결정합니다.
const num = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      resolve(randomNumber);
    } else {
      reject("0.5보다 작습니다.");
    }
  }, 600);
});
