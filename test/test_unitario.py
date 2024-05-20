import pytest
from flask import json
from ..src.database import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_register_user(client):
    data = json.dumps({"email": "testBtatata@example.com", "senha": "password"})
    response = client.post('/register', data=data, content_type='application/json')
    assert response.status_code == 201

def test_register_invalid_data(client):
    data = json.dumps({"email": "", "senha": "password"})
    response = client.post('/register', data=data, content_type='application/json')
    assert response.status_code == 400

def test_login_user(client):
    data = json.dumps({"email": "test@example.com", "senha": "password"})
    response = client.post('/login', data=data, content_type='application/json')
    assert response.status_code == 200

def test_login_invalid_credentials(client):
    data = json.dumps({"email": "test@example.com", "senha": "wrong_password"})
    response = client.post('/login', data=data, content_type='application/json')
    assert response.status_code == 401