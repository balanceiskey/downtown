/**
 * @license
 * @name diningin.enhancments
 * @description A quick set of enhancmetns to dingingin.com Eat it up!
 * @version 1.5.4
 * @author Jonathan Stassen <jstassen.com>
 * @see https://github.com/TheBox193/diningin-enhancements
 */

// var TAX = 0.1248;
var TAX = 0.115;
var options;
var lastCartTotal;

function menuHighlight() {
	var highlightThresholdValue = getHighlightThresholdValue();
	$(".menu-item").each(function(){
		var t=$(this).closest("tr"),
		price = getPriceByEl( t ),
		priceWithTax = Number( price * ( 1 + TAX ) ).toFixed(2);
		if( priceWithTax <= ( Number(highlightThresholdValue) || 11 ) ) {
			t.css("background-color", "lightblue");
		} else {
			t.css("background-color", "white");
		}
	});
}

function getHighlightThresholdValue() {
	return options.doHighlightUnderValue - getCartTotal();
}

function checkCartTotal () {
	var cartTotal = getCartTotal();
	if( cartTotal !== lastCartTotal ) {
		lastCartTotal = cartTotal;
		menuHighlight();
	}
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
		.prepend('<span style="position: absolute; left: -4px;">❤</span>');
}

function convertPriceStringToNumber(string) {
	return Number( string.replace(/[^0-9\.]+/g,"") );
}

function getPriceByEl(el) {
	return convertPriceStringToNumber( el.find(".ItemCost").text() );
}

function getCartTotal() {
	return convertPriceStringToNumber( $('.CartSubtotalLabel').text() );
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
		".mps_calendar_container > .mps_time_header_container", // delivery time

		/** Cart */
		"#ctl00_pageContentPlaceholder_cart_pnlTimeCart1", // delivery time
		"#menu_delivery_address", // address

		/** Menu */
		"#ctl00_pageContentPlaceholder_CRestaurantTopBar_imgIsPremier", // premier badge
		"#DIVAlertNote", // food alergies
		"#spnCategoryDDL", // catagory label
		// "#MenuPageMenu li:contains('ZAGAT')", // Zagat
		// "#MenuPageMenu li:contains('TIMES')", // Restraunt Times
		"#CartMid p:contains('item names')", // Click things to the left
		"#RestMenu td:contains('no prices')", // no prices pdf
		"#MostedLoved", // Most loved


		/** Checkout */
		"#payment_info_title_container", // label
		".tip_container", // tip
		"#pnlStepTipsCoupons > #order_total_container", // redundent total
		"#pnlStepTipsCoupons .clear", // paddings
		"#menu_your_order_delivery_time", // delivery time
		"#pnlBillingcode #lblBillingCode", // billing (optional)
		".phone_number_email_container_item2 .email-receipts-message", // going green
		".checkout_left_container_mid_payment_method #menu_delivery_time", // delivery time
		".checkout_left_container_mid_payment_method #menu_delivery_loc", // delivery location
		".checkout_left_container_mid_payment_method .delivery_instructions_for_driver_container:last", // driver instructions (optional)
		".checkout_left_container_mid_payment_method #select_payment_method_container:contains('following options')", // number of people
		"#divPaymentContainer span:contains('is this')", // 'what is this'
		"#CartContainer #ctl01_pnlOrderPaymentMsg", // false positive success before success checkout
		"#ctl01_pnlOrderPaymentMsg > .Default_message_box", // false positive success before success checkout
		".tip_coupon_gift_certificates_title", // delivery instructions title
		"#order_total_below_container", // redundent total
		".menu_your_order_container_top", // We alread know this is "our order"
		"#complete_process_my_order_container > #change_my_order_container", // Duplicate offer to change order

		".checkout_left_container_top", // border
		".checkout_left_container_bottom", // border

		/** Footer */
		"#footer_container", // Footer
		"#InnerFooter_Container", // Footer
	];

	elementsToRemove.map(removeElement);

	$('.checkout_left_container_mid_payment_method, .checkout_left_container_mid').css({'border': 'none' });
}

function removeExtraneousMenuSections() {
	var elementsToRemove = [
		".MenuList:contains('12 Cans of Diet Coke')", // Beverages
		".MenuList:contains('Large Catering Tongs')", // Options
		".MenuList:contains('Single Use Canned Heat')", // Service Items
	];

	elementsToRemove.map(removeElement);
}

function gfRestaurants() {
	var gfIDs = [
		1100807, // Doc B’s
		1329, // CPK
		1100769, // Slurping Turtle
		1101877, // Gaudi Café
		1100679, // Freshii
		1100320, // Rosebud Express
		1100193, // Goddess & Grocer
		1100251, // Meli Café
		// 1100759, // Meli Café // Removed, the other one seems the be the right one
		1002, // Big Bowl
		1100279, // Beer Bistro
		1194, // Portillo’s
		1100511, // Jersey Mikes
		1443, // Tiparos
		1101878, // Costa Vida
		1100183, // PF Chang
		1100167 // Wildfir
	];

	var rest = $('.mps_grid_table .actionItem');

	rest.each( function(index, item) {
		$item = $(item);
		var data = $item.children('.rdata');
		gfIDs.forEach( function(item) {
			if( data.text().search(" " + item) >0 ) {
				$item.append('<br><span style="color: #7FA64F;">(gf)<span>');
			}
		});
	});
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
	doRemoveBackground: true,
	doGfRestaurants: true
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
		window.setInterval(checkCartTotal, 1500);
	}

	if (options.doShowHearts) {
		showLoved();
	}

	if (options.doSkipDrinks) {
		window.setInterval(fixCheckout, 1000);
	}

	if (options.doRemoveExtraneousElements) {
		removeExtraneousElements();
	}

	if (options.doRemoveExtraneousMenuSections) {
		removeExtraneousMenuSections();
	}

	if (options.doGfRestaurants) {
		gfRestaurants();
	}
}
