var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res) {
	request('https://api.vk.com/method/friends.get?user_id=' + req.body.userid + '&fields=city', function (error, resp, body) {
		if (!error && resp.statusCode == 200) {
			var parsedBody = JSON.parse(body);
			var friends = parsedBody.response;
			
			friends.forEach(function(friend) {
				var testResult = '';
				
				// 111, 22222
				if (/(\d)\1{2,}/.test(friend.uid)) {
					var threeOrMore = true;
					testResult += '3 or more in a row! ';
				};
				
				// 69
				if (/69/.test(friend.uid)) {
					var sixtyNine = true;
					testResult += 'Porn alert! ';
				};
				
				// 1488
				if (/1488/.test(friend.uid)) {
					var nazi = true;
					testResult += 'Nazi alert! ';
				};
				
				// 1234512345, 1212
				if (/(?!(\d)\1{2,})(\d{2,}?)\2{1,}/.test(friend.uid)) {
					var pattern = true;
					testResult += 'Beautiful pattern! ';
				};
				
				// 1122
				if (/(?!(\d)\1{2,})(\d)\2(\d)\3/.test(friend.uid)) {
					var twoPairs = true;
					testResult += 'Two pairs! ';
				};
				
				if (threeOrMore || sixtyNine || nazi || pattern || twoPairs) {
					res.write(friend.first_name + ' ' + friend.last_name + ' ' + friend.uid + ': ' + testResult);
				}
			});
			
			res.end();
		};
	});
});

module.exports = router;