from flask import Flask, render_template, jsonify, request
import pandas as pd

app = Flask(__name__)

df = pd.read_csv("sales_data.csv")

df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')

df['order_date'] = pd.to_datetime(df['order_date'])

@app.route('/')
def dashboard():
    return render_template("dashboard.html")

def filter_by_date(start, end):
    filtered = df.copy()
    if start:
        filtered = filtered[filtered['order_date'] >= pd.to_datetime(start)]
    if end:
        filtered = filtered[filtered['order_date'] <= pd.to_datetime(end)]
    return filtered

@app.route('/api/sales_trend')
def sales_trend():
    start = request.args.get('start')
    end = request.args.get('end')
    filtered = filter_by_date(start, end)

    monthly = (
        filtered
        .groupby(filtered['order_date'].dt.to_period('M'))['total_price']
        .sum()
        .reset_index()
    )

    monthly['month'] = monthly['order_date'].dt.strftime('%b')

    return jsonify({
        "labels": monthly['month'].tolist(),
        "data": monthly['total_price'].tolist()
    })

@app.route('/api/category_sales')
def category_sales():
    start = request.args.get('start')
    end = request.args.get('end')
    filtered = filter_by_date(start, end)

    grouped = filtered.groupby('product_category').agg({
        'total_price': 'sum',
        'quantity': 'sum'
    }).reset_index()

    return jsonify({
        "labels": grouped['product_category'].tolist(),
        "sales": grouped['total_price'].tolist(),
        "quantity": grouped['quantity'].tolist()
    })

@app.route('/api/product_performance')
def product_performance():
    start = request.args.get('start')
    end = request.args.get('end')
    filtered = filter_by_date(start, end)

    grouped = filtered.groupby('product_id')['total_price'].sum().reset_index()

    return jsonify({
        "labels": grouped['product_id'].astype(str).tolist(),
        "data": grouped['total_price'].tolist()
    })

if __name__ == "__main__":
    app.run(debug=True)
