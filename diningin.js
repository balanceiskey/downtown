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

function removeExtraneousElements() {
	var elementsToRemove = [
		/** Calendar */
		"#spnAddressInfo", // address
		"#MPSContent > #tabnav", // tabs
		"#mps_time_header_container", // delivery time

		/** Cart */
		"#ctl00_pageContentPlaceholder_cart_pnlTimeCart1", // delivery time
		"#menu_delivery_address", // address

		/** Menu */
		"#ctl00_pageContentPlaceholder_CRestaurantTopBar_imgIsPremier", // premier badge
		"#DIVAlertNote", // food alergies
		"#spnCategoryDDL", // catagory label
		// "#MenuPageMenu li:contains('ZAGAT')", // Zagat
		// "#MenuPageMenu li:contains('TIMES')", // Restraunt Times
		"#RestMenu td:contains('no prices')", // no prices pdf
		"#MostedLoved", // Most loved


		/** Checkout */
		"#payment_info_title_container", // label
		".tip_container", // tip
		"#pnlStepTipsCoupons .clear", // paddings
		"#menu_your_order_delivery_time", // delivery time
		".phone_number_email_container_item2 .email-receipts-message", // going green
		".checkout_left_container_mid_payment_method #menu_delivery_time", // delivery time
		".checkout_left_container_mid_payment_method #menu_delivery_loc", // delivery location
		".checkout_left_container_mid_payment_method .delivery_instructions_for_driver_container:last", // driver instructions (optional)
		".checkout_left_container_mid_payment_method #select_payment_method_container:contains('following options')", // number of people
		"#divPaymentContainer span:contains('is this')", // 'what is this'
		"#CartContainer #ctl01_pnlOrderPaymentMsg", // false positive success before success checkout
		".tip_coupon_gift_certificates_title", // delivery instructions title

		/** Footer */
		"#footer_container", // Footer
		"#InnerFooter_Container", // Footer
	];

	elementsToRemove.map(removeElement);
}

function removeExtraneousMenuSections() {
	var elementsToRemove = [
		".MenuList:contains('12 Cans of Diet Coke')", // Beverages
		".MenuList:contains('Large Catering Tongs')", // Options
		".MenuList:contains('Single Use Canned Heat')", // Service Items
	];

	elementsToRemove.map(removeElement);
}

function removeElement(el) {
	var $el = $(el) ;
	if ($el) {
		$el.remove();
	}
}
chrome.storage.sync.get({
	doHighlightUnder: true,
	doHighlightUnderValue: 11,
	doShowHearts: true,
	doSkipDrinks: true,
	doRemoveExtraneousElements: false,
	doRemoveExtraneousMenuSections: false,
	doRemoveBackground: true
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

	if (options.doRemoveExtraneousElements) {
		removeExtraneousElements();
	}

	if (options.doRemoveExtraneousMenuSections) {
		removeExtraneousMenuSections();
	}
}
