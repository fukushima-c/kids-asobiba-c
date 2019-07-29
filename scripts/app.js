//　通信ダミー
var serif = new Array();
serif[1] = "こんにちは";
serif[2] = "おはよう";
serif[3] = "いらっしゃいませ";
serif[4] = "御用でしょうか";
serif[5] = "寒いですか";
serif[6] = "それでは";

serif[7] = "タップされました";

//ランダムにダミー通信を表示
function msg() {
	var a = Math.floor(Math.random() * 6);
	$(".fukidashi").text(serif[a + 1]);
}

//プッシュ通信のメッセージを吹き出しに表示
function msg02(message) {
	$(".fukidashi").text(message);
}

	//プッシュ通信受信承認
Notification.requestPermission(function(status) {
	console.log('通知の許可：', status);
});
