/**
 * @license
 * @name jira.enhancements
 * @description Making Jira suck less
 * @version 0.0.1
 * @author Matt Conzen <mattconzen.com>
 * @see https://github.com/TheBox193/diningin-enhancements
 */

 var QA_COLUMN_ID = 498;
 var BV_COLUMN_ID = 503;

var options;
var route = window.location.pathname.split('/');

var onDetailView = route.indexOf('sprout.atlassian.net/browse/') > -1;
var onBambuBoard = route.indexOf('sprout.atlassian.net/RapidBoard.jspa?rapidView=56') > -1;

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0; i<ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1);
//         if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
//     }
//     return "";
// }
//
// var user = getCookie('EmailAddress');

function hideElement(el) {
	var $el = $(el) ;
	if ($el) {
		$el.hide();
	}
}

chrome.storage.sync.get({
	doCollapseSubtasksinQAorBV: true,
}, function(items) {
	options = items;
	$(function() {
		setup();
	});
});

function setup() {
  if (true) {
    alert('Omg');
  }

}
