steps = [
    # step 1:
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            full_name VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],

        # step 2:
    [
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            message VARCHAR(1000) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            userId INT,
            FOREIGN KEY(id) REFERENCES accounts(id)
        );


        """,
        # "Down" SQL statement
        """
        DROP TABLE messages;
        """,
    ],
]
