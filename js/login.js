const db = firebase.firestore(); // Database
const loginModal = new bootstrap.Modal(document.getElementById('login-modal')); // Modal
const loginForm = document.querySelector('#login-form'); // Login Form
const nav = document.getElementById('navTog') // Navbar control
var contentLoaded = false;

// Firebase

const onGetReg = (callback) => db.collection('registros').onSnapshot(callback); // Get data and Changes;
const deleteReg = (id) => db.collection("registros").doc(id).delete(); // Delete Reg
const regContainer = document.getElementById('reg-container'); // Reg-Container


window.addEventListener('DOMContentLoaded', async(e) => {

	auth.onAuthStateChanged(function (user) { // check user's status

		if (user) {

			if (contentLoaded) {
					console.log('Esperando a que el contenido cargue');
				} 
			else {
					console.log('Ingresando al panel de administración');
					adminConstructor();
				}

		} else {

			console.log('No logueado');

			loginForm.addEventListener('submit', async(e) => {

				e.preventDefault();

				login(); // Login

			})

		}
	});
});


// -------------------------------  LOGIN  ------------------------------------------------


function login() {

	const user = loginForm['login-email'].value; // Get email
	const password = loginForm['login-password'].value; // Get password

	auth
		.signInWithEmailAndPassword(user, password)
		.then(userCredential => {
			contentLoaded = true;
			console.log('Ingresando al panel de administración');
			adminConstructor();
			loginModal.hide();
		});

	loginForm.reset(); // reset form

}


// -------------------------------  ADMIN PANEL  ------------------------------------------------


//  Functions  //

function adminConstructor() {

	document.title = 'Administrador';

	nav.innerHTML = '';
	nav.innerHTML = `
		<ul class="navbar-nav ms-auto">
            <li class="nav-item">
            	<a class="nav-link" id="logout" href="#">Salir</a>
            </li>
        </ul>`;

	logout(); // Configure Logout function

	// Delete html

	document.getElementById('carouselSlide').remove();
	document.getElementById('nosotros').remove();
	document.getElementById('productos').remove();
	document.getElementById('ubicanos').remove();
	document.getElementById('login-modal').remove();

	// add reg fields

	getRegs()
}


function logout() {

	const logout = document.querySelector("#logout"); // Select logout button

	logout.addEventListener("click", (e) => { // Add click event

		e.preventDefault();

		auth // sign out
			.signOut()
			.then(() => {
				console.log('se cerró la sesión');
				location.reload();
			});

	});
}

function getRegs() {

	onGetReg((querySnapshot) => { // Fill regContainer

		regContainer.innerHTML = '<h1 class="text-center" style="margin: 50px;">Administrar pedidos</h1>'; // Add a title

		querySnapshot.forEach(doc => { // Generate an HTML card

			const reg = doc.data('registros'); // Reg values
			reg.id = doc.id; // Reg ID

			Card(reg); // Inner Reg-cards
			btnsEvent(); // Btns events
			alert(reg);

		});
	});
}

function Card(reg) {

	regContainer.innerHTML += `
		<div class="card card-reg">
			<div class="card-header">
			    Nombre: ${reg.name}
			</div>
			<div class="card-body">
			    <h5 class="card-title">Datos</h5>
			    <p class="card-text">
		    		whatsapp: ${reg.phone} <br>
					correo: <a href="mailto:${reg.mail}" target="_blank">${reg.mail}</a> <br>
					tipo: ${reg.type} <br>
					Para el: ${reg.date} <br>
					descripción: ${reg.description} <br>
				</p>
		    <button class="btn btn-primary btn-delete bg-danger" data-id="${reg.id}">Eliminar</button>
		    <button class="btn btn-primary btn-contact bg-success" data-id="${reg.phone}">Contactar</button>
			</div>
		</div>`;
}

func alert(reg) {
	regContainer.innerHTML += `
		<div class="alert alert-warning alert-dismissible fade show" role="alert">
  			<strong>¡Nueva petición entrante! cliente: ${reg.name}</strong>
  			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>`;
}

function btnsEvent() {

	const btnsDelete = regContainer.querySelectorAll(".btn-delete");

	btnsDelete.forEach(btn => {

		btn.addEventListener('click', async(e) => {
			await deleteReg(e.target.dataset.id) // Delete registry with data-id="${reg.id}"
		});
	});

	const btnsContact = regContainer.querySelectorAll(".btn-contact");

	btnsContact.forEach(btn => {

		btn.addEventListener('click', async(e) => {
			window.open(('https://api.whatsapp.com/send?phone=51' + e.target.dataset.id), '_blank'); // Open whatsapp url with phone
		})
	});
}

// --------------------------------------------- DOM FUNCTIONS -------------------------------------------------

function showPassword() {

	const password = document.getElementById("login-password"); // Get password field
            
    if (password.type === "password") {
            
        password.type = "text";
            
    } else {
            
        password.type = "password";
            
        }
            
}