steps = [
    [
        """
        CREATE TABLE categories (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL
        );
        """,
        """
        DROP TABLE categories;
        """,
    ],


    [
        """
        CREATE TABLE Activities (
            id SERIAL PRIMARY KEY NOT NULL,
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

        """
        DROP TABLE Activities;
        """,
    ],
]
