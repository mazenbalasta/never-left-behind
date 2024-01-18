steps = [
    #step 1:
    [
        # "Up" SQL statement
        """
        CREATE TABLE category (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE category;
        """,
    ],
    #step 2:
    [
        """
        CREATE TABLE activity (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            location VARCHAR(255) NOT NULL,
            category INT REFERENCES category(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE activity;
        """,
    ]
]
