import pandas as pd
import random
from datetime import datetime, timedelta

data = []

for i in range(1, 1001):
    order_date = datetime.now() - timedelta(days=random.randint(1, 365))
    quantity = random.randint(1, 5)
    unit_price = random.randint(200, 5000)
    total_price = quantity * unit_price

    data.append([
        i,
        f"CUST{random.randint(100,999)}",
        f"PROD{random.randint(10,99)}",
        order_date.strftime("%Y-%m-%d"),
        random.choice(["Electronics", "Clothing", "Home", "Books"]),
        quantity,
        unit_price,
        total_price
    ])

columns = [
    "order_id", "customer_id", "product_id",
    "order_date", "product_category",
    "quantity", "unit_price", "total_price"
]

df = pd.DataFrame(data, columns=columns)
df.to_csv("sales_data.csv", index=False)

print("Dataset created successfully!")
