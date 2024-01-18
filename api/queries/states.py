from pydantic import BaseModel
from queries.pool import pool

class StatesIn(BaseModel):
    name: str
    abbreviation: str

class StatesOut(StatesIn):
    id: int

class StatesRepo:
     def create(self, state: StatesIn) -> StatesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO states
                        (
                            abbreviation,
                            name
                        )
                    VALUES
                        (
                            ('AL','Alabama'),
                            ('AK','Alaska'),
                            ('AZ','Arizona'),
                            ('AR','Arkansas'),
                            ('CA','California'),
                            ('CO','Colorado'),
                            ('CT','Connecticut'),
                            ('DE','Delaware'),
                            ('FL','Florida'),
                            ('GA','Georgia'),
                            ('HI','Hawaii'),
                            ('ID','Idaho'),
                            ('IL','Illinois'),
                            ('IN','Indiana'),
                            ('IA','Iowa'),
                            ('KS','Kansas'),
                            ('KY','Kentucky'),
                            ('LA','Louisiana'),
                            ('ME','Maine'),
                            ('MD','Maryland'),
                            ('MA','Massachusetts'),
                            ('MI','Michigan'),
                            ('MN','Minnesota'),
                            ('MS','Mississippi'),
                            ('MO','Missouri'),
                            ('MT','Montana'),
                            ('NE','Nebraska'),
                            ('NV','Nevada'),
                            ('NH','New Hampshire'),
                            ('NJ','New Jersey'),
                            ('NM','New Mexico'),
                            ('NY','New York'),
                            ('NC','North Carolina'),
                            ('ND','North Dakota'),
                            ('OH','Ohio'),
                            ('OK','Oklahoma'),
                            ('OR','Oregon'),
                            ('PA','Pennsylvania'),
                            ('RI','Rhode Island'),
                            ('SC','South Carolina'),
                            ('SD','South Dakota'),
                            ('TN','Tennessee'),
                            ('TX','Texas'),
                            ('UT','Utah'),
                            ('VT','Vermont'),
                            ('VA','Virginia'),
                            ('WA','Washington'),
                            ('WV','West Virginia'),
                            ('WI','Wisconsin'),
                            ('WY','Wyoming');
                        );
                    """
                )
                id = result.fetchone()[0]
                old_data = state.dict()
                return StatesOut(id=id, **old_data)
