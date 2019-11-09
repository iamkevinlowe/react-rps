import * as firebase from 'firebase/app';

import 'firebase/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyCpU5AfFhgbrjaTR8sKyB_O6h9VYGCNmDk',
	authDomain: 'rock-paper-scissors-b198e.firebaseapp.com',
	databaseURL: 'https://rock-paper-scissors-b198e.firebaseio.com',
	projectId: 'rock-paper-scissors-b198e',
	storageBucket: 'rock-paper-scissors-b198e.appspot.com',
	messagingSenderId: '530589049037',
	appId: '1:530589049037:web:f677fbd6b66d8483654984'
});

export default firebase.firestore();
