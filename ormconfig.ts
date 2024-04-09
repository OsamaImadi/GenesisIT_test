export default {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "54321",
    "database": "genesis",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
