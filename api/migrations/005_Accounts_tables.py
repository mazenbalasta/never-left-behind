steps = [
    # step 1:
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(1000),
            full_name VARCHAR(255) NOT NULL,
            hashed_password VARCHAR(1000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
]
