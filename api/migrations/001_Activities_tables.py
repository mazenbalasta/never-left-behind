steps = [
    # step 1
    [
        # "Up" SQL statement
        """
        CREATE TABLE categories (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE categories;
        """
    ],
    # step 2
    [
        """
        CREATE TABLE Activities (
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            location VARCHAR(255) NOT NULL,
            category INT,
            FOREIGN KEY(category)
            REFERENCES categories(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE Activities;
        """,
    ]
]
