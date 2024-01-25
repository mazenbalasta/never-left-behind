steps = [
    # Step 1: Create accounts_type table
    [
        # "Up" SQL statement
        """
        CREATE TABLE account_types (
            id SERIAL PRIMARY KEY NOT NULL,
            account_type VARCHAR(20) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE account_types;
        """,
    ],
    # Step 2: Create accounts table
    [
        # "Up" SQL statement
        """
        CREATE TABLE account_types (
            id SERIAL PRIMARY KEY NOT NULL,
            account_type VARCHAR(20) NOT NULL
        );



        """,
        # "Down" SQL statement
        """
        DROP TABLE account_types;
        """,
    ],
    # step 2:
    [
        """
        INSERT INTO account_types
            (
                account_type
            )
        VALUES
                ('Partner'),
                ('Veteran')

        """,
        """
        DELETE FROM account_types;
        """,
    ],
    # step 3:
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            full_name VARCHAR(255) NULL,
            account_type INT,
            partner_name VARCHAR(150) NULL,
            city VARCHAR(50) NULL,
            state VARCHAR(50) NULL,
            country VARCHAR(75) NULL,
            FOREIGN KEY(account_type) REFERENCES account_types(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
    # Step 3: Create message table
    [
        # "Up" SQL statement
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            body VARCHAR(1000) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            account INT,
            FOREIGN KEY(account) REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE messages;
        """,
    ],
    # Step 4: Insert data to account types table
    [
        # "Up" SQL statement
        """
        INSERT INTO account_types (account_type) VALUES ('Partner'), ('Veteran');
        """,
        # "Down" SQL statement
        """
        DELETE FROM account_types;
        """,
    ],
]
