steps = [
    [
        # Create table
        """
        CREATE TABLE jobs(
            id SERIAL PRIMARY KEY,
            position VARCHAR(1000) NOT NULL,
            company_name VARCHAR(1000) NOT NULL,
            role VARCHAR(1000) NOT NULL,
            requirements VARCHAR(1000) NOT NULL,
            qualifications VARCHAR(1000) NOT NULL,
            pref_qualifications VARCHAR(1000) NOT NULL,
            location VARCHAR(1000) NOT NULL,
            apply_url VARCHAR(1000)
        );
        """,
        # Drop table
        """
        DROP TABLE jobs;
        """,
    ]
]
