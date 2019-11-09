export const areObjectsSame = (objectA, objectB) => {
	if (!(objectA instanceof Object && objectB instanceof Object)) {
		return false;
	}

	const keys = Object.keys(objectA);
	if (keys.length !== Object.keys(objectB).length) {
		return false
	}

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (objectA[key] !== objectB[key]) {
			return false;
		}
	}

	return true;
};

export const areArraysSame = (arrayA, arrayB) => {
	if (
		!(arrayA instanceof Array && arrayB instanceof Array)
		|| arrayA.length !== arrayB.length
	) {
		return false;
	}

	const arrayASorted = arrayA.slice(0).sort();
	const arrayBSorted = arrayB.slice(0).sort();

	for (let i = 0; i < arrayASorted.length; i++) {
		const itemA = arrayASorted[i];
		const itemB = arrayBSorted[i];

		if (
			!(
				(
					itemA instanceof Object
					&& areObjectsSame(itemA, itemB)
				) || (
					itemA instanceof Array
					&& areArraysSame(itemA, itemB)
				) || (
					itemA === itemB
				)
			)
		) {
			return false;
		}
	}

	return true;
};
