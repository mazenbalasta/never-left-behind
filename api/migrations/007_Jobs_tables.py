steps = [
    # step 1:
    [
        # "Up" SQL statement
        """
        CREATE TABLE jobs (
            id SERIAL PRIMARY KEY NOT NULL,
            position VARCHAR(255) NOT NULL,
            company_name VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            requirements VARCHAR(1000),
            qualifications VARCHAR(1000),
            pref_qualifications VARCHAR(1000),
            location VARCHAR(255) NOT NULL,
            apply_url VARCHAR(1000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE jobs;
        """,
    ],
]
