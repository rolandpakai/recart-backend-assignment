db.getSiblingDB('recart-dev')
    .createUser({ user: 'recart-dev', pwd: 'hackme', roles: [{ role: 'readWrite', db: 'recart-dev' }] });

db.getSiblingDB('recart-test')
    .createUser({ user: 'recart-test', pwd: 'hackme', roles: [{ role: 'readWrite', db: 'recart-test' }] });
