from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask.views import MethodView
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(25), nullable=False)
    lastName = db.Column(db.String(25), nullable=False)
    DOB = db.Column(db.String(255), nullable=False)
    idNumber = db.Column(db.Integer, unique=True)
    phoneNumber = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'Customer ({self.first_name}))'

class Product(db.Model):
    __tabelname__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(50), nullable=False)
    product_desc = db.Column(db.String(50), nullable=False)
    product_qty = db.Column(db.Integer, nullable=False)
    client_id = db.Column(db.Integer, nullable=False)

    def __init__(self, product_name, product_desc, product_qty, client_id):
        self.product_name = product_name
        self.product_desc = product_desc
        self.product_qty = product_qty
        self.client_id = client_id

    def __repr__(self):
        return f'Product ({self.product_name})'

class Center(db.Model):
    __tablename__ = 'centers'
    
    id = db.Column(db.Integer, primary_key=True)
    center_name = db.Column(db.String(255), nullable=False)
    center_location = db.Column(db.String(255), nullable=False)
    client_id = db.Column(db.Integer, nullable=False)

    def __init__(self, center_name, center_location, client_id):
        self.center_name = center_name
        self.center_location = center_location
        self.client_id = client_id

    def __repr__(self):
        return f'Center ({self.center_name})'

class CustomerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstName', 'lastName', 'DOB', 'idNumber', 'phoneNumber', 'products', 'centers')

class ProductsScheam(ma.Schema):
    class Meta:
        fields = ('product_name', 'product_desc', 'product_qty')

customers_schema = CustomerSchema(many=True)
products_schema = ProductsScheam(many=True)

class CustomerListAPI(MethodView):
    def get(self):
        customers = Customer.query.order_by(Customer.id.desc())
        try:
            results = customers_schema.dump(customers)
            return make_response(jsonify(results)), 200
        except Exception as e:
            responseObject = {
                'status':'fail',
                'message': 'Could not retrieve customers. Please try again.'
            }
            return make_response(jsonify(responseObject)), 400

class CustomerAddAPI(MethodView):
    @cross_origin()
    def post(self):
        post_data = request.get_json()
        print(post_data)
        try:
            customer = Customer(
                firstName = post_data.get('firstName'),
                lastName = post_data.get('lastName'),
                DOB = post_data.get('DOB'),
                idNumber = post_data.get('idNumber'),
                phoneNumber = post_data.get('phoneNumber')
            )

            db.session.add(customer)
            db.session.commit()
            return make_response(jsonify({
                 "id" : customer.id,
                "firstName":customer.firstName,
                "lastName":customer.lastName,
                "DOB": customer.DOB,
                "idNumber": customer.idNumber,
                "phoneNumber": customer.phoneNumber
            })), 200

        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Failed to add customer. Please try again.'
            }
        
            return make_response(jsonify(responseObject)), 400

class CustomerDetailAPI(MethodView):
    def get(self, customer_id):
        try:
            customer = Customer.query.filter_by(id= customer_id).first()
            responseObject = {
                'id': customer.id,
                'firstName': customer.firstName,
                'lastName': customer.lastName,
                'DOB': customer.DOB,
                'idNumber': customer.idNumber,
                'phoneNumber': customer.phoneNumber,
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Could not find customer with that id. Please try again'
            }
            return make_response(jsonify(responseObject)), 404

class AddProductAPI(MethodView):
    @cross_origin()
    def post(self, customer_id):
        post_data = request.get_json()
        
        product_name = post_data.get('productName')
        product_desc =  post_data.get('productDesc')
        product_qty =  post_data.get('productQTY')
        client_id = customer_id

        product = Product(
            product_name= product_name,
            product_desc= product_desc,
            product_qty= product_qty,
            client_id= client_id
        )
        db.session.add(product)
        db.session.commit()
        

        return make_response(jsonify({'status': 'success'}))

class ProductListAPI(MethodView):
    def get(self, customer_id):
        products = Product.query.filter_by(client_id=customer_id)
        result = products_schema.dump(products)
        return make_response(jsonify(result))

customer_list_view = CustomerListAPI.as_view('customer_list_api')
customer_add_view = CustomerAddAPI.as_view('customer_add_api')
customer_detail_view = CustomerDetailAPI.as_view('customer_detail_api')


product_add_view = AddProductAPI.as_view('product_add_api')
product_detail_view = ProductListAPI.as_view('product_detail_api')

app.add_url_rule(
    '/api/customers',
    view_func=customer_list_view,
    methods=['GET']
)

app.add_url_rule(
    '/api/customers/<int:customer_id>',
    view_func=customer_detail_view,
    methods=['GET']
)

app.add_url_rule(
    '/api/customers/create',
    view_func=customer_add_view,
    methods=['POST']
)

app.add_url_rule(
    '/api/product/<int:customer_id>',
    view_func=product_detail_view,
    methods=['GET']
)

app.add_url_rule(
    '/api/product/create/<int:customer_id>',
    view_func=product_add_view,
    methods=['POST']
)



if __name__ == '__main__':
    app.run(debug=True)