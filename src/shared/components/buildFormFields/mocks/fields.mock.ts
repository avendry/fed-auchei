const fieldsMock = {
    "user_name": {
        "type": "text",
        "browserColumn": true,
        "order": 1,
        "width": 6,
        "required": true,
        "readonly": false,
        "label": "Nome"
    },
    "user_email": {
        "type": "email",
        "browserColumn": true,
        "order": 2,
        "width": 3,
        "required": true,
        "label": "Email do Usuario"
    },
    "user_password": {
        "type": "password",
        "browserColumn": false,
        "order": 3,
        "width": 2,
        "min": 6,
        "max": 8,
        "required": true,
        "label": "Senha"
    },
    "user_cell_phone": {
        "type": "text",
        "browserColumn": true,
        "order": 4,
        "width": 6,
        "label": "Celular / Whatsapp",
        "required": true
    },
    "user_zip_code": {
        "type": "text",
        "browserColumn": false,
        "order": 5,
        "width": 2,
        "label": "CEP",
        "required": true,
        "maskedInput": [
            "99999-999"
        ]
    },
    "user_street": {
        "type": "text",
        "browserColumn": false,
        "order": 6,
        "width": 6,
        "label": "Rua",
        "required": false
    },
    "user_number": {
        "type": "text",
        "browserColumn": false,
        "order": 7,
        "width": 2,
        "label": "Numero",
        "required": true
    },
    "user_fk_role_id": {
        "type": "select",
        "browserColumn": true,
        "order": 8,
        "width": 2,
        "label": "Tipo de Usuario",
        "required": false,
        "api": "roles"
    },
    "user_active": {
        "type": "checkbox",
        "browserColumn": true,
        "order": 10,
        "width": 3,
        "label": "Usuario Ativo",
        "required": true
    },
    "user_text_box": {
        "type": "richTextBox",
        "browserColumn": true,
        "order": 11,
        "width": 12,
        "label": "Caixa de texto",
        "required": false
    },
    "user_teste_number": {
        "type": "number",
        "browserColumn": true,
        "order": 10,
        "width": 3,
        "label": "Teste number",
        "required": false
    },
    "user_created_at": {
        "type": "date",
        "browserColumn": false,
        "order": 9,
        "width": 2,
        "label": "Data de criação",
        "required": false
    }
}

export default fieldsMock;