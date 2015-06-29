/**
	Jonathan Stassen - March 2015
	Feature requests, send a HipChat or Email
	A quick <$11 row highlighter for DiningIn.com
	Eat it up!
**/

function menuHighlight() {
	$(".menu-item").each(function(){
		var t=$(this).closest("tr"),
		e=t.find(".ItemCost").text().replace(/[^0-9\.]+/g,"");
		if( Number(e*1.105).toFixed(2) <= 11 )
			t.css("background-color","lightblue");
	});
}

function fixCheckout() {
	var chekcoutButton = $(".ibtnContinueBtnBev")[0];
	if(chekcoutButton && chekcoutButton !== "/checkout") {
		chekcoutButton.href = "/checkout";
	}
};

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

function getMenuItemElById(id) {
	return $('#'+id).closest("tr");
}

function showLoved() {
	var loved = getLoved();
	$.each(loved, function(index, id) {
		setLoved(id);
	})
}

function setup() {
	menuHighlight();
	showLoved();

	// meh
	window.setInterval(fixCheckout, 250);
}

$(function() {
	setup();
});