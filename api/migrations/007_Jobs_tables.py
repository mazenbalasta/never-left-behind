steps = [
    [
        """
        CREATE TABLE jobs (
            id SERIAL PRIMARY KEY NOT NULL,
            position VARCHAR(255) NOT NULL,
            company_name VARCHAR(255) NOT NULL,
            description VARCHAR(2500) NOT NULL,
            requirements VARCHAR(1000),
            qualifications VARCHAR(1000),
            pref_qualifications VARCHAR(1000),
            location VARCHAR(255) NOT NULL,
            apply_url VARCHAR(1000),
            created_by INT NOT NULL,
            FOREIGN KEY (created_by)
            REFERENCES accounts(id)
        );
        """,
        """
        DROP TABLE jobs;
        """,
    ],
]
