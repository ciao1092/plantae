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
		var mywindow = window.open('', 'PRINT', 'height=600,width=1200');

		mywindow.document.write('<html><head><title>' + nomeComune + '</title>');
		mywindow.document.write('</head><body>');
		mywindow.document.write('<h1><i>' + genereESpecie + ' (' + nomeComune + ')</i></h1>');
		mywindow.document.write('<h2>' + "Caratteristiche" + '</h2>');
		mywindow.document.write('<ul>');
		mywindow.document.write("<li>Periodo di fioritura: " + periodoDiFioritura + "</li>");
		mywindow.document.write("<li>Foglie: ");
		foglie.split('\n').forEach(line => {
			mywindow.document.write(line + '<br />');
		});
		mywindow.document.write("</li>");
		if (acidofila)
			mywindow.document.write("<li>&Egrave acidofila</li>");
		mywindow.document.write("<li>&Egrave " + eaa + "</li>");
		mywindow.document.write('</ul>');
		mywindow.document.write('</body></html>');

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10*/

		mywindow.print();
		//mywindow.close();

		return true;
	}
}
