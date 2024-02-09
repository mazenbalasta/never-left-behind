steps = [
    [
        """
        CREATE TABLE account_types (
            id SERIAL PRIMARY KEY NOT NULL,
            account_type VARCHAR(20) UNIQUE NOT NULL
        );
        """,
        """
        DROP TABLE account_types;
        """,
    ],
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            account_type VARCHAR(20),
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(1000) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            company_name VARCHAR(150),
            city VARCHAR(50),
            state VARCHAR(2),
            country VARCHAR(75),
            FOREIGN KEY(account_type) REFERENCES account_types(account_type),
            FOREIGN KEY(state) REFERENCES states(abbreviation)
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
    [
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255),
            body VARCHAR(1000),
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            account INT NOT NULL,
            views INT DEFAULT 0,
            FOREIGN KEY(account) REFERENCES accounts(id)
        );
        """,
        """
        DROP TABLE messages;
        """,
    ],
    [
        """
        CREATE TABLE responses (
            id SERIAL PRIMARY KEY NOT NULL,
            message_id INT NOT NULL,
            body VARCHAR(1000) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            account INT NOT NULL,
            FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE,
            FOREIGN KEY(account) REFERENCES accounts(id)
        );
        """,
        """
        DROP TABLE responses;
        """,
    ],
    [
        """
        INSERT INTO account_types
            (account_type)
        VALUES
            ('veteran'),
            ('partner'),
            ('approved_partner');
        """,
        """
        DELETE FROM account_types;
        """,
    ],
]
