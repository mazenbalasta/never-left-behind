steps = [
    [
        """
        INSERT INTO categories
            (
                name
            )
        VALUES
                ('Hunting'),
                ('Fishing'),
                ('Water Sports'),
                ('Job Fair')

        """,
        """
        DELETE FROM categories;
        """,
    ],
]
