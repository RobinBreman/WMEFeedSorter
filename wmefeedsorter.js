// ==UserScript==
// @name 			WME Feed Sorter
// @description 	Alpha version, sorts the WME feed
// @namespace 		http://tampermonkey.net/
// @author          Robin Breman | L4 Waze NL | @robbre | https://github.com/RobinBreman/WMEFeedSorter
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @include         https://editor-beta.waze.com/*
// @include         https://beta.waze.com/*
// @exclude         https://www.waze.com/user/*editor/*
// @exclude         https://www.waze.com/*/user/*editor/*
// @grant 			none
// @version 		0.1.0
// ==/UserScript==

(function () {
    'use strict';
    var version = '0.1.0';

    function wmescript_bootstrap() {
        var wazeapi = W || window.W;
        if (!wazeapi || !wazeapi.map) {
            setTimeout(wmescript_bootstrap, 1000);
            return;
        }

        /* begin running the code! */
        insertButtons();

    }

    function insertButtons() {
        var cnt = $(`
        <div  id='WMECustomFeedSorter'>
            <span>
                <button id='WMECustomFeedSorterUp'>+</button>
                <button id='WMECustomFeedSorterDwn'>-</button>
            </span>
        </div>`
        );

        //$('.feed-content').parent().prepend(cnt);
        $('#sidepanel-feed').prepend(cnt);

        $('#WMECustomFeedSorterUp').click(sortlistASC);
        $('#WMECustomFeedSorterDwn').click(sortlistDESC);

    }


    function sortlistASC() { sortlist(1); }
    function sortlistDESC() { sortlist(-1); }

    function sortlist(order) {

        var items = $('.feed-list > li').get();
        items.sort(function (a, b) {
            var keyA = $('.timestamp', a).text();

            keyA = keyA.replace('maanden', '00000');
            keyA = keyA.replace('months', '00000');
            
            keyA = keyA.replace('maand', '00000');
            keyA = keyA.replace('month', '00000');
            
            keyA = keyA.replace('dagen', '0000');
            keyA = keyA.replace('dag', '0000');
            keyA = keyA.replace('days', '0000');
            keyA = keyA.replace('day', '0000');
            
            keyA = keyA.replace('uur', '00');
            keyA = keyA.replace('hours', '00');
            keyA = keyA.replace('hour', '00');

            keyA = keyA.replace('minuten', '');
            keyA = keyA.replace('minuut', '');
            keyA = keyA.replace('minutes', '');
            keyA = keyA.replace('minute', '');

            keyA = keyA.replace(' ', '');
            keyA = parseInt(keyA);
            //console.log(keyA);

            var keyB = $('.timestamp', b).text();
            keyB = keyB.replace('maanden', '00000');
            keyB = keyB.replace('months', '00000');

            keyB = keyB.replace('maand', '00000');
            keyB = keyB.replace('month', '00000');
            
            keyB = keyB.replace('dagen', '0000');
            keyB = keyB.replace('dag', '0000');
            keyB = keyB.replace('days', '0000');
            keyB = keyB.replace('day', '0000');

            keyB = keyB.replace('uur', '00');
            keyB = keyB.replace('hours', '00');
            keyB = keyB.replace('hour', '00');

            keyB = keyB.replace('minuten', '');
            keyB = keyB.replace('minuut', '');
            keyB = keyB.replace('minutes', '');
            keyB = keyB.replace('minute', '');

            keyB = keyB.replace(' ', '');

            keyB = parseInt(keyB);

            if (keyA < keyB) return (-1 * order);
            if (keyA > keyB) return (1 * order);
            return 0;
        });
        var ul = $('.feed-list');
        $.each(items, function (i, li) {
            ul.append(li);
        });
    }

    setTimeout(wmescript_bootstrap, 3000);

})();
