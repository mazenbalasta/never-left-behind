steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE Activities (
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            location VARCHAR(255) NOT NULL,
            category TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE Activities;
        """,
    ]
]
