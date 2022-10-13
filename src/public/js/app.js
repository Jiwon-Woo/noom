// io function은 알아서 socket.io를 실행하고 있는 서버를 찾는다.
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");

  function backendDone(msg) {
	console.log(`The backend says: `, msg);
  }

  // 원하는 이벤트 이름(room) 아무거나 설정 가능
  // 그리고 인자(두번째)로 string뿐만 아니라 object를 보낼 수도 있다
  // 마지막 인자는 콜백함수로 프론트에서 전송해주면 서버에서 호출가능, 실행은 프론트엔드에서
  // 인자 개수에는 제한이 없음, 다 보낼 수 있음, 그러나 콜백함수는 무조건 마지막 함수여야함
  socket.emit("enter_room", { payload: input.value }, backendDone);

  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
