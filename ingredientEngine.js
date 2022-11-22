import sqlite3 from 'sqlite3';

let databasePath = 'planMiamDb.db';
let SELECT_ANN_INGREDIENTS = 'SELECT * FROM INGREDIENT'

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

export async function getIngredients() {
    return new Promise((resolve, reject) => {
        const db = getConnection();

        db.all(SELECT_ANN_INGREDIENTS, [], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows);
        });
    })
}