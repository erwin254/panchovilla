

// global functions
function request(url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	var loader = document.createElement('div');
	loader.className = 'loader';
	document.body.appendChild(loader);
	xhr.addEventListener('readystatechange', function() {
		if(xhr.readyState === 4) {
			if(callback) {
				callback(xhr.response);
			}
			loader.remove();
		}
	});

	var formdata = data ? (data instanceof FormData ? data : new FormData(document.querySelector(data))) : new FormData();

	var csrfMetaTag = document.querySelector('meta[name="csrf_token"]');
	if(csrfMetaTag) {
		formdata.append('csrf_token', csrfMetaTag.getAttribute('content'));
	}

	xhr.send(formdata);
}

// index.php
function logout() {
	request('controller/logout.php', false, function(data) {
		if(data === '0') {
			window.location = 'login';
		}
	});
}
// login.php
function login() {
	request('controller/login.php', '#loginForm', function(data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		switch(data) {
			case '0':
				window.location = './';
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err"> Usuario o Password incorrecto</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Fallo al conectar a la base de datos. Prueba nuevamente.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">Has exedido el número máximo de ingresos por hora. Prueba nuevamente en 1 hora.</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += '<div class="err">Tu correo no ha sido activado.</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">Se produjo un error desconocido. Inténtelo de nuevo más tarde.</div>';
		}
		setTimeout(function() {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}
// register.php
function register() {
	request('controller/register.php', '#registerForm', function(data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		try {
			data = JSON.parse(data);
			if(!(data instanceof Array)) {throw Exception('bad data');}

			//Show errors to user
			for(var i = 0;i < data.length;++i) {
				switch(data[i]) {
					case 0:
						document.getElementById('errs').innerHTML += '<div>Tu cuenta ha sido creada y debe ser activada por un administrador.</div>';
						document.getElementById('registerForm').reset();
						break;
					case 1:
						document.getElementById('errs').innerHTML += '<div class="err">Nombre no válido ingresado. (use solo letras, espacios y guiones)</div>';
						break;
					case 2:
						document.getElementById('errs').innerHTML += '<div class="err">Correo electrónico no válido ingresado.</div>';
						break;
					case 3:
						document.getElementById('errs').innerHTML += '<div class="err">El correo electrónico no existe. (Este dominio no tiene servidor de correo)</div>';
						break;
					case 4:
						document.getElementById('errs').innerHTML += '<div class="err">La contraseña debe contener: <ul><li>Al menos 8 caracteres</li><li>Al menos una letra minúscula</li><li>Al menos una letra mayúscula</li><li>Al menos un número</li><li>Al menos un carácter especial (~?!@#$%^&*)</li></ul></div>';
						break;
					case 5:
						document.getElementById('errs').innerHTML += '<div class="err">Las contraseñas no coinciden. Vuelva a ingresar su contraseña confirmada.</div>';
						break;
					case 6:
						document.getElementById('errs').innerHTML += '<div class="err">No se pudo agregar la cuenta a la base de datos. Inténtelo de nuevo más tarde.</div>';
						break;
					case 7:
						document.getElementById('errs').innerHTML += '<div class="err">Ya existe una cuenta con este correo electrónico</div>';
						break;
					case 8:
						document.getElementById('errs').innerHTML += '<div class="err">No se pudo conectar a la base de datos. Inténtelo de nuevo más tarde.</div>';
						break;
					case 9:
						document.getElementById('errs').innerHTML += '<div class="err">Token CSRF no válido. Inténtelo de nuevo más tarde.</div>';
						break;
					case 10:
						document.getElementById('errs').innerHTML += '<div class="err">No se pudo enviar el correo electrónico. Por favor inténtalo de nuevo más tarde.</div>';
						break;
					case 11:
						document.getElementById('errs').innerHTML += '<div class="err">No se pudo insertar la solicitud en la base de datos. Inténtelo de nuevo más tarde.</div>';
						break;
					case 12:
						document.getElementById('errs').innerHTML += '<div class="err">Ha excedido su número de solicitudes de validación permitidas por día.</div>';
						break;
					case 13:
						document.getElementById('errs').innerHTML += '<div class="err">El usuario con este correo electrónico ya está validado.</div>';
						break;
					case 14:
						document.getElementById('errs').innerHTML += '<div class="err">Un usuario con este correo electrónico no existe</div>';
						break;
					case 15:
						document.getElementById('errs').innerHTML += '<div class="err">No se pudo conectar a la base de datos. Inténtelo de nuevo más tarde.</div>';
						break;
					default:
						document.getElementById('errs').innerHTML += '<div class="err">Se produjo un error desconocido. Inténtelo de nuevo más tarde.</div>';
				}
			}
		}
		catch(e) {
			document.getElementById('errs').innerHTML = '<div class="err">Se produjo un error desconocido. Inténtelo de nuevo más tarde.</div>';
		}
		setTimeout(function() {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}
