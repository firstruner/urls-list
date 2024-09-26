function browseResult(e){
  var fileselector = document.getElementById('outputSaveFolder');
  console.log(fileselector.value);
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    showTabContextMenuCopyUrls: document.querySelector("#showTabContextMenuCopyUrls").checked,
    openUrlsAlreadyOpened: document.querySelector("#openUrlsAlreadyOpened").checked,
    outputSaveFolder: document.querySelector("#outputSaveFolder").value,
  });
  browser.runtime.sendMessage({});
}

function restoreOptions() {
  browser.storage.sync.get().then(settings => {
    let showContextMenu = ('showTabContextMenuCopyUrls' in settings) ? settings.showTabContextMenuCopyUrls : true;
    let openTabs = ('openUrlsAlreadyOpened' in settings) ? settings.openUrlsAlreadyOpened : false;
    let outputSaveFolder = ('outputSaveFolder' in settings) ? settings.openUrlsAlreadyOpened : "";

    document.querySelector("#showTabContextMenuCopyUrls").checked = showContextMenu;
    document.querySelector("#openUrlsAlreadyOpened").checked = openTabs;
    document.querySelector("#outputSaveFolder").value = outputSaveFolder;
  }, error => {
    console.log(`Error: ${error}`);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
