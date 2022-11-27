import sqlite3 from 'sqlite3';

let databasePath = 'planMiamDb.db';
let SELECT_ALL_INGREDIENTS = 'SELECT * FROM INGREDIENT';
let SELECT_ONE_INGREDIENT = 'SELECT * FROM INGREDIENT WHERE INGREDIENT_NAME = ?';
let INSERT_INGREDIENT = 'INSERT INTO INGREDIENT(INGREDIENT_NAME) VALUES(?)';

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

        db.all(SELECT_ALL_INGREDIENTS, [], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows);
        });
    })
}

async function existingIngredient(ingredientName) {
    return new Promise((resolve, reject) => {
        const db = getConnection();

        db.all(SELECT_ONE_INGREDIENT, [ingredientName], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows.length != 0);
        });
    })
}

export async function addIngredient(ingredientName) {
    if(await existingIngredient(ingredientName)) {
        return false;
    }else {
        return new Promise((resolve, reject) => {
            const db = getConnection();
            db.all(INSERT_INGREDIENT, [ingredientName], (err, rows) => {
                if (err) {
                closeConnection(db);
                reject(err);
                }
                resolve(true);
            });
        });
    }
}