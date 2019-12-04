const alertBox = document.getElementById('alert-box');
const closeAlertBox = document.getElementById('close-alert-box');

function Alert(/*html*/) {
	/*alertBox.innerHTML = html;*/
	alertBox.classList.add('visible');
}

closeAlertBox.addEventListener('click', function() {
	alertBox.classList.remove('visible');
});
