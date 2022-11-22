import sqlite3 from 'sqlite3';

let databasePath = 'planMiamDb.db';
let SELECT_ALL_MEALS = 'SELECT * FROM PLATE'

function getConnection() {
    let database = new sqlite3.Database(databasePath, (err) => {
        if (err) {
            return console.error(`Erreur lors de la création de la base de données : ${err.message}`);
        }
        console.log('Connecté à la base de données.');
        });
    return database;
}

function closeConnection(database) {
    database.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connexion fermée.');
        });
}

export function getMeals() {
    let db = getConnection();
    db.all(SELECT_ALL_MEALS, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
        });
    closeConnection(db);
}