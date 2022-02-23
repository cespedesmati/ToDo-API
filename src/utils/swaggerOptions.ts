export const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'ToDo list API.',
            version: '1.0.0',
            description: 'Api with crud for users and tasks.'
        },
        servers: [
            {
                url:'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};