'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.incrementGameTie = functions.firestore.document('games/{gameId}')
	.onUpdate(({ before, after }, context) => {
		const beforeWeapons = before.data().weapons || [];
		const afterWeapons = after.data().weapons || [];

		if (
			beforeWeapons.length !== 1
			|| afterWeapons.length !== 2
			|| afterWeapons[0].weapon !== afterWeapons[1].weapon
		) {
			return null;
		}

		return after.ref.set({ ties: admin.firestore.FieldValue.increment(1) }, { merge: true });
	});
