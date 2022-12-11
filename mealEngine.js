import sqlite3 from 'sqlite3';

let databasePath = 'planMiamDb.db';
let SELECT_ALL_MEALS = 'SELECT * FROM PLATE';
let SELECT_ONE_MEAL = "SELECT * FROM PLATE WHERE PLATE_NAME = ?";
let INSERT_MEAL = "INSERT INTO PlATE(PLATE_NAME, COOK_TIME, RECIPE) values (?, ?, ?)";

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

export async function getMeals() {
    return new Promise((resolve, reject) => {
        const db = getConnection();

        db.all(SELECT_ALL_MEALS, [], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows);
        });
    })
}

export async function getMealWithName(mealName) {
    return new Promise((resolve, reject) => {
        const db = getConnection();

        db.all(SELECT_ONE_MEAL, [mealName], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows);
        });
    })
}

async function existingMeal(mealName) {
    return new Promise((resolve, reject) => {
        const db = getConnection();

        db.all(SELECT_ONE_MEAL, [mealName], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows.length != 0);
        });
    })
}

export async function addMeal(newMeal) {
    return new Promise((resolve, reject) => {
        const db = getConnection();
        db.all(INSERT_MEAL, [newMeal.name, newMeal.cooktime, newMeal.recipe], (err, rows) => {
            if (err) {
            closeConnection(db);
            reject(err);
            }
            resolve(true);
        });
    });
}