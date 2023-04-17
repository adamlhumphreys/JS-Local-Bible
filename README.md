# JS-Local Bible
A simple offline JavaScript Bible that doesn’t require an Internet connection and features built-in search.

## How To Use
Download to your device and open the “index.htm” file in your device’s Internet browser. To open it in Android, navigate to one of the following address forms where the “bible” folder can be found:

> [file:///storage/emulated/0/bible/index.htm]

> [file:///storage/sdcard0/bible/index.htm]

> [file:///storage/DB74-1EFD/bible/index.htm] \['DB74-1EFD' will be unique to your device's SD card\]

For Android Chrome, make sure under "App info", under "Advanced", that "Install unknown apps" is set to "Allowed".
ADDITIONALLY, for Android Chrome, apparently they introduced a bug where, after entering, pasting, or even editing a local URL, Android Chrome will now search the web for that URL rather than attempt to navigate to that designated URL as it should. A couple workarounds for this bug is to 1) try opening one of the links above on your device while you're connected to the web, or 2) create a bookmark/favorite and edit the URL on the bookmark/favorite, pasting the local URL, then opening the bookmark/favorite.
It used to work fine for FireFox on Android, but now I can't seem to get it to work.

## Translations
I finally added translation support as of 2022-07-12. For a list of possible translations, go to https://www.ph4.org/b4_mobi.php?q=zefania and use the provided "Bible Format Converter Utility" to change them from .xml into the same type of .js JS-Local Bible already uses. Name them with the same lower-case naming convention. If it's in the dropdown, it should work. If it's not, add it and try it!

## Navigation/Browser History
Unless you click on the chapter link, no browser history will be recorded. So if you want to return to the page you were just reading using the browser’s “Back” button, make sure you have already clicked on the chapter link first. Otherwise, only the content on the same page changes.

## Future Development
This satisfies my needs, but I might do some more later, (like maybe add Strong's reference numbers and links or something).

## History
So, I wanted a decent Bible app for Android that both didn’t require an Internet connection and supported multiple tabs. Couldn’t find one. So I finally put this together and added search, because that’s just convenient when you’re trying to find a particular verse!

Because it’s based on JavaScript it’s platform independent so long as you have a JavaScript enabled browser. Just copy it to your device! HOWEVER, usually Android is stupid when it comes to opening an HTML file in the browser. Never could figure that out, so you just have to go straight to the address of the index file as described above.

## Copyright
Copyright (c) 2009-2022 Adam L. Humphreys
