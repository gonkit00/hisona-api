'use strict';

const fs = require('fs');
const db = require('../db');


exports.getArtefactCollection = async ctx => {
	try {
    const artefactCollection = await db.getArtefactCollection();
    if (!Object.keys(artefactCollection).length) throw new Error('Empty collection');
		ctx.ok(artefactCollection);
	} catch (err) {
		ctx.send(404, { error: err.message });
	}
}
