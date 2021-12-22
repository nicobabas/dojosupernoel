import dbConnect from '../config/db-config.js';

const getAllChildren = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT child.firstname FROM child`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}
const getAllPresents = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT * FROM present`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT c.id, c.firstname, JSON_ARRAYAGG(p.name) AS presents
        FROM child AS c
        LEFT JOIN list AS l ON c.id = l.child_id
        LEFT JOIN present AS p ON p.id = l.present_id
        GROUP BY c.id`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`SELECT c.firstname, JSON_ARRAYAGG(p.name) AS presents
        FROM child AS c
        JOIN list AS l ON c.id = l.child_id
        JOIN present AS p ON p.id = l.present_id
        WHERE c.id = ?`, id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

// DELETE
const deleteListByChildId = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM list WHERE child_id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

// CREATE
const newPresent = (present) => {
    const { name } = present;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO present (name) VALUES (?)', present, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        })
    })
}

// UPDATE
const updateMovie = (movie) => {
    const { title, id } = movie;
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE movie SET title = ? WHERE id = ?', [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// exporter toutes les fonctions du model
export default { getAll, getAllPresents, getAllChildren, getOneById, deleteListByChildId, newPresent, updateMovie };