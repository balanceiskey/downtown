	// Saves options to chrome.storage
function save_options() {
  var doHighlightUnder = document.getElementById('doHighlightUnder').checked;
  var doHighlightUnderValue = document.getElementById('doHighlightUnderValue').value;
  var doShowHearts = document.getElementById('doShowHearts').checked;
  var doSkipDrinks = document.getElementById('doSkipDrinks').checked;
  var doRemoveExtraneousMenuSections = document.getElementById('doRemoveExtraneousMenuSections').checked;
  var doRemoveBackground = document.getElementById('doRemoveBackground').checked;

  chrome.storage.sync.set({
    doHighlightUnder: doHighlightUnder,
    doHighlightUnderValue: doHighlightUnderValue,
    doShowHearts: doShowHearts,
    doSkipDrinks: doSkipDrinks,
    doRemoveExtraneousMenuSections: doRemoveExtraneousMenuSections,
    doRemoveBackground: doRemoveBackground
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    doHighlightUnder: true,
    doHighlightUnderValue: 11,
    doShowHearts: true,
    doSkipDrinks: true,
    doRemoveExtraneousMenuSections: false,
    doRemoveBackground: false
  }, function(items) {
    document.getElementById('doHighlightUnder').checked = items.doHighlightUnder;
    document.getElementById('doHighlightUnderValue').value = items.doHighlightUnderValue;
    document.getElementById('doShowHearts').checked = items.doShowHearts;
    document.getElementById('doSkipDrinks').checked = items.doSkipDrinks;
    document.getElementById('doRemoveExtraneousMenuSections').checked = items.doRemoveExtraneousMenuSections;
    document.getElementById('doRemoveBackground').checked = items.doRemoveBackground;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);