//JS-Local Bible © 2009-2022 Adam L. Humphreys (ALH)

document.addEventListener('DOMContentLoaded', function()
{
	// Get query string variables.
	_GET = [];
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){_GET[name]=value.replace(/#.*$/, '');});

	loadVersion(_GET['ver']);
});

function loadVersion(ver = 'kjv', callback = setup)
{
	if (ver === 'undefined')
		ver = 'kjv';

	document.getElementById('ver-' + ver).selected = true;

	let script = document.getElementById('version');
	if (script !== null)
		script.remove();

	script = document.createElement('script')
	script.type = 'text/javascript';
	script.id = 'version';
	if(script.readyState) // Only required for IE <9
	{
		script.onreadystatechange = function()
		{
			if ( script.readyState === 'loaded' || script.readyState === 'complete' )
			{
				script.onreadystatechange = null;
				callback(ver);
			}
		};
	}
	else //Others
	{
		script.onload = function()
		{
			callback(ver);
		};
	}

	script.src = ver + '.js';
	document.getElementsByTagName('head')[0].appendChild( script );
}

function setup(ver)
{
	version = ver;
	let newPageLoad = true;
	if (typeof currentBook !== 'undefined')
		newPageLoad = false;

	if (newPageLoad)
	{
		currentBook = 0;
		endChapter = books[0].length-1; //Let's first assume the end position is the last element in the array.
		currentChapter = 0;
		currentVerse = -1;
		searchLimit = 1000;
		document.getElementsByName('ver')[0].value = version; // Set search version
	}

	makeChapterList();

	if (newPageLoad)
	{
		if (_GET['s'] !== undefined)
			find(decodeURI(_GET['s']).replace(/^[\+\s]+|[\+\s]+$/gm,'')); // Support Unicode and trim whitespace.
		else if (_GET['loc'] !== undefined)
		{
			var vars = _GET['loc'].split(':');

			changeBook(vars[0]);
			if (vars[2]) //Must come before the chapter contents is written.
				currentVerse = vars[2]-1;

			if (vars[1])
				changeChapter(vars[1]);
			else
				changeChapter(1);
		}
		else
			changeChapter('first');
	}
	else
		changeChapter(currentChapter + 1);

	showHideButtons();
	makeChapterTabs();
}

function toggleClassByClass(commonStyleVal, toggleStyleVal, showHide)
{
	toggleStyleValRx = new RegExp('( ' + toggleStyleVal + ')', 'gmi');
	for (let elem of document.getElementsByClassName(commonStyleVal))
	{
		let classAtr = elem.getAttribute('class').replace(toggleStyleValRx, ''); // If it's already there, remove it! We don't want it there more than once.

		if (showHide)
			elem.setAttribute('class', classAtr + ' ' + toggleStyleVal);
		else
			elem.setAttribute('class', classAtr);
	}
}

function showHideButtons(show)
{
	if (show === undefined)
	{
		if (endChapter == 0)
		{
			toggleClassByClass('first', 'hidden', 1);
			toggleClassByClass('firstX', 'hidden', 0);
			if (currentBook > 0)
			{
				toggleClassByClass('prev', 'hidden', 0);
				toggleClassByClass('prevX', 'hidden', 1);
			}
			else
			{
				toggleClassByClass('prev', 'hidden', 1);
				toggleClassByClass('prevX', 'hidden', 0);
			}
			if (currentBook < books.length-1)
			{
				toggleClassByClass('next', 'hidden', 0);
				toggleClassByClass('nextX', 'hidden', 1);
			}
			else
			{
				toggleClassByClass('next', 'hidden', 1);
				toggleClassByClass('nextX', 'hidden', 0);
			}
			toggleClassByClass('last', 'hidden', 1);
			toggleClassByClass('lastX', 'hidden', 0);
		}
		else if (currentChapter > 0 && currentChapter < endChapter)
		{
			toggleClassByClass('first', 'hidden', 0);
			toggleClassByClass('prev', 'hidden', 0);
			toggleClassByClass('next', 'hidden', 0);
			toggleClassByClass('last', 'hidden', 0);
			toggleClassByClass('firstX', 'hidden', 1);
			toggleClassByClass('prevX', 'hidden', 1);
			toggleClassByClass('nextX', 'hidden', 1);
			toggleClassByClass('lastX', 'hidden', 1);
		}
		else if (currentChapter == endChapter)
		{
			toggleClassByClass('first', 'hidden', 0);
			toggleClassByClass('prev', 'hidden', 0);
			toggleClassByClass('firstX', 'hidden', 1);
			toggleClassByClass('prevX', 'hidden', 1);
			if (currentBook < books.length-1)
			{
				toggleClassByClass('next', 'hidden', 0);
				toggleClassByClass('nextX', 'hidden', 1);
			}
			else
			{
				toggleClassByClass('next', 'hidden', 1);
				toggleClassByClass('nextX', 'hidden', 0);
			}
			toggleClassByClass('last', 'hidden', 1);
			toggleClassByClass('lastX', 'hidden', 0);
		}
		else if (currentChapter == 0)
		{
			toggleClassByClass('first', 'hidden', 1);
			toggleClassByClass('firstX', 'hidden', 0);
			if (currentBook > 0)
			{
				toggleClassByClass('prev', 'hidden', 0);
				toggleClassByClass('prevX', 'hidden', 1);
			}
			else
			{
				toggleClassByClass('prev', 'hidden', 1);
				toggleClassByClass('prevX', 'hidden', 0);
			}
			toggleClassByClass('next', 'hidden', 0);
			toggleClassByClass('last', 'hidden', 0);
			toggleClassByClass('nextX', 'hidden', 1);
			toggleClassByClass('lastX', 'hidden', 1);
		}
	}
	else
	{
		toggleClassByClass('first', 'hidden', 1);
		toggleClassByClass('prev', 'hidden', 1);
		toggleClassByClass('next', 'hidden', 1);
		toggleClassByClass('last', 'hidden', 1);
		toggleClassByClass('firstX', 'hidden', 1);
		toggleClassByClass('prevX', 'hidden', 1);
		toggleClassByClass('nextX', 'hidden', 1);
		toggleClassByClass('lastX', 'hidden', 1);
	}
}

function changeBook(bookNum)
{
	currentBook = bookNum - 1;
	endChapter = books[currentBook].length-1;
	currentChapter = 0;
	//chapterNum = 0;

	let option = document.getElementById('book' + bookNum);
	option.selected=true;

	document.getElementById('chapterList').innerHTML = '';
	makeChapterTabs();
	makeChapterList();
	changeChapter('first');
	showHideButtons();
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function changeChapter(where)
{
	let chapterBlock = document.getElementById('chapter');
	if (where == 'first')
	{
		currentChapter = 0;
	}
	else if (where == 'prev')
	{
		if (currentChapter > 0)
		{
			--currentChapter;
		}
		else //if (currentBook > 0)
		{
			changeBook(currentBook); //Because we subtract 1 in that function since 1 is the starting point rather than 0.
			currentChapter = endChapter;
		}
	}
	else if (where == 'next')
	{
		if (currentChapter < endChapter)
		{
			++currentChapter;
		}
		else //if (currentBook < books.length-1)
		{
			changeBook(currentBook+2); //Because we subtract 1 in that function since 1 is the starting point rather than 0.
			currentChapter = 0;
		}
	}
	else if (where == 'last')
	{
		currentChapter = endChapter;
	}
	else if (where)
	{
		currentChapter = where-1;
	}

	showHideButtons();

	let pageTitle = document.getElementById('book' + (currentBook+1)).innerHTML + ' ' + (currentChapter+1);
	document.title = pageTitle + ' (' + version.toUpperCase() + ')';
	document.getElementById('pageTitle').innerHTML = '<a href="?ver=' + version + '&loc=' + (currentBook+1) + ':' + (currentChapter+1) + '">' + pageTitle + '</a>';

	chapterBlock.innerHTML = '';
	if (currentVerse == -1)
		for (var i = 0; i < books[currentBook][currentChapter].length; i++)
		{
			var bg = Math.round( ( (i+0.5) / books[currentBook][currentChapter].length ) * 360);
			var bg = 'background-image:conic-gradient(#000 ' + bg + 'deg,#ccc ' + (bg+1) + 'deg)';

			// chapterBlock.innerHTML += '<span class="verse">' + (i+1) + ' </span>' + books[currentBook][currentChapter][i] + '<br>'; //"\r\n"; // + "<br>\n\r";
			chapterBlock.innerHTML += '<span class="verse" style="' + bg + '">' + (i+1) + ' </span>' + books[currentBook][currentChapter][i] + '<br>'; //"\r\n"; // + "<br>\n\r";
		}
	else
		for (var i = 0; i < books[currentBook][currentChapter].length; i++)
		{
			var bg = Math.round( ( (i+0.5) / books[currentBook][currentChapter].length ) * 360);
			var bg = 'background-image:conic-gradient(#000 ' + bg + 'deg,#ccc ' + (bg+1) + 'deg)';

			var out = '';
			if (i == currentVerse)
				out += '<span class="HL">';
			out += books[currentBook][currentChapter][i];
			if (i == currentVerse)
				out += '</span>';
			chapterBlock.innerHTML += '<span class="verse" style="' + bg + '">' + (i+1) + ' </span>' + out + '<br>';
		}
	let option = document.getElementById(currentChapter+1);
		option.selected = true;

	currentVerse = -1;
}

function find(string)
{
	//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_search3
	//https://www.w3schools.com/Jsref/tryit.asp?filename=tryjsref_regexp_xy
	//https://www.w3schools.com/Jsref/jsref_obj_regexp.asp

	showHideButtons(0);
	document.title = version.toUpperCase() + ' Search Results';
	document.getElementById('searchField').value = string.replace(/\+/g, ' ');

	let chapterBlock = document.getElementById('chapter');
	let terms = string.split('+');
	let termCount = terms.length;
	let results = 0;

	string = new RegExp('(' + string.replace(/\+/g,'|') + ')', 'gmi'); //global, multiline, case-insensitive search for all terms.
	for (var i = 0; i < termCount; i++)
		terms[i] = new RegExp('(' + terms[i] + ')', 'gmi'); //global, multiline, case-insensitive search.

	chapterBlock.innerHTML = '';
	for (var book = 0; book < books.length; book++)
	{
		for (var chapter = 0; chapter < books[book].length; chapter++)
		{
			for (var verse = 0; verse < books[book][chapter].length && results < searchLimit; verse++)
			{
				var found = 0;
				for (var i = 0; i < termCount; i++)
				{
					var position = books[book][chapter][verse].search(terms[i]);
					if (position != -1)
						found++;
				}
				if (found == termCount)
				{
					results++;
					var book_chap = document.getElementById('book' + (book+1)).innerHTML + ' ' + (chapter+1) + ':' + (verse+1);
					chapterBlock.innerHTML += '<a href="?ver=' + version + '&loc=' + (book+1) + ':' + (chapter+1) + ':' + (verse+1) + '">' + book_chap + '</a> ';
					var words = books[book][chapter][verse].split(' ');
					var out = '';
					for (var i = 0; i < words.length; i++)
					{
						if (words[i].search(string) == -1)
							out += words[i] + ' ';
						else
							out += '<span class="HL">' + words[i] + '</span> ';
					}
					chapterBlock.innerHTML += out + '<br /><br />';
				}
			}
		}
	}

	if (results < searchLimit)
		document.getElementById('pageTitle').innerHTML = results + ' Search Results:';
	else
	{
		chapterBlock.innerHTML += 'Too many results.<br /><br />';
		document.getElementById('pageTitle').innerHTML = results + '+ Search Results:';
	}

/*
	var str = 're, Green, red, green, gren,\ngr, blue, yellow, Red'; //String to search.
	//var string = 'red grEen'; //Words to search for.
	string = new RegExp('(' + string.replace(' ','|') + ')', 'gmi'); //Do a global, multiline, case-insensitive search.
	//var result = str.match(string); //Returns a comma delimited string of only the matches.
	var position = str.search(string);
	//document.getElementById('chapter').innerHTML += position + '<br />';
*/
}

function makeChapterList(elem = document.getElementById("chapterList"))
{
	elem.innerHTML = '';
	for (let i = 0; i <= endChapter; i++)
	{
		let option = document.createElement('option');
		option.id = (i+1);
		//option.value = (i+1);
		option.innerHTML = 'Chapter ' + (i+1);
		if (currentChapter == i)
			option.selected = true;
		elem.appendChild(option);
	}
}

function makeChapterTabs()
{
	chapters = document.getElementById('chapters')
	chapters.innerHTML = '';
	for (let i = 0; i <= endChapter; i++)
	{
		if (i%10 == 0)
			chapters.innerHTML += '<a class="blank">'+ (i<99 ? '&nbsp;' : '') + i/10 +'</a>\r\n';
		chapters.innerHTML += '<a onclick="javascript:changeChapter(' + (i+1) + ');">' + (i<9 ? '&nbsp;' : '') + (i+1) + '</a>\r\n';
	}
}