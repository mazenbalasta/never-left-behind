steps = [
    # step 1:
    [
        """
        CREATE TABLE states (
            id SERIAL PRIMARY KEY NOT NULL,
            abbreviation VARCHAR(2) NOT NULL,
            name VARCHAR(50) NOT NULL
        );


        """,
        # "Down" SQL statement
        """
        DROP TABLE states;
        """,
    ],
    # step 2:
    [
        """
        CREATE TABLE cities (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE cities;
        """,
    ],
    # step 3:
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            event_title VARCHAR(255) NOT NULL,
            start_date TIMESTAMP,
            end_date TIMESTAMP,
            description VARCHAR(500),
            street_address VARCHAR(255),
            state INT REFERENCES states(id),
            city VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """,
    ],
]
