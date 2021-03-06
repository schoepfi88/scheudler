function scrolldown() {
	$("#scrollarea").animate({ scrollTop: 100000 }, "fast");
};

function start(time, send, loading){
	if (loading)
		startAfterLoading(time);
	else {
		if (!send){
			var scroll = document.getElementById('scrollarea');
			if (scroll != null){
				scroll.style.height = ($(window).height()-370).toString() + "px";
				var checkHeight = scroll.style.height.split("p")[0];
			}
		}
		if (document.getElementById('scrollarea') != null){
			// don't work on mobile phone
			scrolldown();
			var myVar = window.setTimeout(function() {
				var elem = document.getElementById('scrollarea');
				if (elem !== null){
					elem.scrollTop = elem.scrollHeight;
					// slow connections needs a longer timeout
					if (elem.scrollTop < 10){
						start2(2000);
					}
				}
			}, time);
		}
	}
};

function start2(time){
	var myVar2 = window.setTimeout(function() {
		var elem2 = document.getElementById('scrollarea');
		if (elem2 !== null){
			elem2.scrollTop = elem2.scrollHeight;
		}
	}, time);
};

function startAfterLoading(height){
	var myVar3 = window.setTimeout(function() {
		var elem3 = document.getElementById('scrollarea');
		elem3.scrollTop = height;
	}, 1000);
};