const { Pool } = require('pg');

const PG_URI = 'postgres://pdpslqay:7SV5468Y5Cv5IC1sgqPNZ4Wy0Sl8go5g@drona.db.elephantsql.com:5432/pdpslqay';

const pool = new Pool({
    connectionString: PG_URI
});

const getWhat = async (req, res, next) => {
    try {
        const { howId } = req.params
        // console.log(req.params)
        const getWhat = await pool.query(
            'SELECT w.what, w.howid, w.id FROM what w JOIN how h ON w.howid = h.id WHERE h.id = $1',
            [howId]
        )
        res.locals.whats = getWhat.rows
        return next();
    } catch (err) {
        console.log('getWhat error', err)
    }
}


const createWhat = async (req, res) => {
    const { what } = req.body
    const howId = req.params.howId
    try {
        const createWhat = await pool.query(
            'INSERT INTO what (what, howid) VALUES ($1, $2) RETURNING *',
            [what, howId]
        )
        res.status(200).json(createWhat.rows[0])
    } catch (err) {
        console.error('createWhat error', err)
    }
}

const updateWhat = async (req, res) => {
    const id = parseInt(req.params.whatId)
    const { editWhat } = req.body
    try {
        const updateWhat = await pool.query(
            'UPDATE what SET what = $1 WHERE id = $2',
            [editWhat, id]
        )
        res.status(200).json(`Task modified with ID: ${id}`)
    } catch (err) {
        console.error('updateWhat error', err)
    }
}

const deleteWhat = async (req, res) => {
    const id = parseInt(req.params.WhatId)
    try {
        const deleteWhat = await pool.query(
            'DELETE FROM what WHERE id = $1',
            [id]
        )
        res.status(200).json(`Task deleted with ID: ${id}`)
    } catch (err) {
        console.error('deleteWhat error', err)
    }
}

module.exports = {
    getWhat,
    createWhat,
    updateWhat,
    deleteWhat,
}