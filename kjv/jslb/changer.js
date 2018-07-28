//JS-Local Bible © 2009-2018 Adam L. Humphreys (ALH)

var currentBook = 0;
var endChapter = books[0].length-1; //Let's first assume the end position is the last element in the array.
var currentChapter = 0;
var currentVerse = -1;
var searchLimit = 100;

function getVars()
{
	var vars = window.location.search.substr(1).split(':');
	//document.getElementById('debug').innerHTML = vars[0] + ':' + vars[1] + ':' + vars[2];

	if (vars[0])
	{
		if (vars[0].indexOf('s') == 0)
			find(vars[0].substr(2));
		else
		{
			changeBook(vars[0]);
			if (vars[2]) //Must come before the chapter contents is written.
				currentVerse = vars[2]-1;

			if (vars[1])
				changeChapter(vars[1]);
			else
				changeChapter(1);
		}
	}
}

function leaders(num, zeros)
{
	if (typeof zeros == 'undefined')
		zeros = 3;
	zeros -= num.toString().length;
	var leaders = '';
	
	while (zeros-- > 0)
		leaders += '0';
	return leaders + num;
}

function showHideButtons(show)
{
	var first = document.getElementById('first');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var last = document.getElementById('last');
	var firstX = document.getElementById('firstX');
	var prevX = document.getElementById('prevX');
	var nextX = document.getElementById('nextX');
	var lastX = document.getElementById('lastX');
	
	if (show === undefined)
	{
		if (endChapter == 0)
		{
			first.style.display = 'none';
			firstX.style.display = 'inline';
			if (currentBook > 0)
			{
				prev.style.display = 'inline';
				prevX.style.display = 'none';
			}
			else
			{
				prev.style.display = 'none';
				prevX.style.display = 'inline';
			}
			if (currentBook < books.length-1)
			{
				next.style.display = 'inline';
				nextX.style.display = 'none';
			}
			else
			{
				next.style.display = 'none';
				nextX.style.display = 'inline';
			}
			last.style.display = 'none';
			lastX.style.display = 'inline';
		}
		else if (currentChapter > 0 && currentChapter < endChapter)
		{
			first.style.display = 'inline';
			prev.style.display = 'inline';
			next.style.display = 'inline';
			last.style.display = 'inline';
			firstX.style.display = 'none';
			prevX.style.display = 'none';
			nextX.style.display = 'none';
			lastX.style.display = 'none';
		}
		else if (currentChapter == endChapter)
		{
			first.style.display = 'inline';
			prev.style.display = 'inline';
			firstX.style.display = 'none';
			prevX.style.display = 'none';
			if (currentBook < books.length-1)
			{
				next.style.display = 'inline';
				nextX.style.display = 'none';
			}
			else
			{
				next.style.display = 'none';
				nextX.style.display = 'inline';
			}
			last.style.display = 'none';
			lastX.style.display = 'inline';
		}
		else if (currentChapter == 0)
		{
			first.style.display = 'none';
			firstX.style.display = 'inline';
			if (currentBook > 0)
			{
				prev.style.display = 'inline';
				prevX.style.display = 'none';
			}
			else
			{
				prev.style.display = 'none';
				prevX.style.display = 'inline';
			}
			next.style.display = 'inline';
			last.style.display = 'inline';
			nextX.style.display = 'none';
			lastX.style.display = 'none';
		}
	}
	else
	{
		first.style.display = 'none';
		prev.style.display = 'none';
		next.style.display = 'none';
		last.style.display = 'none';
		firstX.style.display = 'none';
		prevX.style.display = 'none';
		nextX.style.display = 'none';
		lastX.style.display = 'none';
	}
}

function changeBook(bookNum)
{
	currentBook = bookNum - 1;
	endChapter = books[currentBook].length-1;
	currentChapter = 0;
	//chapterNum = 0;

	var option = document.getElementById('book' + bookNum);
	option.selected=true;

	document.getElementById('chapterList').innerHTML = '';
	makeList(document.getElementById('chapterList'));
	changeChapter('first');
	showHideButtons();
}

function changeChapter(where)
{
	var chapterBlock = document.getElementById('chapter');
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
	
	//chapterNum = leaders(currentChapter+1);
	//if (currentChapter <= 1 || currentChapter >= endChapter-1)
		showHideButtons();

	var pageTitle = document.getElementById('book' + (currentBook+1)).innerHTML + ' ' + (currentChapter+1);
	document.title = pageTitle;
	document.getElementById('pageTitle').innerHTML = '<a href="?' + (currentBook+1) + ':' + (currentChapter+1) + '">' + pageTitle + '</a>';

	chapterBlock.innerHTML = '';
	if (currentVerse == -1)
		for (var i = 0; i < books[currentBook][currentChapter].length; i++)
		{
			chapterBlock.innerHTML += '<span class="verse">' + (i+1) + '</span>' + books[currentBook][currentChapter][i] + '<br />'; //"\r\n"; // + "<br />\n\r";
		}
	else
		for (var i = 0; i < books[currentBook][currentChapter].length; i++)
		{
			chapterBlock.innerHTML += '<span class="verse">' + (i+1) + '</span>';
			var out = '';
			if (i == currentVerse)
				out += '<span class="HL">';
			out += books[currentBook][currentChapter][i];
			if (i == currentVerse)
				out += '</span>';
			chapterBlock.innerHTML += out + '<br />';
		}
	var option = document.getElementById(currentChapter+1);
		option.selected = true;

	currentVerse = -1;
}

function find(string)
{
	//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_search3
	//https://www.w3schools.com/Jsref/tryit.asp?filename=tryjsref_regexp_xy
	//https://www.w3schools.com/Jsref/jsref_obj_regexp.asp

	showHideButtons(0);
	document.title = 'NKJV Search Results';
	document.getElementById('searchField').value = string.replace(/\+/g, ' ');

	var chapterBlock = document.getElementById('chapter');
	var terms = string.split('+');
	var termCount = terms.length;
	var results = 0;

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
					chapterBlock.innerHTML += '<a href="?' + (book+1) + ':' + (chapter+1) + ':' + (verse+1) + '">' + book_chap + '</a> ';
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
}

function makeList(elem)
{
	elem.innerHTML = '';
	for (var i = 0; i <= endChapter; i++)
	{
		var option = document.createElement('option');
		option.id = (i+1);
		option.innerHTML = 'Chapter ' + (i+1); //leaders(i+1);
		if (currentChapter == i)
			option.selected = true;
		elem.appendChild(option);
	}
}