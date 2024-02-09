steps = [
    [
        """
        CREATE TABLE resources (
            id SERIAL PRIMARY KEY NOT NULL,
            url VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE resources;
        """,
    ],
]
