const db = firebase.firestore(); // Database
const taskform = document.getElementById('task-form'); // Form
const spinner = document.getElementById('sending-spinner').style; // Loading spinner style

// Wait for 'submit'

taskform.addEventListener('submit', async(e) => {

	e.preventDefault();

	spinner.display = 'inline-block'; // show spinner
	await saveReg(); // Save reg
});

// Reciebe 

// Functions // 

function saveReg() {

	const name = taskform['nombre'].value;
	const mail = taskform['Email'].value;
	const phone = taskform['telefono'].value;
	const type = taskform['tipo'].value;
	const date = taskform['fecha'].value;
	const description = taskform['task-description'].value;

	db.collection('registros').doc().set({ // Save data in 'registros'
			name,
			mail,
			phone,
			type,
			date,
			description,
		})
		.then(() => { // Wait and create a thanks message
			greetings();
		});

}

function greetings() {

	taskform.innerHTML = ''; // Delete form
	taskform.innerHTML = // Final message
		`
		<div style="padding-top: 20%; padding-bottom: 20%;">
			<p class="text-center h1">Gracias por registrar su petición</p>
			<p class="text-center h1">le contactaremos pronto</p>
		</div>`;
}