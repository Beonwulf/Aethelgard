export function cE({$el='div', $class=null, $id=null, $att=null, $childs=null, $text=null, $action=null, $dataSet=null, $onclick=null, controller=null}={} ) {
	if( $el === 'textNode' ) {
		return document.createTextNode( $text );
	}
	const domEl = document.createElement( $el );

	if ($text !== null && domEl.nodeType !== Node.TEXT_NODE) {
		domEl.textContent = $text;
	}

	if($class !== null) { domEl.className = Array.isArray($class) ? $class.join(' ') : $class; }
	if($id !== null) { domEl.setAttribute( 'id', $id ); }

	if( $att !== null) {
		for( const[key, value] of Object.entries($att) ) {
			domEl.setAttribute( key, value );
		}
	}

	if( $childs !== null) {
		$childs.forEach(child=>{
			child = { ...child, controller:controller};
			domEl.appendChild( cE(child) );
		});
	}

	// Direkte Klick-Funktionen erlauben (NEU)
	if ($onclick !== null && typeof $onclick === 'function') {
		domEl.onclick = $onclick;
	}

	// String-Actions aus dem JSON-Template
	else if( $action !== null && controller !== null ) {
	    if (typeof controller[$action] === 'function') {
		domEl.onclick = (e) => controller[$action](e);
	    }
	}
	if( $dataSet !== null ) {
		for( const[key, value] of Object.entries($dataSet) ) {
			domEl.dataset[key] = value;
		}
	}

	return domEl;
}