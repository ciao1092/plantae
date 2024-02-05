function form_preventDefault(e) {
	e.preventDefault();
	return false;
}

function generate() {
	var genereESpecie = document.getElementById('genereESpecie').value;
	var nomeComune = document.getElementById('nomeComune').value;
	var periodoDiFioritura = document.getElementById('periodoDiFioritura').value;
	var acidofila = document.getElementById('acidofila').checked;
	var foglie = document.getElementById('foglie').value;
	var eaaRadios = document.getElementsByName('eaa');
	var eaa;

	for (var i = 0; i < eaaRadios.length; i++) {
		if (eaaRadios[i].checked) {
			eaa = eaaRadios[i].value;
			break;
		}
	}

	if (!(genereESpecie && nomeComune && eaa && periodoDiFioritura && foglie)) {
		document.getElementById('avviso').style.display = "block";
		return false;
	}
	else {
		var newwindow = window.open();

		let htmlstring = "<!DOCTYPE html><html lang=\"it\" id=\"root\">";

		htmlstring += ('<head><title>' + nomeComune + '</title><style>.clearfix::after{content:"";clear:both;display:table;}</style>');
		htmlstring += ('</head><body>');
		htmlstring += ('<div class="clearfix">');
		htmlstring += ('<div style="float:left">Nome: ' + getCookie('nome') + '<br />Cognome: ' + getCookie('cognome') + '</div>');
		htmlstring += ('<div style="float:right">Data: ' + (new Date().toLocaleDateString()) + '</div>');
		htmlstring += ('</div>');
		htmlstring += ('<h1><i>' + genereESpecie + ' (' + nomeComune + ')</i></h1>');
		htmlstring += ('<h2>' + "Caratteristiche" + '</h2>');
		htmlstring += ('<ul>');
		htmlstring += ("<li>Periodo di fioritura: " + periodoDiFioritura + "</li>");
		htmlstring += ("<li>Foglie: ");
		foglie.split('\n').forEach(line => {
			htmlstring += (line + '<br />');
		});
		htmlstring += ("</li>");
		if (acidofila)
			htmlstring += ("<li>&Egrave acidofila</li>");
		htmlstring += ("<li>&Egrave " + eaa + "</li>");
		htmlstring += ('</ul>');
		htmlstring += ('</body>');
		htmlstring += '</html>';

		newwindow.document.write(htmlstring);
		newwindow.document.close();

		newwindow.focus();
		newwindow.print();

		return true;
	}
}

function register() {
	var nome = document.getElementById('nome').value;
	var cognome = document.getElementById('cognome').value;

	if (!(nome && cognome)) {
		document.getElementById('avviso').style.display = "block";
		return false;
	} else {
		setCookie("nome", nome, 1);
		setCookie("cognome", cognome, 1);
		window.location = "index.html";
		return true;
	}
}


function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function deleteAllCookies() {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

	document.location = "registrazione.html";
}