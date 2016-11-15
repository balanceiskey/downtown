var options = {
  collapseSubtasksinQAorBV: true,
  useMarkdownEditor: true,
};

	// Saves options to chrome.storage
function save_options() {

  chrome.storage.sync.set({
    collapseSubtasksinQAorBV: document.getElementById('collapseSubtasksinQAorBV').checked,
    useMarkdownEditor: document.getElementById('useMarkdownEditor').checked,
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
    document.getElementById('collapseSubtasksinQAorBV').checked = items.collapseSubtasksinQAorBV;
    document.getElementById('useMarkdownEditor').checked = items.useMarkdownEditor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
