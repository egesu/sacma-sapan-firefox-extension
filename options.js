var preferences = {
    mediaFacebook: true,
    day29Ekim: true,
    day10Kasim: true
};

for (var i in preferences) {
    document.querySelector('#' + i).checked = preferences[i];
}

function saveOptions(e) {
    var elements = document.querySelectorAll('[id^="media"], [id^="day"]');
    for (var i in elements) {
        preferences[elements[i].id] = elements[i].checked;
    }

    chrome.storage.local.set({
        preferences: preferences
    });
}

function restoreOptions() {
    chrome.storage.local.get('preferences', (results) => {
        for (var i in results.preferences) {
            preferences[i] = results.preferences[i];
            document.querySelector('#' + i).checked = results.preferences[i];
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
