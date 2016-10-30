const today = new Date();

// We store the dates for each event, so we don't check for them every day.
const dates = {
    '29Ekim': {
        start: new Date(today.getFullYear(), 9, 28),
        end: new Date(today.getFullYear(), 9, 31)
    },
    '10Kasim': {
        start: new Date(today.getFullYear(), 10, 9),
        end: new Date(today.getFullYear(), 10, 12)
    }
};

var preferences = {};

setInterval(removeStuff, 2000);

chrome.storage.local.get('preferences', (result) => {
    preferences = result.preferences;
});

function removeStuff() {
    var articleList = document.querySelectorAll('[id^="hyperfeed_story_id"], [id^="tl_unit_"]');

    blacklist29Ekim = [
        'atatürk',
        '29 ekim',
        '29ekim',
        'cumhuriyet',
        'bayram',
        'kutlu olsun',
    ];

    blacklist10Kasim = [
        'atatürk',
        'olmasaydin',
        '10 kasim',
        '10kasim',
        'atam',
        'anitkabir',
    ];

    if (preferences.day29Ekim) {
        if (dayIsCloseToCheck('29Ekim')) {
            checkForBlackList(articleList, blacklist29Ekim);
        }
    }

    if (preferences.day10Kasim) {
        if (dayIsCloseToCheck('10Kasim')) {
            checkForBlackList(articleList, blacklist10Kasim);
        }
    }
}

function dayIsCloseToCheck(dayName) {
    if (today >= dates[dayName].start && today <= dates[dayName].end) {
        return true;
    }
    return false;
}

function checkForBlackList(elementList, blacklist) {
    var text, found, i, j;

    for (i = 0; i < elementList.length; i++) {
        found = 0;
        text = elementList[i].textContent.toLowerCase().replace('ı', 'i');
        for (j in blacklist) {
            if (text.indexOf(blacklist[j]) !== -1) {
                found++;
            }
        }

        if (found >= 2) {
            removeFeed(elementList[i]);
        }
    }
}

function removeFeed(element) {
    var hider = document.createElement('div');
    if (element.querySelector('.sacma-sapan-hider')) {
        return;
    }
    hider.className = 'sacma-sapan-hider';
    hider.style.backgroundColor = '#000';
    hider.style.position = 'absolute';
    hider.style.top = '0';
    hider.style.bottom = '0';
    hider.style.left = '0';
    hider.style.right = '0';
    hider.style.zIndex = '10';
    element.appendChild(hider);
}
