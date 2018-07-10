$(document).ready(function(){

	var getDate = function(){

		var d = new Date(),
			year = d.getFullYear(),
			month = d.getMonth(),
			day = d.getDate();
			if (day <= 9) day='0'+day,
			hrs = d.getHours(),
			min = d.getMinutes();
			// sec = d.getSeconds();
		var monthArray = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
		// var actualDate = day + ' ' + monthArray[month] + ' ' + year + ', ' + hrs + ' hours ' + min + ' min';
		var actualDate = `${day} ${monthArray[month]} ${year}, ${hrs} hours ${min} min`; // ES6
		return actualDate;
	} 

	var countTweets = function(){
		var tweetCounter = $('.tweet-card').length - 1;
		$('#tweetCounter').text(tweetCounter);
	}

	// взяли готовий обработчик ссилок https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
	var wrapURLs = function (text, new_window) {
	  var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
	  var target = (new_window === true || new_window == null) ? '_blank' : '';
	  
	  return text.replace(url_pattern, function (url) {
	    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
	    var href = protocol_pattern.test(url) ? url : 'http://' + url;
	    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
	  });
	};

	var createTweet = function(date, text){
		var $tweetBox = $('<div class="card tweet-card">'); 
		var $tweetDate = $('<div class="tweet-date">').text(date);
		var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>');
		// wrapInner('<p></p>')  бере внутрішній контент блока=div-a (!) і обертає його
		
		// робимо текст твітів різного шрифту в залежності від довжини самого твіту
		var additionalClassName = '';
		if (text.length < 100){
			additionalClassName = 'font-size-large';
		}
		else if (text.length > 150){
			additionalClassName = 'font-size-small';
		}
		else {
			additionalClassName = 'font-size-normal';
		}
		$tweetText.addClass(additionalClassName);

		// додаємо твіт в стрічку
		$tweetBox.append($tweetDate).append($tweetText);
		$('#tweetsList').prepend($tweetBox);	

		countTweets();
	}

	// Створюємо базу твітів (виносимо їх з html кода) у вигляді масива об'єктів
	var tweetsBase = [
		{
			date: '07.07.2018',
			text: 'Have idea for my own twitter-switter.'
		},
		{
			date: '08.07.2018',
			text: 'Write front-end for my own  twitter-switter.'
		},
		{
			date: '09.07.2018',
			text: 'Finish front-end for my own  twitter-switter.'
		}
	];
	// Публікуємо твіти з бази
	tweetsBase.forEach(function(tweet){
		createTweet(tweet.date, tweet.text);
	});

	// Добавлення нового твіта на сторінку
	$('#postNewTweet').on('submit', function(e){
		e.preventDefault(); // шоби сторінка не обновлювалася
		var tweetText = $('#tweetText').val();
		createTweet(getDate(), tweetText);
		$('#tweetText').val(''); // очищаємо поле після добавлення твіта
	});

});

// console.log();