/**
	Jonathan Stassen - June 2015
	https://github.com/TheBox193/diningin-enhancements
	Feature requests: send a Slack, Email, or PR
	A quick set of enhancmetns to dingingin.com
	Eat it up!
**/

// var TAX = 0.1248;
var TAX = 0.105;
var options;

function menuHighlight() {
	$(".menu-item").each(function(){
		var t=$(this).closest("tr"),
		price = getPriceByEl( t ),
		priceWithTax = Number( price * ( 1 + TAX ) ).toFixed(2);
		if( priceWithTax <= ( Number(options.doHighlightUnderValue) || 11 ) )
			t.css("background-color","lightblue");
	});
}

function fixCheckout() {
	var chekcoutButton = $(".ibtnContinueBtnBev")[0];
	if(chekcoutButton && chekcoutButton !== "/checkout") {
		chekcoutButton.href = "/checkout";
	}
}

function getLoved() {
	var loved = [];
	$("#MostedLoved .menu-item-data").each(function(){
		loved.push(parseInt(this.textContent, 10));
	});
	return loved;
}

function setLoved(id) {
	getMenuItemElById(id)
		.find('.ItemName')
		.prepend('<span style="position: absolute; left: -4px;">❤️</span>');
}

function getPriceByEl(el) {
	return el.find(".ItemCost").text().replace(/[^0-9\.]+/g,"");
}

function getPriceById(id) {
	return getPriceByEl( getMenuItemElById(id) );
}

function getMenuItemElById(id) {
	return $('#'+id).closest("tr");
}

function showLoved() {
	var loved = getLoved();
	$.each(loved, function(index, id) {
		setLoved(id);
	});
}

chrome.storage.sync.get({
	doHighlightUnder: true,
	doHighlightUnderValue: 11,
	doShowHearts: true,
	doSkipDrinks: true,
	doRemoveBackground: false
}, function(items) {
	options = items;
	$(function() {
		setup();
	});
});

function setup() {
	if (options.doRemoveBackground) {
		document.body.style.background = 'white';
	}

	if (options.doHighlightUnder) {
		menuHighlight();
	}

	if (options.doShowHearts) {
		showLoved();
	}

	if (options.doSkipDrinks) {
		window.setInterval(fixCheckout, 250);
	}
}
