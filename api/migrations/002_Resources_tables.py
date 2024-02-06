steps = [
    # step 1:
    [
        # "Up" SQL statement
        """
        CREATE TABLE resources (
            id SERIAL PRIMARY KEY NOT NULL,
            url VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE resources;
        """,
    ],
]
