/**
 * @license
 * @name jira.enhancements
 * @description Making Jira better
 * @version 0.0.1
 * @author Matt Conzen <mattconzen.com>
 * @see https://github.com/mattconzen/jira-enhancements
 */

var J2M = require('J2M');
var MDE = require('simplemde');

var QA_COLUMN_ID = 498;
var BV_COLUMN_ID = 503;

var options;
var url = window.location.pathname;

var onDetailView = url.indexOf('browse') > -1;
var onBambuBoard = url.indexOf('RapidBoard.jspa?rapidView=56') > -1;

function createMarkdownEditor() {
    let text = getJiraDescriptionText();
    convertElementToSimpleMde($("#description-val")[0]);
}

function convertElementToSimpleMde(el) {
    var simplemde = new MDE({ element: el });
}

function convertJiraToMarkdown(text) {
    return J2M.toM(text);
}

function convertMarkdownToJira(text) {
    return J2M.toJ(text);
}

function getJiraDescriptionText() {
    //Make sure the description is in editable mode
    $("#description-val").click();

    return $("#description-wiki-edit").text();
}

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
  if (options.collapseSubtasksinQAorBV && onBambuBoard) {
    console.log("hiding elements");
    getElementsInColumn(498).map(hideElement);
  }
  //todo: delete me:
  if (onDetailView) {
    console.log("detail view detected");
  }
  if (options.useMarkdownEditor) {
    console.log("I should create a markdown editor");
    window.addEventListener('load', createMarkdownEditor);
    createMarkdownEditor();
  }
}
