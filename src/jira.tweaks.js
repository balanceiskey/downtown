/**
 * @license
 * @name jira.enhancements
 * @description Making Jira better
 * @version 0.0.1
 * @author Matt Conzen <mattconzen.com>
 * @see https://github.com/mattconzen/jira-enhancements
 */

 var QA_COLUMN_ID = 498;
 var BV_COLUMN_ID = 503;

var options;
var route = window.location.pathname.split('/');

var onDetailView = route.indexOf('sprout.atlassian.net/browse/') > -1;
var onBambuBoard = route.indexOf('RapidBoard.jspa?rapidView=56') > -1;

function getElementsInColumn(columnId) {
    return $( "li[data-column-id=" + columnId + "] ");
}

function hideElement(el) {
  console.log("HideElement called.");
	if (el) {
    el.hide();
    console.log("Hiding" + el);
	}
}

chrome.storage.sync.get({
	collapseSubtasksinQAorBV: true,
  useMarkdownEditor: true
}, function(items) {
	options = items;
	$(function() {
		setup();
	});
});

function setup() {
  if (options.collapseSubtasksinQAorBV) {
    console.log("hiding elements");
    getElementsInColumn(498).map(hideElement);
  }
  if (options.useMarkdownEditor && onDetailView) {
    console.log("Loading markdown editor");
    loadMarkdownEditor();
  }
}
