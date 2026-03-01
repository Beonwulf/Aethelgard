import { cE } from '../utils/cE.js';


export function createLoginUI(lang, onAuthSubmit, onSwitchMode) {
	// Wir bauen den Baum von innen nach außen oder direkt verschachtelt
	return cE({
		$class: 'login-page-wrapper', // Ein Wrapper, um alles zu halten
		$childs: [
			// 1. Der animierte Hintergrund
			{ $class: 'login-background' },

			// 2. Der zentrierte Container
			{
				$class: 'login-container',
				$childs: [{
					$class: 'login-box',
					$childs: [
						{ $el: 'h2', $id: 'login-title', $text: lang.get('login.title') },
						
						// Das Formular
						{
							$el: 'form',
							$id: 'auth-form',
							$onclick: (e) => { 
								// Da es ein Formular ist, fangen wir das Submit lieber 
								// separat ab, aber hier als Struktur:
								if(e.target.tagName === 'BUTTON') e.preventDefault();
							},
							$childs: [
								// Username Gruppe
								{
									$class: 'login-input-group',
									$childs: [
										{ $el: 'label', $text: 'Benutzername' },
										{ $el: 'input', $id: 'username', $att: { type: 'text', required: 'true' } }
									]
								},
								// Password Gruppe
								{
									$class: 'login-input-group',
									$childs: [
										{ $el: 'label', $text: 'Passwort' },
										{ $el: 'input', $id: 'password', $att: { type: 'password', required: 'true' } }
									]
								},
								// Email Gruppe (Initial versteckt via CSS oder Attribut)
								{
									$class: 'login-input-group',
									$id: 'email-group',
									$att: { style: 'display: none;' },
									$childs: [
										{ $el: 'label', $text: 'E-Mail (optional)' },
										{ $el: 'input', $id: 'email', $att: { type: 'email' } }
									]
								},
								// Submit Button
								{
									$el: 'button',
									$id: 'auth-button',
									$class: 'login-button',
									$text: lang.get('login.button'),
									$onclick: onAuthSubmit
								}
							]
						},
						
						// Fehleranzeige
						{ $el: 'p', $id: 'auth-error-message', $class: 'error-message' },

						// Switch Link
						{
							$el: 'a',
							$class: 'switch-mode-link',
							$id: 'switch-auth-mode',
							$text: lang.get('login.switch'),
							$onclick: (e) => {
								e.preventDefault();
								onSwitchMode();
							}
						}
					]
				}]
			}
		]
	});
}