# JS-Local Bible
A simple offline JavaScript Bible that doesn’t require an Internet connection and features built-in search.

## How To Use
Download to your device and extract. Install Simple HTTP Server here: https://play.google.com/store/apps/details?id=com.phlox.simpleserver&hl=en_US&gl=US

Open Simple HTTP Server, set the root folder to the 'bible' directory, and start the server.

In your browser of choice, navigate to http://127.0.0.1:8080/index.htm

## How To Use (on older devices without Simple HTTP Server)
Download to your device, extract, and open the “index.htm” file in your device’s Internet browser. To open it in Android, navigate to one of the following address forms where the “bible” folder can be found:

> file:///storage/emulated/0/bible/index.htm

> file:///storage/sdcard0/bible/index.htm

> file:///storage/DB74-1EFD/bible/index.htm ['DB74-1EFD' will be unique to your device's SD card]

For Android Chrome, make sure under "App info", under "Advanced", that "Install unknown apps" is set to "Allowed".

ADDITIONALLY, for Android Chrome, apparently they introduced a bug where, after entering, pasting, or even editing a local URL, Android Chrome will now search the web for that URL rather than attempt to navigate to that designated URL as it should. A workaround for this bug is to create a bookmark/favorite and edit the URL on the bookmark/favorite, pasting the local URL, then opening the bookmark/favorite.

It used to work fine for FireFox on Android, but now I can't seem to get it to work.

## Translations
I finally added translation support as of 2022-07-12. For a list of possible translations, go to https://www.ph4.org/b4_mobi.php?q=zefania or https://github.com/godlytalias/Bible-Database and use the provided "Bible Format Converter Utility" to change them from .xml into the same type of .js JS-Local Bible already uses. Name them with the same lower-case naming convention. If it's in the dropdown, it should work. If it's not, add it by opening index.htm in a text editor, look for 'bookList' add an \<option\> line for it, and try it!

## Navigation/Browser History
Unless you click on the chapter link, no browser history will be recorded. So if you want to return to the page you were just reading using the browser’s “Back” button, make sure you have already clicked on the chapter link first. Otherwise, only the content on the same page changes.

## Future Development
This satisfies my needs, but I might do some more later, (like maybe use pushState() for history so the page doesn't have to reload and add Strong's reference numbers and links or something).

## History
So, I wanted a decent Bible app for Android that both didn’t require an Internet connection and supported multiple tabs. Couldn’t find one. So I finally put this together and added search, because that’s just convenient when you’re trying to find a particular verse!

Because it’s based on JavaScript it’s platform independent so long as you have a JavaScript enabled browser. Just copy it to your device! HOWEVER, usually Android is stupid when it comes to opening an HTML file in the browser. Never could figure that out, so you just have to go straight to the address of the index file as described above.

## Copyright
Copyright (c) 2009-2022 Adam L. Humphreys
