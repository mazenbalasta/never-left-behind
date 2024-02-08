steps = [
    [
        # UP
        """
        CREATE TABLE roles(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
        """,
        # DOWN
        """
        DROP TABLE roles CASCADE;
        """,
    ],
]
