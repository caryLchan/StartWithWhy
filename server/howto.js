const { Pool } = require('pg');

const PG_URI = 'postgres://pdpslqay:7SV5468Y5Cv5IC1sgqPNZ4Wy0Sl8go5g@drona.db.elephantsql.com:5432/pdpslqay';

const pool = new Pool({
    connectionString: PG_URI
});

const getHow = async (req, res, next) => {
    try {
        const { whyId } = req.params
        // console.log(req.params)
        const getHow = await pool.query(
            'SELECT h.how, h.whyid, h.id FROM how h JOIN why w ON h.whyid = w.id WHERE w.id = $1',
            [whyId]
        )
        res.locals.hows = getHow.rows
        return next();
    } catch (err) {
        console.log('getHow error', err)
    }
}


const createHow = async (req, res) => {
    const { how } = req.body
    const whyId = req.params.whyId
    try {
        const createHow = await pool.query(
            'INSERT INTO how (how, whyid) VALUES ($1, $2) RETURNING *',
            [how, whyId]
        )
        res.status(200).json(createHow.rows[0])
    } catch (err) {
        console.error('createHow error', err)
    }
}

const updateHow = async (req, res) => {
    const id = parseInt(req.params.howId)
    const { editHow } = req.body
    try {
        const updateHow = await pool.query(
            'UPDATE how SET how = $1 WHERE id = $2',
            [editHow, id]
        )
        res.status(200).json(`Task modified with ID: ${id}`)
    } catch (err) {
        console.error('updateHow error', err)
    }
}

const deleteHow = async (req, res) => {
    const id = parseInt(req.params.howId)
    try {
        const deleteHow = await pool.query(
            'DELETE FROM how WHERE id = $1',
            [id]
        )
        res.status(200).json(`Task deleted with ID: ${id}`)
    } catch (err) {
        console.error('deleteHow error', err)
    }
}

module.exports = {
    getHow,
    createHow,
    updateHow,
    deleteHow,
}