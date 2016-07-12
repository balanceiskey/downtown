var options = {
  doHighlightUnder: true,
  doHighlightUnderValue: 11,
  doShowHearts: true,
  doSkipDrinks: true,
  doRemoveExtraneousElements: false,
  doRemoveExtraneousMenuSections: false,
  doRemoveBackground: true,
  doGfRestaurants: true,
  doAverageDeliveryTimes: true,
};

	// Saves options to chrome.storage
function save_options() {

  chrome.storage.sync.set({
    doHighlightUnder: document.getElementById('doHighlightUnder').checked,
    doHighlightUnderValue: document.getElementById('doHighlightUnderValue').value,
    doShowHearts: document.getElementById('doShowHearts').checked,
    doSkipDrinks: document.getElementById('doSkipDrinks').checked,
    doRemoveExtraneousElements: document.getElementById('doRemoveExtraneousElements').checked,
    doRemoveExtraneousMenuSections: document.getElementById('doRemoveExtraneousMenuSections').checked,
    doRemoveBackground: document.getElementById('doRemoveBackground').checked,
    doGfRestaurants: document.getElementById('doGfRestaurants').checked,
    doAverageDeliveryTimes: document.getElementById('doAverageDeliveryTimes').checked,
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
  chrome.storage.sync.get(options, function(items) {
    document.getElementById('doHighlightUnder').checked = items.doHighlightUnder;
    document.getElementById('doHighlightUnderValue').value = items.doHighlightUnderValue;
    document.getElementById('doShowHearts').checked = items.doShowHearts;
    document.getElementById('doSkipDrinks').checked = items.doSkipDrinks;
    document.getElementById('doRemoveExtraneousElements').checked = items.doRemoveExtraneousElements;
    document.getElementById('doRemoveExtraneousMenuSections').checked = items.doRemoveExtraneousMenuSections;
    document.getElementById('doRemoveBackground').checked = items.doRemoveBackground;
    document.getElementById('doGfRestaurants').checked = items.doGfRestaurants;
    document.getElementById('doAverageDeliveryTimes').checked = items.doAverageDeliveryTimes;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);