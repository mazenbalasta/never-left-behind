steps = [
    [
        """
        CREATE TABLE states (
            state_id SERIAL PRIMARY KEY NOT NULL,
            abbreviation VARCHAR(2) UNIQUE NOT NULL,
            state_name VARCHAR(50) NOT NULL
        );


        """,
        """
        DROP TABLE states;
        """,
    ],
    [
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            event_title VARCHAR(255) NOT NULL,
            start_date TIMESTAMP,
            end_date TIMESTAMP,
            description VARCHAR(500),
            street_address VARCHAR(255),
            city VARCHAR(50) NOT NULL,
            state VARCHAR(2),
            FOREIGN KEY(state)
            REFERENCES states(abbreviation)
        );
        """,
        """
        DROP TABLE events;
        """,
    ],
]
