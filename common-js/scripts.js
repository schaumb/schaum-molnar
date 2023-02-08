(function ($) {

    "use strict";

	$('a[href="#"]').on('click', function() {
		return;
	});

	$('a').on('click', function(event) {
		var target = event.target.hash;
		doScrolling(target, 300);
	})

	countdownTime();
	
	$('[data-nav-menu]').on('click', toggleVisible);
	$('#main-menu>li>a').on('click', function() {
		$('#main-menu').removeClass('visible');
	});
	
	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)')
						  .exec(window.location.search);
	
		return (results !== null) ? results[1] || 0 : false;
	}

	if ($.urlParam('filled')) {
		$('#filledModal').modal()
	}
})(jQuery);

function doScrolling(element, duration) { 
	var startingY = window.pageYOffset;
	var elementY = getElementY(element);
	var diff = elementY - startingY;
	var start;
  
	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
	  if (!start) start = timestamp;
	  // Elapsed milliseconds since start of scrolling.
	  var time = timestamp - start;
	  // Get percent of completion in range [0, 1].
	  var percent = Math.min(time / duration, 1);
  
	  window.scrollTo(0, startingY + diff * percent);
  
	  // Proceed with animation as long as we wanted it to.
	  if (time < duration) {
		window.requestAnimationFrame(step);
	  }
	})
}

function getElementY(query) {
	if (query === '#' || query === '') return 0;
	return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
  }

function toggleVisible() {
	$($(this).data('nav-menu')).toggleClass('visible');
}

function countdownTime(){
	if(isExists('#clock')){
		date = Date.parse('12 August 2023 16:00:00 GMT+0200')
		$('#clock').countdown(date, function(event){
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><span class="title">%w</span> hét </div>'
				+ '<div class="time-sec"><span class="title">%d</span> nap </div>'
				+ '<div class="time-sec"><span class="title">%H</span> óra </div>'
				+ '<div class="time-sec"><span class="title">%M</span> perc </div>'
				+ '<div class="time-sec"><span class="title">%S</span> másodperc </div>'));
		});
	}
}

function isExists(elem) {
	return $(elem).length > 0;
}
