steps = [
    # step 1: uP
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
        # step 2: Down
        """
        DELETE FROM categories;
        """,
    ],
]
